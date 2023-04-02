import {Button, Modal, Row} from "react-bootstrap";
import React, {useContext} from "react";
import {Link} from "react-router-dom";
import {CalendarContext} from "../Calendar";

interface Props {
    showDeleteModal: () => void
}

export default function ScheduleModal(props: Props): JSX.Element {
    const {showDeleteModal} = props;
    const {agendamento, setAgendamento} = useContext(CalendarContext);

    if (!agendamento)
        return <></>;

    const {data_consulta, observacoes, veterinario, tutor, animal} = agendamento;

    const consultDate = new Date(data_consulta);
    consultDate.setHours(consultDate.getHours() - 3);

    const closeModal = () => setAgendamento(null);

    return (
        <Modal show={true} onHide={() => closeModal()} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Agendamento</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Row>
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <b>Animal: </b>{animal.nome}
                        </div>
                        <div>
                            <Link to={`/painel/tutores/${tutor.id}/animais/${animal.id}`}>
                                <i className="fa-solid fa-arrow-up-right-from-square"></i>
                            </Link>
                        </div>
                    </div>
                    <div>
                        <b>Tutor responsável no atendimento: </b>{tutor.nome}
                    </div>
                    <div>
                        <b>Veterinário: </b>{veterinario.nome} {veterinario?.crmv ? ` - ${veterinario?.crmv}` : ""}
                    </div>
                    <div>
                        <b>Data da consulta: </b>{consultDate.toLocaleDateString()} {consultDate.toLocaleTimeString()}
                    </div>

                    {observacoes.length ? <div><b>Observações: </b>{observacoes}</div> : <></>}
                </Row>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="primary" onClick={() => closeModal()}>Editar</Button>
                <Button variant="danger" onClick={showDeleteModal}>Cancelar Agendamento</Button>
                <Button variant="secondary" onClick={() => closeModal()}>Fechar</Button>
            </Modal.Footer>
        </Modal>
    );
}