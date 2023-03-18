import {Link, Navigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios, {AxiosError, AxiosHeaders, HttpStatusCode} from "axios";
import {Alert, Button, Container, Form, Spinner} from "react-bootstrap";

import Layouts from "../../layouts/Layouts";
import Contracts from "../../contracts/Contracts";
import Storages from "../../Storages";
import LoadingScreen from "../../components/loading-screen/LoadingScreen";
import Forms from "../../forms/Forms";

export default function FormTutores(): JSX.Element {
    const [apiConnectionError, setApiConnectionError] = useState<string | null>(null);
    const [validationErrors, setValidationErrors] = useState<Contracts.DynamicObject<string>>({});
    const [usuario, setUsuario] = useState<Contracts.Funcionario | null>(null);
    const [dataCreated, setDataCreated] = useState<boolean>(false);
    const [dataUpdated, setDataUpdated] = useState<boolean>(false);
    const [sendingForm, setSendingForm] = useState<boolean>(false);
    const [navigateToListing, setNavigateToListing] = useState<boolean>(false);

    const userData = Storages.userStorage.get();
    const urlParams = useParams<{ id?: string }>();

    useEffect(() => {
        if (!urlParams.id || !userData)
            return;

        const headers = new AxiosHeaders()
            .setAuthorization(`${userData?.type} ${userData?.token}`);

        axios.get(`${process.env.REACT_APP_API_URL}/tutor/${urlParams.id}`, {headers})
            .then(({data}) => setUsuario(data));
    }, []);

    const onSubmitCreate = async (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();

        if (!userData)
            return;

        setSendingForm(true);

        const formData = new FormData(evt.currentTarget);
        const headers = new AxiosHeaders()
            .setContentType("application/json")
            .setAuthorization(`${userData?.type} ${userData?.token}`);

        try {
            if (urlParams.id) {
                const {data} = await axios.put(`${process.env.REACT_APP_API_URL}/tutor/${urlParams.id}`, formData, {headers});

                setUsuario(data);
                setDataUpdated(true);
            } else {
                await axios.post(`${process.env.REACT_APP_API_URL}/tutor`, formData, {headers});

                setDataCreated(true);
                setTimeout(() => setNavigateToListing(true), 2000);
            }
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
        return <Navigate to="/painel/tutores"/>;

    if (!usuario && urlParams.id)
        return <LoadingScreen/>;

    return (
        <Layouts.Layout>
            <Container>
                <main id="form-edit-usuario" className="py-3">
                    <h1>Dados do tutor</h1>

                    <Form onSubmit={onSubmitCreate}>
                        {dataCreated ? <Alert variant="success">Cadastro efetuado com sucesso</Alert> : <></>}
                        {dataUpdated ? <Alert variant="success">Dados alterados com sucesso</Alert> : <></>}

                        <Forms.Usuario
                            data={usuario}
                            validationErrors={validationErrors}
                            apiConnectionError={apiConnectionError}
                        />

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
        </Layouts.Layout>
    );
}