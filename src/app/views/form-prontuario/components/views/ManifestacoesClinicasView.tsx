import React from "react";
import {Modal, Row} from "react-bootstrap";
import ProntuarioModalProps from "../types/ProntuarioModalProps";

export default function ManifestacoesClinicasView(props: ProntuarioModalProps) {
    const {closeModal, data} = props;

    console.log(data);

    return (
        <Modal show={true} onHide={() => closeModal()} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Manifestações Clínicas</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Row>
                    <legend>Geral</legend>
                    {data.prostracao ? <span><b>Prostração: </b>Sim</span> : <></>}
                    {data.febre ? <span><b>Febre: </b>Sim</span> : <></>}
                    {data.vomito ? <span><b>Vomito : </b>Sim</span> : <></>}
                    {data.diarreia ? <span><b>Diarreia: </b>Sim</span> : <></>}
                    {data.espasmos_convulsao ? <span><b>Espasmos/Convulção: </b>Sim</span> : <></>}
                    {data.deambulacao ? <span><b>Deambulação Alterada: </b>Sim</span> : <></>}
                    {data.sensibilidade_dor ? <span><b>Sensibilidade/Dor: </b>Sim</span> : <></>}
                    {data.lesoes_nodulos ? <span><b>Lesões/Nódulos: </b>Sim</span> : <></>}

                    {data.apetite ? <span><b>Apetite: </b>{data.apetite}</span> : <></>}
                    {data.linfonodos ? <span><b>Linfonodos: </b>{data.linfonodos}</span> : <></>}
                    {data.linfonodos_obs ? <span><b>Linfonodos Observações: </b>{data.linfonodos_obs}</span> : <></>}

                    {data.sensibilidade_dor || data.lesoes_nodulos ?
                        <legend>Regiões com sensibilidades, dores, nodulos e ferimentos</legend> : <></>}

                    {data.cabeca ? <span><b>Cabeça</b></span> : <></>}
                    {data.torax ? <span><b>Torax</b></span> : <></>}
                    {data.coluna?.length ? <span><b>Coluna: </b>{data.coluna?.join(", ")}</span> : <></>}
                    {data.abdomen?.length ? <span><b>Abdominal: </b>{data.abdomen?.join(", ")}</span> : <></>}

                    {data.m_toracicos?.length ?
                        <span><b>Músculos Torácicos: </b>{data.m_toracicos?.join(", ")}</span> : <></>}

                    {data.m_pelvicos?.length ?
                        <span><b>Músculos Pélvicos: </b>{data.m_pelvicos?.join(", ")}</span> : <></>}

                    {data.regioes_obs?.length ? <span><b>Observações: </b>{data.regioes_obs}</span> : <></>}
                </Row>

            </Modal.Body>
        </Modal>
    );
}