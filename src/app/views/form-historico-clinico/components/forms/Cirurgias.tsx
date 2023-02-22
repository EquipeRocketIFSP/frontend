import React from "react";

import Contracts from "../../../../contracts/Contracts";
import {Button, Form, Modal, Row} from "react-bootstrap";
import MultiGroups from "../../../../components/multi-groups/MultiGroups";

export default function Cirurgias(props: Contracts.CloseModal) {
    const {closeModal} = props;

    return (
        <Modal show={true} onHide={() => closeModal()} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Cirurgias</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <MultiGroups>
                    <Row>
                        <Form.Group className="mb-3 col-lg-6">
                            <Form.Label>Nome/Tipo de Cirurgia*</Form.Label>
                            <Form.Control type="text" name="nome_cirurgia[]" required/>
                        </Form.Group>

                        <Form.Group className="mb-3 col-lg-6">
                            <Form.Label>Data*</Form.Label>
                            <Form.Control type="date" name="data_cirurgia[]"/>
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