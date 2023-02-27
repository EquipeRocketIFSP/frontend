import {Button, Form, Modal, Row} from "react-bootstrap";
import Contracts from "../../../../contracts/Contracts";
import React, {useState} from "react";
import MultiGroups from "../../../../components/multi-groups/MultiGroups";
import RegioesAfetadas from "./components/RegioesAfetadas";

enum ExameType {
    BIOQUIMICO = "Bioquimico",
    CITOLOGIA = "Citologia",
    HEMATOLIGIA = "Hematologia",
    IMAGEM = "Imagem",
    OUTROS = "Outros"
}

export default function Exames(props: Contracts.CloseModal): JSX.Element {
    const {closeModal} = props;

    return (
        <Modal show={true} onHide={() => closeModal()} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Exames</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <MultiGroups componentType={FormComponent}/>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={() => closeModal()}>Fechar</Button>
                <Button variant="primary">Salvar</Button>
            </Modal.Footer>
        </Modal>
    );
}

function FormComponent(): JSX.Element {
    const [exameTypeSelected, setExameTypeSelected] = useState<string>("");

    const exameTypes = [
        ExameType.BIOQUIMICO,
        ExameType.CITOLOGIA,
        ExameType.HEMATOLIGIA,
        ExameType.IMAGEM,
        ExameType.OUTROS,
    ];

    return (
        <Row className="mb-3">
            <Form.Group className="mb-3 col-lg-12">
                <Form.Label>Tipo de Exame*</Form.Label>
                <Form.Select name="tipo_exame[]" onInput={(evt) => setExameTypeSelected(evt.currentTarget.value)}
                             required>
                    <option value="">- Selecione</option>

                    {exameTypes.map((type) => <option value={type}>{type}</option>)}
                </Form.Select>
            </Form.Group>

            {factorySelectComponent(exameTypeSelected)}
        </Row>
    );
}

function factorySelectComponent(value: ExameType | string): JSX.Element {
    switch (value) {
        case ExameType.BIOQUIMICO:
            return <Bioquimico/>;

        case ExameType.HEMATOLIGIA:
            return <Hematologia/>;

        case ExameType.CITOLOGIA:
            return <Citologia/>;

        case ExameType.IMAGEM:
            return <Imagem/>;

        case ExameType.OUTROS:
            return <Outros name="exames_outros"/>

        default:
            return <></>;
    }
}

function Bioquimico(): JSX.Element {
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

            <Form.Select name="bioquimico[]" required>
                <option value="">- Selecione</option>

                {options.map((option) => <option value={option}>{option}</option>)}
            </Form.Select>
        </Form.Group>
    );
}

function Hematologia(): JSX.Element {
    return (
        <Form.Group className="mb-3 col-lg-12">
            <Form.Label>Hematologia*</Form.Label>
            <Form.Select name="hematologia[]" required>
                <option value="">- Selecione</option>
                <option value="Hemograma Completo">Hemograma Completo</option>
                <option value="Hemograma Controle">Hemograma Controle</option>
                <option value="Leucegrama">Leucegrama</option>
                <option value="Contagem de Plaquetas">Contagem de Plaquetas</option>
            </Form.Select>
        </Form.Group>
    );
}

function Citologia(): JSX.Element {
    const [citologiaSelected, setCitologiaSelected] = useState<string>("");

    return (
        <>
            <Form.Group className="mb-3 col-lg-12">
                <Form.Label>Citologia*</Form.Label>
                <Form.Select name="citologia[]" onInput={(evt) => setCitologiaSelected(evt.currentTarget.value)}
                             required>
                    <option value="">- Selecione</option>
                    <option value="CAAF">CAAF</option>
                    <option value="Imprinting">Imprinting</option>
                    <option value="Histopatologico">Histopatologico</option>
                    <option value="Biópsia">Biópsia</option>
                    <option value="Outros">Outros</option>
                </Form.Select>
            </Form.Group>

            {citologiaSelected === "Outros" ? <Outros name="outros_citologia"/> : <></>}
        </>
    );
}

function Imagem(): JSX.Element {
    return (
        <>
            <Form.Group className="mb-3 col-lg-12">
                <Form.Label>Imagem*</Form.Label>
                <Form.Select name="imagem[]" required>
                    <option value="">- Selecione</option>
                    <option value="Raio-X">Raio-X</option>
                    <option value="Ultrasson">Ultrasson</option>
                    <option value="Tomografia">Tomografia</option>
                </Form.Select>
            </Form.Group>

            <RegioesAfetadas title="Regiões"/>
        </>
    );
}

function Outros(props: { name: string }): JSX.Element {
    return (
        <Form.Group className="mb-3 col-lg-12">
            <Form.Label>Outros*</Form.Label>
            <Form.Control as="textarea" rows={3} name={props.name + "[]"}/>
        </Form.Group>
    );
}