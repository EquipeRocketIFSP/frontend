import React from "react";
import {Form, Modal} from "react-bootstrap";
import ProntuarioModalProps from "../types/ProntuarioModalProps";

export default function SuspeitaDiagnosticaView(props: ProntuarioModalProps) {
    const {closeModal, data} = props;

    return (
        <Modal show={true} onHide={() => closeModal()} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Suspeita Diagnóstica</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form.Group className="mb-3 col-lg-12">
                    <Form.Label>Observações</Form.Label>
                    <Form.Control as="textarea" defaultValue={data.supeita_diagnostica} readOnly/>
                </Form.Group>
            </Modal.Body>
        </Modal>
    );
}