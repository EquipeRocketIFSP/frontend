import { EventContentArg } from "@fullcalendar/core";
import daygrid from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import { Button, Card } from "react-bootstrap";

import Layouts from "../../layouts/Layouts";

export default function Agenda() {

    const events = [
        {
            title: 'Evento de dia todo',
            start: '2023-02-01'
        },
        {
            title: 'Evento longo',
            start: '2023-02-07',
            end: '2023-02-10',
            color: 'purple' // pode mudar a cor!
        },
        {
            groupId: '999',
            title: 'Evento que se repete',
            start: '2023-02-09T16:00:00'
        },
        {
            groupId: '999',
            title: 'Evento que se repete',
            start: '2023-02-16T16:00:00'
        }, {
            title: 'Evento com nome longo para mostrar que quebra layout',
            description: 'Todos os eventos podem ter descrição', // não funciona ainda
            start: '2023-02-22T16:00:00'
        },
        {
            title: 'Evento com hora',
            start: '2023-02-13T07:00:00'
        },
        {
            title: 'Evento com link',
            url: 'http://google.com/',
            start: '2023-02-28'
        }
    ]

    return (
        <Layouts.Layout>
            <main id="form-prontuario">
                <h1>Agenda</h1>

                <div className="d-flex">
                    <div className="col-3 p-2">
                        <div className="d-flex justify-content-center">
                            <Button>Novo agendamento</Button>
                        </div>
                    </div>

                    <div className="col-9 p-2 w-50">
                        <FullCalendar
                            plugins={[daygrid]}
                            initialView="dayGridMonth"
                            weekends={false}
                            events={events}
                            eventColor={"green"}
                            eventContent={renderEventContent}
                        />
                    </div>

                    <div className="col-3 p-2">
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
                    </div>
                </div>
            </main>
        </Layouts.Layout>
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