import {Button, Form, Modal} from "react-bootstrap";
import React from "react";
import Contracts from "../../../../contracts/Contracts";

export default function Vacinas(props: Contracts.CloseModal) {
    const {closeModal} = props;

    return (
        <Modal show={true} onHide={() => closeModal()} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Vacinas</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {/*<Form.Group className="mb-3 col-lg-12">
                    <Form.Label htmlFor={name}>Observações</Form.Label>
                    <Form.Control as="textarea" name={name} id={name} maxLength={maxLength}/>
                </Form.Group>*/}
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={() => closeModal()}>Fechar</Button>
                <Button variant="primary">Salvar</Button>
            </Modal.Footer>
        </Modal>
    );
}