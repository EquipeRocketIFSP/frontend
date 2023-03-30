import React, {useEffect, useState} from "react";
import DatePicker from "react-datepicker";
import {Form, ListGroup, Row} from "react-bootstrap";
import axios from "axios";

import Memory from "../../../../../Memory";
import Contracts from "../../../../../contracts/Contracts";

interface Props {
    setSelectedDate: (date: Date) => void
}

export default function Calendar(props: Props): JSX.Element {
    const today = new Date();

    const [selectedDate, setSelectedDate] = useState<Date>(today);
    const [selectedMonth, setSelectedMonth] = useState<Date>(today);
    const [agendamentos, setAgendamentos] = useState<Contracts.Agendamento[]>([]);
    const [queriedDates, setQueriedDates] = useState<string[]>([]);

    const onChange = (date: Date | null) => {
        setSelectedDate(date ?? today);
        props.setSelectedDate(date ?? today);
    }

    const onMonthChange = (date: Date | null) => setSelectedMonth(date ?? today);

    useEffect(() => {
        selectedMonth.setDate(1);

        const queryDate = selectedMonth.toLocaleDateString().split("/").reverse().join("-");

        if (queriedDates.find((date) => date === queryDate))
            return;

        setQueriedDates([...queriedDates, queryDate]);

        axios.get<Contracts.Agendamento[]>(`${process.env.REACT_APP_API_URL}/agendamento?data=${queryDate}`, {headers: Memory.headers})
            .then(({data}) => setAgendamentos([...agendamentos, ...data]))
            .catch(console.error);

    }, [selectedMonth]);

    return (
        <Form.Group className="mb-3 col-lg-12">
            <Form.Label htmlFor="dataConsulta">Data da consulta*</Form.Label>

            <Row>
                <div className="mb-3 col-lg-6">
                    <div className="d-flex justify-content-center">
                        <DatePicker
                            selected={selectedDate}
                            onChange={onChange}
                            minDate={today}
                            onMonthChange={onMonthChange}
                            name="data_consulta"
                            id="data_consulta"
                            highlightDates={agendamentos.map(({data_consulta}) => new Date(data_consulta))}
                            showPopperArrow
                            showTimeSelect
                            inline
                            required
                        />
                    </div>
                </div>

                <div className="mb-3 col-lg-6">
                    <ul className="d-flex flex-column align-items-center" style={{padding: 0}}>
                        <h5 style={{textAlign: "center"}}>
                            Horas marcadas no dia {selectedDate.toLocaleDateString()}
                        </h5>

                        <div className="d-none d-md-block col-12">
                            <ListGroup horizontal="md" className="my-2 col-12">
                                <ListGroup.Item className="col-md-3"><b>Hora</b></ListGroup.Item>
                                <ListGroup.Item className="col-md-5"><b>Veterinário</b></ListGroup.Item>
                                <ListGroup.Item className="col-md-4"><b>Animal</b></ListGroup.Item>
                            </ListGroup>
                        </div>

                        {
                            agendamentos.map(({data_consulta, veterinario, animal}) => {
                                const date = new Date(data_consulta);

                                if (selectedDate.toLocaleDateString() !== date.toLocaleDateString())
                                    return <></>;

                                date.setHours(date.getHours() - 3);

                                return (
                                    <ListGroup className="col-md-12 mb-2" horizontal>
                                        <ListGroup.Item className="col-md-3">
                                            <b className="d-md-none">Hora: <br/></b>{date.toLocaleTimeString()}
                                        </ListGroup.Item>
                                        <ListGroup.Item className="col-md-5">
                                            <b className="d-md-none">Veterinário: <br/></b>{veterinario}
                                        </ListGroup.Item>
                                        <ListGroup.Item className="col-md-4">
                                            <b className="d-md-none">Animal: <br/></b>{animal}
                                        </ListGroup.Item>
                                    </ListGroup>
                                );
                            })
                        }
                    </ul>
                </div>

            </Row>
        </Form.Group>
    );
}