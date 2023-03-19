import {Link, Navigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios, {AxiosError, AxiosHeaders, HttpStatusCode} from "axios";
import {Alert, Button, Container, Form, Row, Spinner} from "react-bootstrap";

import Layouts from "../../../layouts/Layouts";
import Contracts from "../../../contracts/Contracts";
import Storages from "../../../Storages";
import Forms from "../../../forms/Forms";
import Components from "../../../components/Components";

type FormStatus = "idle" | "created" | "updated";

interface Props {
    title: string,
    clientPathname: string,
    apiPathname: string,
}

interface Path extends Record<string, string | undefined> {
    id?: string
}

interface SubmitContext {
    url: string,
    formData: FormData,
    headers: AxiosHeaders,
    setDataStatus: (status: FormStatus) => void,
}

export default function DefaultForm(props: Props): JSX.Element {
    const {title, apiPathname, clientPathname} = props;

    const [apiConnectionError, setApiConnectionError] = useState<string | null>(null);
    const [validationErrors, setValidationErrors] = useState<Contracts.DynamicObject<string>>({});
    const [usuario, setUsuario] = useState<Contracts.Funcionario | null>(null);
    const [dataStatus, setDataStatus] = useState<FormStatus>("idle");
    const [sendingForm, setSendingForm] = useState<boolean>(false);
    const [navigateToListing, setNavigateToListing] = useState<boolean>(false);

    const userData = Storages.userStorage.get();
    const urlParams = useParams<Path>();

    const headers = new AxiosHeaders()
        .setContentType("application/json")
        .setAuthorization(`${userData?.type} ${userData?.token}`);

    useEffect(() => {
        if (!urlParams.id || !userData)
            return;

        axios.get(`${process.env.REACT_APP_API_URL}/${apiPathname}/${urlParams.id}`, {headers})
            .then(({data}) => setUsuario(data));
    }, []);

    const onSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();

        if (!userData)
            return;

        const errors: Contracts.DynamicObject<string> = {};

        setValidationErrors(errors);
        setDataStatus("idle");
        setSendingForm(true);

        const formData = new FormData(evt.currentTarget);

        try {
            if (!urlParams.id) {
                await createOnSubmit({
                    url: `${process.env.REACT_APP_API_URL}/${apiPathname}`,
                    formData, setDataStatus, headers
                }, setNavigateToListing);
            } else {
                await editOnSubmit({
                    url: `${process.env.REACT_APP_API_URL}/${apiPathname}/${urlParams.id}`,
                    formData, setDataStatus, headers
                }, setUsuario);
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
        return <Navigate to={`/painel/${clientPathname}`}/>;

    if (!usuario && urlParams.id)
        return <Components.LoadingScreen/>;

    return (
        <Layouts.RestrictedLayout>
            <Container>
                <main className="py-3">
                    <h1>{title}</h1>

                    <Form onSubmit={onSubmit}>
                        {dataStatus === "created" ?
                            <Alert variant="success">Cadastro efetuado com sucesso</Alert> : <></>}
                        {dataStatus === "updated" ?
                            <Alert variant="success">Dados alterados com sucesso</Alert> : <></>}

                        <Forms.Usuario
                            data={usuario}
                            validationErrors={validationErrors}
                            apiConnectionError={apiConnectionError}
                        />

                        <Row className="rounded shadow mb-3 pt-3">
                            <Form.Group className="mb-3 col-lg-12">
                                <Form.Label htmlFor="email">E-mail*</Form.Label>
                                <Form.Control name="email" defaultValue={usuario?.email} maxLength={255} id="email"
                                              type="email"
                                              required/>
                                <Form.Text style={{color: "red"}}>{validationErrors["email"] ?? ""}</Form.Text>
                            </Form.Group>
                        </Row>

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
                                        <Link to={`/painel/${clientPathname}`}
                                              className="btn btn-outline-secondary">Voltar</Link>
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

async function createOnSubmit(context: SubmitContext, setNavigateToListing: (value: boolean) => void) {
    const {url, formData, headers, setDataStatus} = context;
    await axios.post(url, formData, {headers});

    setDataStatus("created");
    setTimeout(() => setNavigateToListing(true), 2000);
}

async function editOnSubmit(context: SubmitContext, setUsuario: (usuario: Contracts.PersonalData) => void) {
    const {url, formData, headers, setDataStatus} = context;
    const {data} = await axios.put(url, formData, {headers});

    setUsuario(data);
    setDataStatus("updated");
}