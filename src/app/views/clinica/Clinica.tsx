import React, {useEffect, useState} from "react";
import {Alert, Button, Container, Form, Row, Spinner} from "react-bootstrap";
import {Link} from "react-router-dom";
import CEP from "../../components/cep/CEP";
import UF from "../../components/uf/UF";
import Contracts from "../../contracts/Contracts";
import Helpers from "../../helpers/Helpers";
import Layouts from "../../layouts/Layouts";

import "./clinica.scss";
import axios, {AxiosError, AxiosHeaders, HttpStatusCode} from "axios";
import Storages from "../../Storages";

export default function Clinica(): JSX.Element {
    const [clinica, setClinica] = useState<Contracts.Clinica | null>(null);
    const [addressDetails, setAddressDetails] = useState<Contracts.ViaCEPAddress | null>(null);
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

                        <Row className="rounded shadow mb-3 pt-3">
                            <Form.Group className="mb-3 col-lg-2">
                                <CEP name="cep" defaultValue={clinica?.cep}
                                     setAddressDetails={setAddressDetails}/>
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-2">
                                <Form.Label htmlFor="numero">Número*</Form.Label>
                                <Form.Control name="numero" maxLength={6} id="numero"
                                              defaultValue={clinica?.numero}
                                              onInput={Helpers.Masks.number} required/>
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-4">
                                <Form.Label htmlFor="logradouro">Logradouro*</Form.Label>
                                <Form.Control name="logradouro" maxLength={255}
                                              defaultValue={addressDetails?.logradouro ?? clinica?.logradouro}
                                              id="logradouro"
                                              required/>
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-4">
                                <Form.Label htmlFor="bairro">Bairro*</Form.Label>
                                <Form.Control name="bairro" maxLength={255}
                                              defaultValue={addressDetails?.bairro ?? clinica?.bairro}
                                              id="bairro" required/>
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-6">
                                <Form.Label htmlFor="cidade">Cidade*</Form.Label>
                                <Form.Control name="cidade" maxLength={255}
                                              defaultValue={addressDetails?.localidade ?? clinica?.cidade}
                                              id="cidade" required/>
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-6">
                                <UF name="estado" defaultValue={addressDetails?.uf ?? clinica?.estado}/>
                            </Form.Group>
                        </Row>

                        <Row className="rounded shadow mb-3 pt-3">
                            <Form.Group className="mb-3 col-lg-4">
                                <Form.Label htmlFor="email">E-mail*</Form.Label>
                                <Form.Control name="email" maxLength={255} id="email"
                                              defaultValue={clinica?.email} type="email"
                                              required/>
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-4">
                                <Form.Label htmlFor="celular">Celular*</Form.Label>
                                <Form.Control name="celular" maxLength={15} id="celular"
                                              defaultValue={clinica?.celular}
                                              onInput={Helpers.Masks.celphone} required/>
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-4">
                                <Form.Label htmlFor="telefone">Telefone</Form.Label>
                                <Form.Control name="telefone" maxLength={14} id="telefone"
                                              defaultValue={clinica?.telefone ?? undefined}
                                              onInput={Helpers.Masks.phone}/>
                            </Form.Group>
                        </Row>

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