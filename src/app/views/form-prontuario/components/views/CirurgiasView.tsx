import React from "react";
import {Container, Modal, Row} from "react-bootstrap";
import ProntuarioModalProps from "../types/ProntuarioModalProps";

export default function CirurgiasView(props: ProntuarioModalProps) {
    const {closeModal, data} = props;

    if (!data.cirurgia)
        return <></>;

    return (
        <Modal show={true} onHide={() => closeModal()} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Histórico de Cirurgias</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Row>
                    <legend>Informações</legend>
                    <span><b>Nome/Tipo de Cirurgia: </b>{data.cirurgia.descricao}</span>
                    <span><b>Data: </b>{new Date(data.cirurgia.data).toLocaleString('pt-BR')}</span>

                    <Container>
                        <legend>Medicamentos</legend>
                        {
                            data.cirurgia.medicamentos.map(({medicamento, lote, dose}) => {
                                return (
                                    <Row className="summary mb-1">
                                        <span><b>Medicamento : </b>{medicamento?.nome}</span>
                                        <span><b>Fabricante : </b>{medicamento?.fabricante}</span>
                                        <span><b>Concentração : </b>{medicamento?.concentracao}</span>
                                        <span><b>Princípio Ativo : </b>{medicamento?.principio_ativo}</span>
                                        <span><b>Dose : </b>{dose} {lote.medida}</span>
                                        <span><b>Lote : </b>{lote.lote}</span>
                                        <span><b>Validade : </b>{new Date(lote.validade).toLocaleDateString('pt-BR')}</span>
                                    </Row>
                                )
                            })
                        }
                    </Container>
                </Row>
            </Modal.Body>
        </Modal>
    );
}