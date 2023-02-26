import { EventContentArg } from "@fullcalendar/core";
import daygrid from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import React, { useState } from "react";
import { Button } from "react-bootstrap";

import Layouts from "../../layouts/Layouts";

export default function Agenda() {

    const events = [
        { title: 'event 1', date: '2023-04-01' },
        { title: 'event 2', date: '2023-04-02' }
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
                            eventContent={renderEventContent}
                        />
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