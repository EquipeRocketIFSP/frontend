import {Button, Form, Modal, Row} from "react-bootstrap";
import React, {useState} from "react";
import Contracts from "../../../../contracts/Contracts";
import MultiGroups from "../../../../components/multi-groups/MultiGroups";

export default function MedicacoesUtilizadas(props: Contracts.CloseModal) {
    const {closeModal} = props;

    return (
        <Modal show={true} onHide={() => closeModal()} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Medicações Utilizadas</Modal.Title>
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

function FormComponent() {
    const [controlled, setControlled] = useState<string>("");

    return (
        <Row>
            <Form.Group className="mb-3 col-lg-6">
                <Form.Label>Código de Registro*</Form.Label>
                <Form.Control type="text" name="codigo_registro[]" required/>
            </Form.Group>

            <Form.Group className="mb-3 col-lg-6">
                <Form.Label>Nome*</Form.Label>
                <Form.Control type="text" name="nome[]" required/>
            </Form.Group>

            <Form.Group className="mb-3 col-lg-4">
                <Form.Label>Princípio Ativo*</Form.Label>
                <Form.Control type="text" name="pricipio_ativo[]" required/>
            </Form.Group>

            <Form.Group className="mb-3 col-lg-4">
                <Form.Label>Forma Farmaceutica*</Form.Label>
                <Form.Control type="text" name="forma_farmaceutica[]"
                              placeholder="Comprimido, Xarope, Gotas, etc..." required/>
            </Form.Group>

            <Form.Group className="mb-3 col-lg-4">
                <Form.Label>Laboratório*</Form.Label>
                <Form.Control type="text" name="laboratorio[]" required/>
            </Form.Group>

            <Form.Group className="mb-3 col-lg-6">
                <Form.Label>Classe Terapêutica*</Form.Label>
                <Form.Control type="text" name="classe_terapeutica[]" required/>
            </Form.Group>

            <Form.Group className="mb-3 col-lg-6">
                <Form.Label>Lote*</Form.Label>
                <Form.Control type="text" name="lote[]" required/>
            </Form.Group>

            <Form.Group className="mb-3 col-lg-6">
                <Form.Label>Data de Fabricação</Form.Label>
                <Form.Control type="date" name="data_fabricacao[]"/>
            </Form.Group>

            <Form.Group className="mb-3 col-lg-6">
                <Form.Label>Data de Validade</Form.Label>
                <Form.Control type="date" name="data_validade[]"/>
            </Form.Group>

            <Form.Group className="mb-3 col-lg-6">
                <Form.Label>Dose*</Form.Label>
                <Form.Control type="text" name="dose[]" placeholder="ml, mg, g, ul, comp" required/>
            </Form.Group>

            <Form.Group className="mb-3 col-lg-6">
                <Form.Label>Concentração*</Form.Label>
                <Form.Control type="text" name="concentracao[]" required/>
            </Form.Group>

            <Form.Group className="mb-3 col-lg-6">
                <Form.Label>Uso*</Form.Label>
                <Form.Select name="uso[]" required>
                    <option value="">- Selecione</option>
                    <option value="cirurgia">Cirurgia</option>
                    <option value="procedimento">Procedimento</option>
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3 col-lg-6">
                <Form.Label>Controlado?*</Form.Label>
                <Form.Check type="radio" label="Sim" onChange={() => setControlled("Sim")}
                            checked={controlled === "Sim"}/>
                <Form.Check type="radio" label="Não" onChange={() => setControlled("Não")}
                            checked={controlled === "Não"}/>

                <input type="hidden" name="controlado[]" value={controlled}/>
            </Form.Group>
        </Row>
    );
}