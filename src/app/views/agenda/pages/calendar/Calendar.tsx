import {EventClickArg, EventContentArg} from "@fullcalendar/core";
import daygrid from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import {Container, Row} from "react-bootstrap";

import Layouts from "../../../../layouts/Layouts";
import {createContext, useEffect, useState} from "react";
import Contracts from "../../../../contracts/Contracts";
import axios from "axios";
import Memory from "../../../../Memory";
import Components from "../../../../components/Components";
import ScheduleModal from "./components/ScheduleModal";
import DeleteConfirmationModal from "./components/DeleteConfirmationModal";

export interface ICalendarContext {
    agendamento: Contracts.AgendamentoComplete | null,
    agendamentos: Contracts.Agendamento[],
    setAgendamento: Function
    setAgendamentos: Function
}

export const CalendarContext = createContext<ICalendarContext>({
    agendamento: null,
    agendamentos: [],
    setAgendamento: () => console.error("Função não implementada"),
    setAgendamentos: () => console.error("Função não implementada"),
});

export default function Calendar(): JSX.Element {
    const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());
    const [queriedDates, setQueriedDates] = useState<string[]>([]);
    const [agendamentos, setAgendamentos] = useState<Contracts.Agendamento[]>([]);
    const [agendamento, setAgendamento] = useState<Contracts.AgendamentoComplete | null>(null);
    const [showDeleteAgendamentoModal, setShowDeleteAgendamentoModal] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        selectedMonth.setDate(1);

        const queryDate = selectedMonth.toLocaleDateString().split("/").reverse().join("-");

        if (queriedDates.find((date) => date === queryDate))
            return;

        setQueriedDates([...queriedDates, queryDate]);

        axios.get<Contracts.Agendamento[]>(`${process.env.REACT_APP_API_URL}/agendamento?data=${queryDate}`, {headers: Memory.headers})
            .then(({data}) => setAgendamentos([...agendamentos, ...data]))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [selectedMonth]);

    const eventClick = (evt: EventClickArg) => {
        evt.jsEvent.preventDefault();

        axios.get<Contracts.AgendamentoComplete>((evt.el as HTMLAnchorElement).href, {headers: Memory.headers})
            .then(({data}) => setAgendamento(data))
            .catch(console.error);
    }

    const events = agendamentos.map((agendamento) => {
        return {
            title: agendamento.animal,
            start: agendamento.data_consulta,
            url: `${process.env.REACT_APP_API_URL}/agendamento/${agendamento.id}`,
            color: "green"
        };
    });

    if (loading)
        return <Components.LoadingScreen/>;

    return (
        <Layouts.RestrictedLayout>
            <CalendarContext.Provider value={{agendamento, agendamentos, setAgendamento, setAgendamentos}}>
                <Container>
                    <main className="py-3">
                        <h1>Agenda</h1>

                        <Row>
                            <Components.SearchBar btnAdd={{label: "Agendar", href: "adicionar"}} disableSearch/>

                            <div className="col-12 p-2">
                                <FullCalendar
                                    plugins={[daygrid, interactionPlugin]}
                                    initialView="dayGridMonth"
                                    weekends={false}
                                    events={events}
                                    eventColor={"green"}
                                    eventContent={renderEventContent}
                                    datesSet={(evt) => setSelectedMonth(evt.start)}
                                    eventClick={eventClick}
                                />
                            </div>

                            {/*<div className="col-12 col-md-3 p-2">
                            <Card className="d-flex justify-content-center h-100">
                                <Card.Title>Eventos</Card.Title>

                                <Card.Body>
                                    <ul>
                                        {
                                            events.map((event, i) => {
                                                return (
                                                    <li key={i}>{event.title}</li>
                                                )
                                            })
                                        }
                                    </ul>
                                </Card.Body>
                            </Card>
                        </div>*/}
                        </Row>
                    </main>
                </Container>

                <div>
                    {
                        agendamento && !showDeleteAgendamentoModal ?
                            <ScheduleModal showDeleteModal={() => setShowDeleteAgendamentoModal(true)}/> : <></>
                    }

                    {
                        agendamento && showDeleteAgendamentoModal ?
                            <DeleteConfirmationModal closeModal={() => setShowDeleteAgendamentoModal(false)}/> : <></>
                    }
                </div>
            </CalendarContext.Provider>
        </Layouts.RestrictedLayout>
    );
}

function renderEventContent(eventInfo: EventContentArg) {
    return (
        <>
            <b>{eventInfo.timeText}</b>
            <i>{eventInfo.event.title}</i>
        </>
    )
}