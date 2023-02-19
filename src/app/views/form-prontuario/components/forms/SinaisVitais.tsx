import React from "react";
import {Button, Form, Modal, Row} from "react-bootstrap";
import Contracts from "../../../../contracts/Contracts";

export default function SinaisVitais(props: Contracts.CloseModal) {
    const {closeModal} = props;

    return (
        <Modal show={true} onHide={() => closeModal()} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Sinais Vitais</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Row>
                        <Form.Group className="mb-3 col-lg-4">
                            <Form.Label htmlFor="frequencia_cardiaca">Frequência Cardiaca (BPN)</Form.Label>
                            <Form.Control type="number" name="frequencia_cardiaca" id="frequencia_cardiaca" required/>
                        </Form.Group>

                        <Form.Group className="mb-3 col-lg-4">
                            <Form.Label htmlFor="frequencia_respiratoria">Frequência Repiratória (MPN)</Form.Label>
                            <Form.Control type="number" name="frequencia_respiratoria" id="frequencia_respiratoria" required/>
                        </Form.Group>

                        <Form.Group className="mb-3 col-lg-4">
                            <Form.Label htmlFor="temperatura">Temperatura (°C)</Form.Label>
                            <Form.Control type="number" name="temperatura" id="temperatura" required/>
                        </Form.Group>
                    </Row>

                    <Row>
                        <Form.Group className="mb-3 col-lg-4">
                            <Form.Label>Hidratação</Form.Label>
                            <Form.Check type="radio" name="hidratacao" value="Leve" label="< 3s (leve)" required/>
                            <Form.Check type="radio" name="hidratacao" value="Média" label=">= 3s (média)"/>
                            <Form.Check type="radio" name="hidratacao" value="Severa" label="> 5s (severa)"/>
                        </Form.Group>

                        <Form.Group className="mb-3 col-lg-4">
                            <Form.Label>Tempo de Preenchimento Capilar (TPC)</Form.Label>
                            <Form.Check type="radio" name="tpc" value="< 2s" label="< 2s" required/>
                            <Form.Check type="radio" name="tpc" value=">= 2s" label=">= 2s"/>
                        </Form.Group>

                        <Form.Group className="mb-3 col-lg-4">
                            <Form.Label>Mucosa</Form.Label>
                            <Form.Check type="radio" name="mucosa" value="Rosácea" label="Rosácea" required/>
                            <Form.Check type="radio" name="mucosa" value="Hiperemica" label="Hiperemica"/>
                            <Form.Check type="radio" name="mucosa" value="Perolácea" label="Perolácea"/>
                            <Form.Check type="radio" name="mucosa" value="Ictérica" label="Ictérica"/>
                            <Form.Check type="radio" name="mucosa" value="Cianótica" label="Cianótica"/>
                        </Form.Group>
                    </Row>

                    <Row>
                        <Form.Group className="mb-3 col-lg-6">
                            <Form.Label>Estado de Conciência</Form.Label>
                            <Form.Check type="radio" name="conciencia" value="Conciente" label="Conciente" required/>
                            <Form.Check type="radio" name="conciencia" value="Inconciente" label="Inconciente"/>
                        </Form.Group>

                        <Form.Group className="mb-3 col-lg-6">
                            <Form.Label>Escore Corporal</Form.Label>
                            <Form.Check type="radio" name="escore_corporal" value="< 2s" label="< 2s" required/>
                            <Form.Check type="radio" name="escore_corporal" value=">= 2s" label=">= 2s"/>
                        </Form.Group>
                    </Row>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={() => closeModal()}>
                    Fechar
                </Button>
                <Button variant="primary">
                    Salvar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}