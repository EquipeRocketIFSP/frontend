import {Alert, Button, Modal} from "react-bootstrap";
import React, {useContext, useState} from "react";
import axios from "axios";
import Contracts from "../../../../../contracts/Contracts";
import {CalendarContext} from "../Calendar";
import Memory from "../../../../../Memory";

export default function DeleteConfirmationModal(props: Contracts.CloseModal): JSX.Element {
    const {closeModal} = props;
    const {agendamento, agendamentos, setAgendamento, setAgendamentos} = useContext(CalendarContext);
    const [apiErrorMessage, setApiErrorMessage] = useState<string | null>(null);
    const [deleted, setDeleted] = useState<boolean>(false);

    if (!agendamento)
        return <></>;

    const deleteSchedule = async () => {
        setDeleted(false);
        setApiErrorMessage(null);

        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/agendamento/${agendamento.id}`, {headers: Memory.headers});
            const index = agendamentos.findIndex((item) => item.id === agendamento.id);

            agendamentos.splice(index, 1);

            setAgendamentos(agendamentos);
            setDeleted(true);

            setTimeout(() => setAgendamento(null), 1000);
        } catch (e) {
            setApiErrorMessage("Não foi possivel concluir essa operação");
        }
    }

    return (
        <Modal show={true} onHide={() => closeModal()} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Cancelar Agendamento</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {deleted ? <Alert variant="success">Agendamento cancelado</Alert> : <></>}
                {apiErrorMessage ? <Alert variant="danger">{apiErrorMessage}</Alert> : <></>}

                Tem certeza que deseja cancelar esse agendamento? <b>Essa é uma ação irreversível.</b>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={() => closeModal()}>Não</Button>
                <Button variant="danger" onClick={deleteSchedule}>Sim, desejo cancelar o agendamento</Button>
            </Modal.Footer>
        </Modal>
    );
}