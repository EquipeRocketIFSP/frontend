import React, {useEffect, useState} from "react";
import {Alert, Button, Container, Form, Spinner} from "react-bootstrap";
import {Link} from "react-router-dom";
import axios, {AxiosError, AxiosHeaders, HttpStatusCode} from "axios";

import Storages from "../../Storages";

import Contracts from "../../contracts/Contracts";
import Layouts from "../../layouts/Layouts";
import Forms from "../../forms/Forms";

import "./form-edit-clinica.scss";

export default function FormEditClinica(): JSX.Element {
    const [clinica, setClinica] = useState<Contracts.Clinica | null>(null);
    const [apiConnectionError, setApiConnectionError] = useState<string | null>(null);
    const [validationErrors, setValidationErrors] = useState<Contracts.DynamicObject<string>>({});
    const [dataUpdated, setDataUpdated] = useState<boolean>(false);
    const [sendingForm, setSendingForm] = useState<boolean>(false);

    const userData = Storages.userStorage.get();

    const onSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();

        setDataUpdated(false);
        setSendingForm(true);

        const formData = new FormData(evt.currentTarget);

        if (Object.keys(validationErrors).length) {
            setValidationErrors(validationErrors);
            return;
        }

        const headers = new AxiosHeaders()
            .setContentType("application/json")
            .setAuthorization(`${userData?.type} ${userData?.token}`);

        try {
            const {data} = await axios.put(`${process.env.REACT_APP_API_URL}/clinica`, formData, {headers});

            setClinica(data);
            setDataUpdated(true);
        } catch (e) {
            const response = (e as AxiosError).response;

            switch (response?.status) {
                case HttpStatusCode.BadRequest:
                    setValidationErrors(response.data as Contracts.DynamicObject<string>);
                    break;

                case HttpStatusCode.Unauthorized:
                    setApiConnectionError(response.data as string);
                    break;

                default:
                    setApiConnectionError("Não foi possivel editar os dados da clínica");
                    break;
            }
        }

        setSendingForm(false);
    }

    useEffect(() => {
        if (!userData)
            return;

        const headers = new AxiosHeaders();
        headers.setAuthorization(`${userData.type} ${userData.token}`);

        axios.get<Contracts.Clinica>(`${process.env.REACT_APP_API_URL}/clinica`, {headers})
            .then(({data}) => setClinica(data));
    }, []);

    if (!clinica) {
        return (
            <Layouts.RestrictedLayout>
                <Container>
                    <main id="form-clinica">
                        <div className="loading-form d-flex justify-content-center align-items-center">
                            <Spinner/>
                        </div>
                    </main>
                </Container>
            </Layouts.RestrictedLayout>
        );
    }

    return (
        <Layouts.RestrictedLayout>
            <Container>
                <main id="clinica" className="pt-5">
                    <h1>Dados da clínica</h1>

                    {dataUpdated ? <Alert variant="success">Dados alterados com sucesso</Alert> : <></>}
                    {apiConnectionError ? <Alert variant="danger">{apiConnectionError}</Alert> : <></>}

                    <Form onSubmit={onSubmit}>
                        <Forms.Clinica data={clinica} validationErrors={validationErrors}/>

                        {
                            sendingForm ?
                                (
                                    <div className="d-flex justify-content-between">
                                        <Button variant="outline-secondary" disabled>Voltar</Button>
                                        <Button variant="outline-success" disabled><Spinner animation="grow" size="sm"/></Button>
                                    </div>
                                ) :
                                (
                                    <div className="d-flex justify-content-between">
                                        <Link to="/painel" className="btn btn-outline-secondary">Voltar</Link>
                                        <Button type="submit" variant="outline-success">Finalizar</Button>
                                    </div>
                                )
                        }
                    </Form>
                </main>
            </Container>
        </Layouts.RestrictedLayout>
    );
}