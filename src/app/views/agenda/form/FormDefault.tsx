import React, {useContext, useState} from "react";
import {Link} from "react-router-dom";
import Calendar from "./components/Calendar";
import {Button, Row, Spinner, Form} from "react-bootstrap";

import Contracts from "../../../contracts/Contracts";
import AnimalSelect from "./components/AnimalSelect";
import TutorSelect from "./components/TutorSelect";
import VeterinarioSelect from "./components/VeterinarioSelect";

import "react-datepicker/dist/react-datepicker.css";
import Components from "../../../components/Components";

export default function FormDefault(): JSX.Element {
    const {validationErrors, sendingForm} = useContext(Components.FormSubmitContext);

    const [selectedTutor, setSelectedTutor] = useState<Contracts.ReactSelectOption | null>(null);
    const [selectedAnimal, setSelectedAnimal] = useState<Contracts.ReactSelectOption | null>(null);
    const [selectedVeterinario, setSelectedVeterinario] = useState<Contracts.ReactSelectOption | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());

    return (
        <>
            <Row>
                <TutorSelect validationErrors={validationErrors} setSelectedItem={setSelectedTutor}/>

                {
                    selectedTutor ?
                        <AnimalSelect validationErrors={validationErrors} tutorId={selectedTutor.value}
                                      setSelectedItem={setSelectedAnimal}/> :
                        <></>
                }

                <VeterinarioSelect validationErrors={validationErrors}
                                   setSelectedItem={setSelectedVeterinario}/>

                <Calendar setSelectedDate={setSelectedDate}/>

                <Form.Group className="mb-3 col-lg-12">
                    <Form.Label htmlFor="observacoes">Observações</Form.Label>
                    <Form.Control as="textarea" name="observacoes" id="observacoes" rows={3}/>
                </Form.Group>

                <input type="hidden" name="tutor" value={selectedTutor?.value.toString() ?? ""}/>
                <input type="hidden" name="animal" value={selectedAnimal?.value.toString() ?? ""}/>
                <input type="hidden" name="veterinario" value={selectedVeterinario?.value.toString() ?? ""}/>
                <input type="hidden" name="data_consulta" value={selectedDate.toJSON()}/>

                {/*<Form.Group className="mb-3 col-lg-2 d-flex align-items-end justify-content-evenly">
                                <Button variant="outline-primary"><i className="fa-solid fa-eye"></i></Button>
                                <Button variant="outline-primary"><i className="fa-solid fa-plus"></i></Button>
                            </Form.Group>*/}
            </Row>

            {
                sendingForm ?
                    (
                        <div className="d-flex justify-content-between">
                            <Button variant="outline-secondary" disabled>Voltar</Button>
                            <Button variant="outline-success" disabled><Spinner animation="grow"
                                                                                size="sm"/></Button>
                        </div>
                    ) :
                    (
                        <div className="d-flex justify-content-between">
                            <Link to="" className="btn btn-outline-secondary">Voltar</Link>
                            <Button type="submit" variant="outline-success">Finalizar</Button>
                        </div>
                    )
            }
        </>
    );
}