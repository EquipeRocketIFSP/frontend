import React from "react";
import {Modal, Row} from "react-bootstrap";
import ProntuarioModalProps from "../types/ProntuarioModalProps";

export default function SinaisVitaisView(props: ProntuarioModalProps) {
    const {closeModal, data} = props;

    return (
        <Modal show={true} onHide={() => closeModal()} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Sinais Vitais</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Row>
                    <span><b>Frequência Cardiaca: </b>{data.frequencia_cardiaca} BPM</span>
                    <span><b>Frequência Repiratória: </b>{data.frequencia_respiratoria} MPM</span>
                    <span><b>Temperatura : </b>{data.temperatura} °C</span>
                    <span><b>Peso: </b>{data.peso}</span>
                    <span><b>Desidratação: </b>{data.hidratacao}</span>
                    <span><b>Tempo de Preenchimento Capilar: </b>{data.tpc}</span>
                    <span><b>Mucosa: </b>{data.mucosa}</span>
                    <span><b>Estado de Conciência: </b>{data.conciencia}</span>
                    <span><b>Escore Corporal: </b>{data.escore_corporal}</span>
                </Row>
            </Modal.Body>
        </Modal>
    );
}