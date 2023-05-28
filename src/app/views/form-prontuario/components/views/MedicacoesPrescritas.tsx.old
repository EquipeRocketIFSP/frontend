import {Button, Form, Modal, Row} from "react-bootstrap";
import React, {useState} from "react";
import Contracts from "../../../../contracts/Contracts";
import MultiGroups from "../../../../components/multi-groups/MultiGroups";

export default function MedicacoesPrescritas(props: Contracts.CloseModal) {
    const {closeModal} = props;

    return (
        <Modal show={true} onHide={() => closeModal()} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Medicações Prescritas</Modal.Title>
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
    const [whenToApply, setWhenToApply] = useState<string>("");

    const whenToApplyValues = [
        "Em Jejum",
        "Após Alimentação",
        "Junto do Alimento"
    ];

    return (
        <Row>
            <Form.Group className="mb-3 col-lg-6">
                <Form.Label>Uso*</Form.Label>
                <Form.Select name="uso[]" required>
                    <option value="">- Selecione</option>
                    <option value="Oral">Oral</option>
                    <option value="Tópico">Tópico</option>
                    <option value="Oftalmico">Oftalmico</option>
                    <option value="ETC">ETC</option>
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3 col-lg-6">
                <Form.Label>Nome*</Form.Label>
                <Form.Control type="text" name="nome[]" required/>
            </Form.Group>

            <Form.Group className="mb-3 col-lg-4">
                <Form.Label>Dose*</Form.Label>
                <Form.Control type="text" name="dose[]" placeholder="ml, mg, g, ul, comp" required/>
            </Form.Group>

            <Form.Group className="mb-3 col-lg-4">
                <Form.Label>Forma Farmaceutica*</Form.Label>
                <Form.Control type="text" name="forma_farmaceutica[]"
                              placeholder="Comprimido, Xarope, Gotas, etc..." required/>
            </Form.Group>

            <Form.Group className="mb-3 col-lg-4">
                <Form.Label>Concentração*</Form.Label>
                <Form.Control type="text" name="concentracao[]" required/>
            </Form.Group>

            <Form.Group className="mb-3 col-lg-6">
                <Form.Label>Frequência*</Form.Label>
                <Form.Select name="frequencia[]" required>
                    <option value="">-Selecione</option>
                    <option value="1x/dia - SID - cd 24h">1x/dia - SID - cd 24h</option>
                    <option value="2x/dia - BID - cd 12h">2x/dia - BID - cd 12h</option>
                    <option value="3x/dia - TID - cd 8h">3x/dia - TID - cd 8h</option>
                    <option value="4x/dia - QID - cd 6h">4x/dia - QID - cd 6h</option>
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3 col-lg-6">
                <Form.Label>Duração*</Form.Label>
                <Form.Control type="text" name="duracao[]" placeholder="Dose única, durante x dias"
                              required/>
            </Form.Group>

            <Form.Group className="mb-3 col-lg-12">
                <Form.Label>Quando Aplicar*</Form.Label>

                {
                    whenToApplyValues.map((value) =>
                        <Form.Check type="radio" label={value} checked={whenToApply === value} key={value}
                                    onChange={() => setWhenToApply(value)}/>
                    )
                }
            </Form.Group>

            <Form.Group className="mb-3 col-lg-12">
                <Form.Label>Observações</Form.Label>
                <Form.Control type="text" as="textarea" name="observacoes[]" rows={3}/>
            </Form.Group>

            <input type="hidden" name="quando_aplicar[]" defaultValue={whenToApply}/>
        </Row>
    );
}