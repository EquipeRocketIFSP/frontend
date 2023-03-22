import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios, {AxiosError, AxiosHeaders, HttpStatusCode} from "axios";
import {Alert, Button, Container, Form, Row, Spinner} from "react-bootstrap";

import Layouts from "../../layouts/Layouts";
import Contracts from "../../contracts/Contracts";
import Memory from "../../Memory";
import Storages from "../../Storages";
import Forms from "../../forms/Forms";
import Components from "../../components/Components";

export default function FormEditUsuario(): JSX.Element {
    const [apiConnectionError, setApiConnectionError] = useState<string | null>(null);
    const [validationErrors, setValidationErrors] = useState<Contracts.DynamicObject<string>>({});
    const [usuario, setUsuario] = useState<Contracts.Funcionario | null>(null);
    const [dataUpdated, setDataUpdated] = useState<boolean>(false);
    const [sendingForm, setSendingForm] = useState<boolean>(false);

    const userData = Storages.userStorage.get();

    const onSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();

        setDataUpdated(false);
        setSendingForm(true);

        const errors: Contracts.DynamicObject<string> = {};
        const formData = new FormData(evt.currentTarget);
        const pathname = Memory.authorites.find((authority) => authority === "VETERINARIO") ? "veterinario" : "funcionario";

        setValidationErrors(errors);

        if (formData.get("senha") !== formData.get("confirme_senha")) {
            errors["senha"] = "As senhas não coincidem";
            setValidationErrors(errors);
            return;
        }

        const headers = new AxiosHeaders()
            .setContentType("application/json")
            .setAuthorization(`${userData?.type} ${userData?.token}`);

        try {
            const {data} = await axios.put<Contracts.Funcionario>(`${process.env.REACT_APP_API_URL}/${pathname}/${usuario?.id}`, formData, {headers});

            setUsuario(data);
            setApiConnectionError(null);
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
                    setApiConnectionError("Não foi possivel editar os dados do usuário");
                    break;
            }
        }

        setSendingForm(false);
    }

    useEffect(() => {
        if (!userData)
            return;

        const headers = new AxiosHeaders().setAuthorization(`${userData.type} ${userData.token}`);

        axios.get<Contracts.Funcionario>(`${process.env.REACT_APP_API_URL}/usuario`, {headers})
            .then(({data}) => setUsuario(data));
    }, []);

    if (!usuario)
        return <Components.LoadingScreen/>;

    return (
        <Layouts.RestrictedLayout>
            <Container>
                <main id="form-edit-usuario" className="py-3">
                    <h1>Dados do usuário</h1>

                    <Components.Breadcrumbs>
                        <li className="breadcrumb-item"><Link to="/painel">Painel</Link></li>
                        <li className="breadcrumb-item active">Meus dados</li>
                    </Components.Breadcrumbs>

                    <Form onSubmit={onSubmit}>
                        {dataUpdated ? <Alert variant="success">Dados alterados com sucesso</Alert> : <></>}

                        <Forms.Usuario
                            data={usuario}
                            validationErrors={validationErrors}
                            apiConnectionError={apiConnectionError}
                        />

                        {
                            Memory.authorites.find((authority) => authority === "VETERINARIO") ?
                                <Row className="rounded shadow mb-3 pt-3">
                                    <Form.Group className="mb-3 col-lg-12">
                                        <Form.Label>CRMV*</Form.Label>
                                        <Form.Control name="crmv" defaultValue={usuario?.crmv} required/>
                                    </Form.Group>
                                </Row> : <></>
                        }

                        <Row className="rounded shadow mb-3 pt-3">
                            <Form.Group className="mb-3 col-lg-12">
                                <Form.Label htmlFor="email">E-mail*</Form.Label>
                                <Form.Control name="email" defaultValue={usuario.email} maxLength={255} id="email"
                                              type="email"
                                              required/>
                                <Form.Text style={{color: "red"}}>{validationErrors["email"] ?? ""}</Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-6">
                                <Form.Label htmlFor="senha">Senha*</Form.Label>
                                <Form.Control type="password" name="senha" maxLength={255} id="senha"/>
                                <Form.Text style={{color: "red"}}>{validationErrors["senha"] ?? ""}</Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-6">
                                <Form.Label htmlFor="confirme_senha">Confirme sua senha*</Form.Label>
                                <Form.Control type="password" name="confirme_senha" maxLength={255}
                                              id="confirme_senha"/>
                                <Form.Text style={{color: "red"}}>{validationErrors["senha"] ?? ""}</Form.Text>
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