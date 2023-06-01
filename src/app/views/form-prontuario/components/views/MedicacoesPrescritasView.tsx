import {Button, Modal, Row} from "react-bootstrap";
import React from "react";
import ProntuarioModalProps from "../types/ProntuarioModalProps";

export default function MedicacoesPrescritasView(props: ProntuarioModalProps) {
    const {closeModal, data} = props;

    return (
        <Modal show={true} onHide={() => closeModal()} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Medicações Prescritas</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {
                    data.prescricoes.map((prescricao) => {
                        const {
                            nome,
                            uso,
                            dose,
                            duracao,
                            forma_farmaceutica,
                            concentracao,
                            frequencia,
                            quando_aplicar,
                            observacoes
                        } = prescricao;

                        return (
                            <Row className="summary mb-1">
                                <legend>{nome}</legend>

                                <span><b>Uso: </b> {uso}</span>
                                <span><b>Dose: </b> {dose}</span>
                                <span><b>Forma Farmaceutica: </b> {forma_farmaceutica}</span>
                                <span><b>Concentração: </b> {concentracao}</span>
                                <span><b>Frequência: </b> {frequencia}</span>
                                <span><b>Duração: </b> {duracao}</span>
                                <span><b>Quando Aplicar: </b> {quando_aplicar}</span>
                                {observacoes ? <span><b>Observações: </b> {observacoes}</span> : <></>}
                            </Row>
                        );
                    })
                }
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={() => closeModal()}>Fechar</Button>
                <Button variant="primary">Salvar</Button>
            </Modal.Footer>
        </Modal>
    );
}