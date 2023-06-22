import {Button, Form, Modal, Row, Spinner} from "react-bootstrap";
import Contracts from "../../../../contracts/Contracts";
import React, {useContext, useState} from "react";
import MultiGroups from "../../../../components/multi-groups/MultiGroups";
import RegioesAfetadas from "./components/RegioesAfetadas";
import ProntuarioModalProps from "../types/ProntuarioModalProps";
import Components from "../../../../components/Components";
import {FormProntuarioContext} from "../../FormProntuario";
import axios from "axios";
import Memory from "../../../../Memory";

enum ExameType {
    BIOQUIMICO = "Bioquimico",
    CITOLOGIA = "Citologia",
    HEMATOLOGIA = "Hematologia",
    IMAGEM = "Imagem",
    OUTROS = "Outros"
}

export default function Exames(props: ProntuarioModalProps): JSX.Element {
    const {closeModal, data} = props;
    const {updateProntuarioData, setExamsStatus} = useContext(FormProntuarioContext);

    const [validationErrors, setValidationErrors] = useState<Contracts.DynamicObject<string>>({});
    const [dataStatus, setDataStatus] = useState<Contracts.FormStatus>("idle");

    if (!updateProntuarioData || !setExamsStatus)
        throw new Error("updateProntuarioData or setClinicalManifestationsStatus undefined");

    const onSubmit = async (formData: FormData) => {
        const submitData: Record<string, any> = Object.fromEntries(formData);

        submitData["exames"] = Array
            .from(document.querySelectorAll(`[data-form]`))
            .map((form) => {
                const examsFormData = new FormData(form as HTMLFormElement);
                const exams: Record<string, any> = {};

                Array.from(examsFormData.keys()).forEach((key) => {
                    if (key.match(/\[\]/gmi))
                        exams[key.replace("[]", "")] = examsFormData.getAll(key);
                    else
                        exams[key] = examsFormData.get(key);
                });

                return exams;
            });

        const url = `${process.env.REACT_APP_API_URL}/prontuario/${data.id}/exames`;
        const {data: response} = await axios.put<Contracts.Prontuario>(url, submitData, {headers: Memory.headers});

        updateProntuarioData(response);
        setExamsStatus("ok");

        closeModal();
    }

    return (
        <Modal show={true} onHide={() => closeModal()} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Exames</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <MultiGroups componentType={FormComponent} componentPropsList={data.exames}/>
            </Modal.Body>

            <Components.FormSubmit
                onSubmit={onSubmit}
                setDataStatus={setDataStatus}
                setValidationErrors={setValidationErrors}
                dataStatus={dataStatus}
                validationErrors={validationErrors}
            >
                <Components.FormSubmitContext.Consumer>
                    {
                        ({sendingForm}) => (
                            <>
                                <Modal.Footer>
                                    {
                                        sendingForm ?
                                            (
                                                <>
                                                    <Button variant="outline-secondary" disabled>Voltar</Button>
                                                    <Button variant="outline-success" disabled>
                                                        <Spinner animation="grow" size="sm"/>
                                                    </Button>
                                                </>
                                            ) :
                                            (
                                                <>
                                                    <Button variant="secondary"
                                                            onClick={() => closeModal()}>Fechar</Button>
                                                    <Button variant="primary" type="submit">Salvar</Button>
                                                </>
                                            )
                                    }
                                </Modal.Footer>
                            </>
                        )
                    }
                </Components.FormSubmitContext.Consumer>

                <input type="hidden" name="animal" value={data.animal.id}/>
                <input type="hidden" name="tutor" value={data.tutor.id}/>
                <input type="hidden" name="veterinario" value={data.veterinario.id}/>
            </Components.FormSubmit>
        </Modal>
    );
}

function FormComponent(props: Contracts.Exame): JSX.Element {
    const {tipo_exame} = props;
    const [exameTypeSelected, setExameTypeSelected] = useState<string>(tipo_exame);

    const exameTypes = [
        ExameType.BIOQUIMICO,
        ExameType.CITOLOGIA,
        ExameType.HEMATOLOGIA,
        ExameType.IMAGEM,
        ExameType.OUTROS,
    ];

    return (
        <form data-form="">
            <Row className="mb-3">
                <Form.Group className="mb-3 col-lg-12">
                    <Form.Label>Tipo de Exame*</Form.Label>
                    <Form.Select
                        name="tipo_exame"
                        onInput={(evt) => setExameTypeSelected(evt.currentTarget.value)}
                        required
                    >
                        <option value="">- Selecione</option>

                        {
                            exameTypes.map((type) => {
                                return <option value={type} selected={type === tipo_exame}>{type}</option>;
                            })
                        }
                    </Form.Select>
                </Form.Group>

                {factorySelectComponent(exameTypeSelected, props)}
            </Row>
        </form>
    );
}

function factorySelectComponent(value: ExameType | string, props: Contracts.Exame): JSX.Element {
    switch (value) {
        case ExameType.BIOQUIMICO:
            return <Bioquimico {...props}/>;

        case ExameType.HEMATOLOGIA:
            return <Hematologia {...props}/>;

        case ExameType.CITOLOGIA:
            return <Citologia {...props}/>;

        case ExameType.IMAGEM:
            return <Imagem {...props}/>;

        case ExameType.OUTROS:
            return <Outros name="exames_outros" value={props.exames_outros}/>

        default:
            return <></>;
    }
}

function Bioquimico(props: Contracts.Exame): JSX.Element {
    const options = [
        "Alanina Aminotransferase - ALT",
        "Aspartato Aminotransferase - AST",
        "Fosfatase Alcalina - FA",
        "Gama Glutamil Transpeptidase - GGT",
        "Uréia",
        "Creatinina",
        "Glicemia",
        "Frutosamina",
        "Proteína Total",
        "Proteína Fracionada",
        "Albumina",
        "Amilase",
        "Lipase",
        "Colesterol Total",
        "Triglicérides",
        "Sódio",
        "Potássio",
        "Cálcio",
        "Fósforo",
        "Bilirrubinas",
    ];

    return (
        <Form.Group className="mb-3 col-lg-12">
            <Form.Label>Bioquimico*</Form.Label>

            <Form.Select name="subtipo_exame" required>
                <option value="">- Selecione</option>

                {options.map((option) =>
                    <option value={option} selected={option === props.subtipo_exame}>{option}</option>)}
            </Form.Select>
        </Form.Group>
    );
}

function Hematologia(props: Contracts.Exame): JSX.Element {
    const options = ["Hemograma Completo", "Hemograma Controle", "Leucegrama", "Contagem de Plaquetas"];

    return (
        <Form.Group className="mb-3 col-lg-12">
            <Form.Label>Hematologia*</Form.Label>
            <Form.Select name="subtipo_exame" required>
                <option value="">- Selecione</option>

                {options.map((option) =>
                    <option value={option} selected={option === props.subtipo_exame}>{option}</option>)}
            </Form.Select>
        </Form.Group>
    );
}

function Citologia(props: Contracts.Exame): JSX.Element {
    const [citologiaSelected, setCitologiaSelected] = useState<string>(props.subtipo_exame ?? "");
    const options = ["CAAF", "Imprinting", "Histopatologico", "Biópsia", "Outro"];

    return (
        <>
            <Form.Group className="mb-3 col-lg-12">
                <Form.Label>Citologia*</Form.Label>
                <Form.Select name="subtipo_exame" onInput={(evt) => setCitologiaSelected(evt.currentTarget.value)}
                             required>
                    <option value="">- Selecione</option>

                    {options.map((option) =>
                        <option value={option} selected={option === props.subtipo_exame}>{option}</option>)}
                </Form.Select>
            </Form.Group>

            {citologiaSelected === "Outro" ? <Outros name="outros_citologia" value={props.outros_citologia}/> : <></>}
        </>
    );
}

function Imagem(props: Contracts.Exame): JSX.Element {
    const options = ["Raio-X", "Ultrasson", "Tomografia"];

    return (
        <>
            <Form.Group className="mb-3 col-lg-12">
                <Form.Label>Imagem*</Form.Label>
                <Form.Select name="subtipo_exame" required>
                    <option value="">- Selecione</option>

                    {options.map((option) =>
                        <option value={option} selected={option === props.subtipo_exame}>{option}</option>)}
                </Form.Select>
            </Form.Group>

            <RegioesAfetadas title="Regiões" data={props}/>
        </>
    );
}

function Outros(props: { name: string, value?: string | null }): JSX.Element {
    return (
        <Form.Group className="mb-3 col-lg-12">
            <Form.Label>Outros*</Form.Label>
            <Form.Control as="textarea" rows={3} name={props.name} defaultValue={props.value ?? undefined}/>
        </Form.Group>
    );
}