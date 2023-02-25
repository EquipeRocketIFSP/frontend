import {Button, Form, Modal, Row} from "react-bootstrap";
import MultiGroups from "../../../../components/multi-groups/MultiGroups";
import Contracts from "../../../../contracts/Contracts";

export default function Medicacoes(props: Contracts.CloseModal) {
    const {closeModal} = props;
    const medicineTypes = [
        "Uso Contínuo",
        "Uso Único",
        "Uso Recorrente (semestral, bimestral, etc...)",
        "Ecto e Endoparasitas"
    ];

    return (
        <Modal show={true} onHide={() => closeModal()} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Historico de Medicações</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <MultiGroups>
                    <Row style={{borderBottom: "1px solid #cdd4d9"}} className="mb-2">
                        <Form.Group className="mb-3 col-lg-6">
                            <Form.Label>Nome*</Form.Label>
                            <Form.Control type="text" name="nome_medicamento[]" required/>
                        </Form.Group>

                        <Form.Group className="mb-3 col-lg-6">
                            <Form.Label>Tipo de Medicamento*</Form.Label>
                            <Form.Select required>
                                <option value="">-Selecione</option>

                                {medicineTypes.map((medicineType) => <option
                                    value={medicineType}>{medicineType}</option>)}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3 col-lg-12">
                            <Form.Label>Motivo de uso*</Form.Label>
                            <Form.Control type="text" name="motivo_uso[]" required/>
                        </Form.Group>

                        <Form.Group className="mb-3 col-lg-6">
                            <Form.Label>Data Inicial</Form.Label>
                            <Form.Control type="date" name="data_inicial[]" required/>
                        </Form.Group>

                        <Form.Group className="mb-3 col-lg-6">
                            <Form.Label>Data Final</Form.Label>
                            <Form.Control type="date" name="data_final[]" required/>
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