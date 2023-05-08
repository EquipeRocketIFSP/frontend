import {Button, Form, Modal, Row} from "react-bootstrap";
import React, {useState} from "react";
import Contracts from "../../../../contracts/Contracts";
import MultiGroups from "../../../../components/multi-groups/MultiGroups";

export default function Procedimentos(props: Contracts.CloseModal) {
    const {closeModal} = props;

    return (
        <Modal show={true} onHide={() => closeModal()} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Procedimentos</Modal.Title>
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
    const [selectedProcedimento, setSelectedProcedimento] = useState<string>("");

    return (
        <Row>
            <Form.Group className="mb-3 col-lg-12">
                <Form.Label>Procedimentos Efetuados*</Form.Label>
                <Form.Select name="procedimento[]" onChange={(evt) => setSelectedProcedimento(evt.currentTarget.value)}>
                    <option value="">- Selecione</option>
                    <option value="Coleta de Sangue">Coleta de Sangue</option>
                    <option value="Coleta de Material Biológico">Coleta de Material Biológico</option>
                    <option value="Curativo">Curativo</option>
                    <option value="Fluidoterapia">Fluidoterapia</option>
                    <option value="Limpeza Otológica">Limpeza Otológica</option>
                    <option value="Medicação">Medicação</option>
                    <option value="Profilaxia Dentária - Tartarectomia">
                        Profilaxia Dentária - Tartarectomia
                    </option>
                    <option value="Quimioterapia">Quimioterapia</option>
                    <option value="Sedação">Sedação</option>
                    <option value="Sutura">Sutura</option>
                    <option value="Tala / Imobilização">Tala / Imobilização</option>
                    <option value="Vacinação">Vacinação</option>
                    <option value="Vermifugação">Vermifugação</option>
                    <option value="Emissão de Termos">Emissão de Termos</option>
                    <option value="Outros">Outros</option>
                </Form.Select>
            </Form.Group>

            {
                selectedProcedimento === "Outros" ?
                    <Form.Group className="mb-3 col-lg-12">
                        <Form.Label>Outros</Form.Label>
                        <Form.Control as="textarea" name="procedimento_outros[]"/>
                    </Form.Group> :
                    <></>
            }
        </Row>
    );
}