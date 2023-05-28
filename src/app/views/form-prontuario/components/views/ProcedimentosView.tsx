import React from "react";
import {Modal, Row} from "react-bootstrap";
import ProntuarioModalProps from "../types/ProntuarioModalProps";

export default function ProcedimentosView(props: ProntuarioModalProps) {
    const {closeModal, data} = props;

    return (
        <Modal show={true} onHide={() => closeModal()} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Procedimentos</Modal.Title>
            </Modal.Header>

            <Modal.Body>

                {
                    data.procedimentos.map((item) => {
                        const {
                            procedimento,
                            procedimento_outros,
                            medicamento,
                            lote,
                            dose
                        } = item;

                        return (
                            <Row className="summary mb-1">
                                <span><b>Procedimento: </b>{procedimento}</span>

                                {
                                    procedimento_outros ?
                                        <span><b>Outros: </b>{procedimento_outros}</span> : <></>
                                }

                                {
                                    medicamento && dose && lote ?
                                        <>
                                            <span><b>Medicamento : </b>{medicamento?.nome}</span>
                                            <span><b>Fabricante : </b>{medicamento?.fabricante}</span>
                                            <span><b>Concentração : </b>{medicamento?.concentracao}</span>
                                            <span><b>Princípio Ativo : </b>{medicamento?.principio_ativo}</span>
                                            <span><b>Dose : </b>{dose} {lote.medida}</span>
                                            <span><b>Lote : </b>{lote.lote}</span>
                                            <span><b>Validade : </b>{new Date(lote.validade).toLocaleDateString('pt-BR')}</span>
                                        </> : <></>
                                }
                            </Row>
                        );
                    })
                }

            </Modal.Body>
        </Modal>
    );
}