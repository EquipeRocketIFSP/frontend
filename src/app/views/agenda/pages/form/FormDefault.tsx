import React, {useState} from "react";
import Contracts from "../../../../contracts/Contracts";
import Storages from "../../../../Storages";
import {Link, Navigate} from "react-router-dom";
import axios, {AxiosError, AxiosHeaders, HttpStatusCode} from "axios";
import Layouts from "../../../../layouts/Layouts";
import {Alert, Button, Container, Row, Spinner, Form} from "react-bootstrap";
import AnimalSelect from "./components/AnimalSelect";
import TutorSelect from "./components/TutorSelect";
import VeterinarioSelect from "./components/VeterinarioSelect";

import "react-datepicker/dist/react-datepicker.css";
import Calendar from "./components/Calendar";

export default function FormDefault(): JSX.Element {
    const [apiConnectionError, setApiConnectionError] = useState<string | null>(null);
    const [validationErrors, setValidationErrors] = useState<Contracts.DynamicObject<string>>({});
    const [dataStatus, setDataStatus] = useState<Contracts.FormStatus>("idle");
    const [sendingForm, setSendingForm] = useState<boolean>(false);
    const [navigateToListing, setNavigateToListing] = useState<boolean>(false);

    const [selectedTutor, setSelectedTutor] = useState<Contracts.ReactSelectOption | null>(null);
    const [selectedAnimal, setSelectedAnimal] = useState<Contracts.ReactSelectOption | null>(null);
    const [selectedVeterinario, setSelectedVeterinario] = useState<Contracts.ReactSelectOption | null>(null);

    const userData = Storages.userStorage.get();

    const headers = new AxiosHeaders()
        .setContentType("application/json")
        .setAuthorization(`${userData?.type} ${userData?.token}`);

    const onSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();

        if (!userData)
            return;

        const errors: Contracts.DynamicObject<string> = {};

        setValidationErrors(errors);
        setDataStatus("idle");
        setSendingForm(true);

        const formData = new FormData(evt.currentTarget);

        //selectedTutores.forEach(({value}) => formData.append("tutores[]", value.toString()));

        try {

        } catch (e) {
            const response = (e as AxiosError).response;

            switch (response?.status) {
                case HttpStatusCode.BadRequest:
                    setValidationErrors(response.data as Contracts.DynamicObject<string>);
                    break;

                case HttpStatusCode.Unauthorized:
                case HttpStatusCode.Conflict:
                    setApiConnectionError(response.data as string);
                    break;

                default:
                    setApiConnectionError("Não foi possivel concluir essa operação");
                    break;
            }
        }

        setSendingForm(false);
    }

    if (navigateToListing)
        return <Navigate to={`/painel`}/>;

    return (
        <Layouts.RestrictedLayout>
            <main id="form-animal">
                <h1>Dados do animal</h1>

                <Container>
                    <Form onSubmit={onSubmit}>
                        {dataStatus === "created" ?
                            <Alert variant="success">Cadastro efetuado com sucesso</Alert> : <></>}
                        {dataStatus === "updated" ?
                            <Alert variant="success">Dados alterados com sucesso</Alert> : <></>}

                        {apiConnectionError ? <Alert variant="danger">{apiConnectionError}</Alert> : <></>}

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

                            <Calendar/>

                            <Form.Group className="mb-3 col-lg-12">
                                <Form.Label htmlFor="observacoes">Observações</Form.Label>
                                <Form.Control as="textarea" name="observacoes" id="observacoes" rows={3}/>
                            </Form.Group>

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
                    </Form>
                </Container>
            </main>
        </Layouts.RestrictedLayout>
    );
}