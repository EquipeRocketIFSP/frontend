import React, {useEffect, useState} from "react";
import {Alert, Button, Container, Form, Row, Spinner} from "react-bootstrap";
import {Link} from "react-router-dom";
import axios, {AxiosError, AxiosHeaders, HttpStatusCode} from "axios";

import Storages from "../../Storages";

import Contracts from "../../contracts/Contracts";
import Helpers from "../../helpers/Helpers";
import Layouts from "../../layouts/Layouts";

import Address from "../../components/address/Address";
import Contacts from "../../components/contacts/Contacts";

import "./clinica.scss";

export default function Clinica(): JSX.Element {
    const [clinica, setClinica] = useState<Contracts.Clinica | null>(null);
    const [apiConnectionError, setApiConnectionError] = useState<string | null>(null);
    const [validationErrors, setValidationErrors] = useState<Contracts.DynamicObject<string>>({});
    const [clinicaUpdated, setClinicaUpdated] = useState<boolean>(false);

    const userData = Storages.userStorage.get();

    const onSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();

        setClinicaUpdated(false);

        const formData = new FormData(evt.currentTarget);
        const errors = validateForm(formData);

        if (Object.keys(errors).length) {
            setValidationErrors(errors);
            return;
        }

        const headers = new AxiosHeaders()
            .setContentType("application/json")
            .setAuthorization(`${userData?.type} ${userData?.token}`);

        try {
            const {data} = await axios.put(`${process.env.REACT_APP_API_URL}/clinica`, formData, {headers});

            setClinica(data);
            setClinicaUpdated(true);
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

                    {clinicaUpdated ? <Alert variant="success">Dados alterados com sucesso</Alert> : <></>}
                    {apiConnectionError ? <Alert variant="danger">{apiConnectionError}</Alert> : <></>}

                    <Form onSubmit={onSubmit}>
                        <Row className="rounded shadow mb-3 pt-3">
                            <Form.Group className="mb-3 col-lg-6">
                                <Form.Label htmlFor="nome_fantasia">Nome Fantasia*</Form.Label>
                                <Form.Control name="nome_fantasia" maxLength={255}
                                              defaultValue={clinica?.nome_fantasia}
                                              id="nome_fantasia"
                                              required/>
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-6">
                                <Form.Label htmlFor="razao_social">Razão Social*</Form.Label>
                                <Form.Control name="razao_social" maxLength={255}
                                              defaultValue={clinica?.razao_social} id="razao_social"
                                              required/>
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-6">
                                <Form.Label htmlFor="cnpj">CNPJ*</Form.Label>
                                <Form.Control name="cnpj" maxLength={255}
                                              defaultValue={clinica?.cnpj} id="cnpj"
                                              onInput={Helpers.Masks.cnpj} required/>

                                <Form.Text style={{color: "red"}}>{validationErrors["cnpj"] ?? ""}</Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-6">
                                <Form.Label htmlFor="cnae">CNAE*</Form.Label>
                                <Form.Control name="cnae" maxLength={255}
                                              defaultValue={clinica?.cnae} id="cnae"
                                              required/>
                            </Form.Group>
                        </Row>

                        <Address {...clinica}/>
                        <Contacts {...clinica}/>

                        <div className="d-flex justify-content-between">
                            <Link to="/painel" className="btn btn-outline-secondary">Voltar</Link>
                            <Button type="submit" variant="outline-success">Finalizar</Button>
                        </div>
                    </Form>
                </main>
            </Container>
        </Layouts.RestrictedLayout>
    );
}

function validateForm(formData: FormData): Contracts.DynamicObject<string> {
    let validationErrors: Contracts.DynamicObject<string> = {};

    if (!Helpers.SpecialValidation.cnpj(formData.get("cnpj")?.toString() ?? ""))
        validationErrors["cnpj"] = "Insira um CNPJ válido";

    return validationErrors;
}