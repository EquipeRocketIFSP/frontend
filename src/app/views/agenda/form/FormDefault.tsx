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
import Helpers from "../../../helpers/Helpers";

interface Props {
    agendamento?: Contracts.AgendamentoComplete
}

export default function FormDefault(props: Props): JSX.Element {
    const {agendamento} = props;
    const {validationErrors, sendingForm} = useContext(Components.FormSubmitContext);

    const scheduledDate = agendamento ? new Date(agendamento.data_consulta) : new Date();
    scheduledDate.setHours(scheduledDate.getHours() - 3);

    const [
        selectedTutor,
        setSelectedTutor
    ] = useState<Contracts.ReactSelectOption | null>(agendamento ? Helpers.ReactSelectOptionFactory.factory(agendamento.tutor) : null);

    const [
        selectedAnimal,
        setSelectedAnimal
    ] = useState<Contracts.ReactSelectOption | null>(agendamento ? Helpers.ReactSelectOptionFactory.factory(agendamento.animal) : null);

    const [
        selectedVeterinario,
        setSelectedVeterinario
    ] = useState<Contracts.ReactSelectOption | null>(agendamento ? Helpers.ReactSelectOptionFactory.factory(agendamento.veterinario) : null);

    const [selectedDate, setSelectedDate] = useState<Date>(scheduledDate);

    return (
        <>
            <Row>
                <TutorSelect validationErrors={validationErrors} tutor={agendamento?.tutor}
                             setSelectedItem={setSelectedTutor}/>

                {
                    selectedTutor ?
                        <AnimalSelect validationErrors={validationErrors} tutorId={selectedTutor.value}
                                      animal={agendamento?.animal}
                                      setSelectedItem={setSelectedAnimal}/> :
                        <></>
                }

                <VeterinarioSelect validationErrors={validationErrors}
                                   veterinario={agendamento?.veterinario}
                                   setSelectedItem={setSelectedVeterinario}/>

                <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>

                <Form.Group className="mb-3 col-lg-12">
                    <Form.Label htmlFor="observacoes">Observações</Form.Label>
                    <Form.Control as="textarea" name="observacoes" id="observacoes" rows={3}
                                  defaultValue={agendamento?.observacoes}/>
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
                            <Link to="/painel/agenda" className="btn btn-outline-secondary">Voltar</Link>
                            <Button type="submit" variant="outline-success">Finalizar</Button>
                        </div>
                    )
            }
        </>
    );
}