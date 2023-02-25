import React from "react";
import Contracts from "../../../../contracts/Contracts";
import {Button, Form, Modal} from "react-bootstrap";

interface Props extends Contracts.CloseModal {
    title: string,
    name: string,
    maxLength: number
}

export default function Observations(props: Props) {
    const {closeModal, title, name, maxLength} = props;

    return (
        <Modal show={true} onHide={() => closeModal()} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form.Group className="mb-3 col-lg-12">
                    <Form.Label htmlFor={name}>Observações</Form.Label>
                    <Form.Control as="textarea" name={name} id={name} maxLength={maxLength}/>
                </Form.Group>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={() => closeModal()}>Fechar</Button>
                <Button variant="primary">Salvar</Button>
            </Modal.Footer>
        </Modal>
    );
}