import {Button, Form, Modal, Row, Spinner} from "react-bootstrap";
import React, {useContext, useState} from "react";
import Contracts from "../../../../contracts/Contracts";
import MultiGroups from "../../../../components/multi-groups/MultiGroups";
import ProntuarioModalProps from "./types/ProntuarioModalProps";
import {FormProntuarioContext} from "../../FormProntuario";
import Components from "../../../../components/Components";
import axios from "axios";
import Memory from "../../../../Memory";

export default function Procedimentos(props: ProntuarioModalProps) {
    const {closeModal, data} = props;
    const {updateProntuarioData, setProcedimentsStatus} = useContext(FormProntuarioContext);

    const [validationErrors, setValidationErrors] = useState<Contracts.DynamicObject<string>>({});
    const [dataStatus, setDataStatus] = useState<Contracts.FormStatus>("idle");

    if (!updateProntuarioData || !setProcedimentsStatus)
        throw new Error("updateProntuarioData or setProcedimentsStatus undefined");

    const onSubmit = async (formData: FormData) => {
        const submitData: Record<string, any> = Object.fromEntries(formData);

        submitData["procedimentos"] = Array
            .from(document.querySelectorAll(`[data-form]`))
            .map((form) => Object.fromEntries(new FormData(form as HTMLFormElement)));

        const url = `${process.env.REACT_APP_API_URL}/prontuario/${data.id}/procedimentos`;
        const {data: response} = await axios.put<Contracts.Prontuario>(url, submitData, {headers: Memory.headers});

        updateProntuarioData(response);
        setProcedimentsStatus("ok");

        closeModal();
    }

    return (
        <Modal show={true} onHide={() => closeModal()} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Procedimentos</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <MultiGroups componentType={FormComponent} componentPropsList={data.procedimentos}/>
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

function FormComponent(props: Contracts.Procedimento): JSX.Element {
    const {procedimento, procedimento_outros} = props;
    const [selectedProcedimento, setSelectedProcedimento] = useState<string>(procedimento);

    const options = [
        "Coleta de Sangue",
        "Coleta de Material Biológico",
        "Curativo",
        "Fluidoterapia",
        "Limpeza Otológica",
        "Medicação",
        "Profilaxia Dentária - Tartarectomia",
        "Quimioterapia",
        "Sedação",
        "Sutura",
        "Tala / Imobilização",
        "Vacinação",
        "Vermifugação",
        "Emissão de Termos",
        "Outros"
    ];

    return (
        <form data-form="">
            <Row>
                <Form.Group className="mb-3 col-lg-12">
                    <Form.Label>Procedimentos Efetuados*</Form.Label>
                    <Form.Select name="procedimento"
                                 onChange={(evt) => setSelectedProcedimento(evt.currentTarget.value)}
                                 required>
                        <option value="">- Selecione</option>

                        {
                            options.map((value) => {
                                return <option value={value} selected={procedimento === value}>{value}</option>;
                            })
                        }
                    </Form.Select>
                </Form.Group>

                {
                    selectedProcedimento === "Outros" ?
                        <Form.Group className="mb-3 col-lg-12">
                            <Form.Label>Outros</Form.Label>
                            <Form.Control as="textarea" name="procedimento_outros"
                                          defaultValue={procedimento_outros ?? undefined}/>
                        </Form.Group> :
                        <></>
                }
            </Row>
        </form>
    );
}