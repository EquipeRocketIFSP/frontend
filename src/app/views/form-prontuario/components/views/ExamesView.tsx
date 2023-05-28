import React from "react";
import {Modal, Row} from "react-bootstrap";
import ProntuarioModalProps from "../types/ProntuarioModalProps";

export default function ExamesView(props: ProntuarioModalProps): JSX.Element {
    const {closeModal, data} = props;

    return (
        <Modal show={true} onHide={() => closeModal()} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Exames</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {
                    data.exames.map((exame) => {
                        const {
                            tipo_exame,
                            citologia,
                            outros_citologia,
                            hematologia,
                            bioquimico,
                            imagem,
                            outros_exames,
                            cabeca,
                            torax,
                            coluna,
                            abdomen,
                            m_pelvicos,
                            m_toracicos,
                            regioes_obs,
                        } = exame;

                        return (
                            <Row className="summary mb-1">
                                <legend>{tipo_exame}</legend>

                                <span><b>Exame: </b> {citologia || hematologia || bioquimico || imagem}</span>

                                {
                                    outros_citologia || outros_exames ?
                                        <span><b>Outros: </b>{outros_citologia || outros_exames}</span> : <></>
                                }

                                {
                                    imagem ?
                                        <>
                                            <legend>Regiões da imagem</legend>

                                            {cabeca ? <span><b>Cabeça</b></span> : <></>}
                                            {torax ? <span><b>Torax</b></span> : <></>}

                                            {coluna?.length ? <span><b>Coluna: </b>{coluna?.join(", ")}</span> : <></>}
                                            {abdomen?.length ?
                                                <span><b>Abdominal: </b>{abdomen?.join(", ")}</span> : <></>}

                                            {m_toracicos?.length ?
                                                <span><b>Músculos Torácicos: </b>{m_toracicos?.join(", ")}</span> : <></>}

                                            {m_pelvicos?.length ?
                                                <span><b>Músculos Pélvicos: </b>{m_pelvicos?.join(", ")}</span> : <></>}

                                            {regioes_obs?.length ?
                                                <span><b>Observações: </b>{regioes_obs}</span> : <></>}
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