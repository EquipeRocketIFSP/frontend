import React, {useState} from "react";
import DatePicker from "react-datepicker";
import {Form, Row} from "react-bootstrap";

export default function Calendar(): JSX.Element {
    const today = new Date();

    const [selectedDate, setSelectedDate] = useState<Date>(today);

    return (
        <Form.Group className="mb-3 col-lg-12">
            <Form.Label htmlFor="dataConsulta">Data da consulta*</Form.Label>

            <Row>
                <div className="mb-3 col-lg-6">
                    <div className="d-flex justify-content-center">
                        <DatePicker
                            selected={selectedDate}
                            onChange={(date) => setSelectedDate(date ?? today)}
                            minDate={today}
                            name="data_consulta"
                            id="data_consulta"
                            //highlightDates={datasConsultas}
                            showPopperArrow
                            showTimeSelect
                            inline
                            required
                        />
                    </div>
                </div>

                {/*<div className="mb-3 col-lg-6">
                                                <ul className="d-flex flex-column align-items-center"
                                                    style={{padding: 0}}>
                                                    <h5 style={{textAlign: "center"}}>Horas marcadas no
                                                        dia {dataConsulta.toLocaleDateString()}</h5>

                                                    {
                                                        datasConsultas.map((data) => {
                                                            if (dataConsulta.toLocaleDateString() != data.toLocaleDateString())
                                                                return <></>;

                                                            return <li
                                                                className="d-flex">{data.toLocaleTimeString()}</li>
                                                        })
                                                    }
                                                </ul>
                                            </div>*/}

            </Row>
        </Form.Group>
    );
}