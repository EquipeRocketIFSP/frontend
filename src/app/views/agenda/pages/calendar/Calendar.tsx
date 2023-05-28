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
import Helpers from "../../../../helpers/Helpers";

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
        const months: Record<string, number> = {
            "January": 0,
            "February": 1,
            "March": 2,
            "April": 3,
            "May": 4,
            "June": 5,
            "July": 6,
            "August": 7,
            "September": 8,
            "October": 9,
            "November": 10,
            "December": 11
        }
        const targetMonth = (document.querySelector(".fc-toolbar-title") as HTMLElement)?.textContent?.replace(/\d/gmi, "").trim();

        selectedMonth.setDate(1);

        if (targetMonth)
            selectedMonth.setMonth(months[targetMonth]);

        selectedMonth.setHours(0);
        selectedMonth.setMinutes(0);
        selectedMonth.setSeconds(0);

        const queryDate = Helpers.DateFormat.formatToUS(selectedMonth);

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
        const start = new Date(agendamento.data_consulta);
        start.setHours(start.getHours() - 3);

        return {
            title: agendamento.animal,
            start,
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
                                    weekends
                                    events={events}
                                    eventColor={"green"}
                                    eventContent={renderEventContent}
                                    datesSet={(evt) => setSelectedMonth(evt.start)}
                                    eventClick={eventClick}
                                />
                            </div>
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