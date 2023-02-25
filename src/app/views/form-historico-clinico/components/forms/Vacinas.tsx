import {Button, Form, Modal, Row} from "react-bootstrap";
import React from "react";
import Contracts from "../../../../contracts/Contracts";
import MultiGroups from "../../../../components/multi-groups/MultiGroups";

export default function Vacinas(props: Contracts.CloseModal) {
    const {closeModal} = props;

    return (
        <Modal show={true} onHide={() => closeModal()} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Vacinas</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <MultiGroups>
                    <Row style={{borderBottom: "1px solid #cdd4d9"}} className="mb-2">
                        <Form.Group className="mb-3 col-lg-4">
                            <Form.Label>Laboratório*</Form.Label>
                            <Form.Control type="text" name="laboratorio[]"/>
                        </Form.Group>

                        <Form.Group className="mb-3 col-lg-4">
                            <Form.Label>Nome*</Form.Label>
                            <Form.Control type="text" name="nome[]"/>
                        </Form.Group>

                        <Form.Group className="mb-3 col-lg-4">
                            <Form.Label>Número de partida / Lote</Form.Label>
                            <Form.Control type="text" name="lote[]"/>
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
                            <Form.Label>Vacinado em</Form.Label>
                            <Form.Control type="date" name="vacinado_em[]"/>
                        </Form.Group>

                        <Form.Group className="mb-3 col-lg-6">
                            <Form.Label>Revacinar em</Form.Label>
                            <Form.Control type="date" name="revacinar_em[]"/>
                        </Form.Group>
                    </Row>
                </MultiGroups>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={() => closeModal()}>Fechar</Button>
                <Button variant="primary">Salvar</Button>
            </Modal.Footer>
        </Modal>
    );
}