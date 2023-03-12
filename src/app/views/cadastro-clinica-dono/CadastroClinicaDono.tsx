import React, {useState} from "react";
import {Alert, Button, Container, Form, Row} from "react-bootstrap";
import {Link, Navigate} from "react-router-dom";
import axios, {AxiosError} from "axios";

import Contracts from "../../contracts/Contracts";
import Storages from "../../Storages";
import Layouts from "../../layouts/Layouts";
import Helpers from "../../helpers/Helpers";
import Address from "../../components/address/Address";

export default function CadastroClinicaDono(): JSX.Element {
    const [apiConnectionError, setApiConnectionError] = useState<string | null>(null);
    const [navigateToLogin, setNavigateToLogin] = useState<boolean>(false);
    const [passwordMatched, setPasswordMatched] = useState<boolean>(true);
    const [showCRMVField, setShowCRMVField] = useState<boolean>(false);
    const [signInSuccessful, setSignInSuccessful] = useState<boolean>(false);
    const [validationErrors, setValidationErrors] = useState<Contracts.DynamicObject<string>>({});

    if (!Storages.signInStorage.get())
        return <Navigate to="/cadastro"/>;

    const onSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();

        const clinicaStoredData = Storages.signInStorage.get();

        if (!clinicaStoredData) {
            setApiConnectionError("Não foi possivel concluir o cadastro. Por favor tente mais tarde.");
            return;
        }

        let data: Contracts.DynamicObject<any> = {};

        setClinicaFields(data, clinicaStoredData);

        const formData = new FormData(evt.currentTarget);

        if (formData.get("dono_senha") !== formData.get("confirme_senha")) {
            setPasswordMatched(false);
            return;
        }

        setPasswordMatched(true);
        setDonoFields(data, formData);

        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/clinica`, data);

            setSignInSuccessful(true);

            setTimeout(() => setNavigateToLogin(true), 2500);
        } catch (e) {
            const response = (e as AxiosError).response;

            switch (response?.status) {
                case 400:
                    setValidationErrors(response?.data as Contracts.DynamicObject<string> ?? {});
                    break;

                case 409:
                    setApiConnectionError("Já existe uma clínica com esse CNPJ cadastrada");
                    break;

                default:
                    setApiConnectionError("Não foi possivel concluir o cadastro. Por favor tente mais tarde.");
                    break;
            }
        }
    }

    if (navigateToLogin) {
        Storages.signInStorage.truncate();

        return <Navigate to="/login"/>;
    }

    if (signInSuccessful) {
        return (
            <Layouts.Layout>
                <Container>
                    <Alert variant="success">Cadastro concluído com sucesso</Alert>
                </Container>
            </Layouts.Layout>
        );
    }

    return (
        <Layouts.Layout>
            <main id="sign-in" className="p-5">
                <h1>Cadastrar Dono</h1>

                <Container>
                    <Form onSubmit={onSubmit}>

                        {
                            apiConnectionError ?
                                <Alert variant="danger">{apiConnectionError}</Alert> : <></>
                        }

                        <Row className="rounded shadow mb-3 pt-3">
                            <Form.Group className="mb-3 col-lg-12">
                                <Form.Label htmlFor="dono_nome">Nome*</Form.Label>
                                <Form.Control name="dono_nome" maxLength={255} id="dono_nome" required/>
                                <Form.Text style={{color: "red"}}>{validationErrors["dono_nome"] ?? ""}</Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-6">
                                <Form.Label htmlFor="dono_cpf">CPF*</Form.Label>
                                <Form.Control name="dono_cpf" maxLength={255} id="dono_cpf" onInput={Helpers.Masks.cpf}
                                              required/>
                                <Form.Text style={{color: "red"}}>{validationErrors["dono_cpf"] ?? ""}</Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-6">
                                <Form.Label htmlFor="dono_rg">RG*</Form.Label>
                                <Form.Control name="dono_rg" maxLength={255} id="dono_rg" required/>
                                <Form.Text style={{color: "red"}}>{validationErrors["dono_rg"] ?? ""}</Form.Text>
                            </Form.Group>

                        </Row>

                        <Address/>

                        <Row className="rounded shadow mb-3 pt-3">
                            <Form.Group className="mb-3 col-lg-6">
                                <Form.Label htmlFor="dono_celular">Celular*</Form.Label>
                                <Form.Control name="dono_celular" maxLength={15} id="dono_celular"
                                              onInput={Helpers.Masks.celphone} required/>
                                <Form.Text style={{color: "red"}}>{validationErrors["dono_celular"] ?? ""}</Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-6">
                                <Form.Label htmlFor="dono_telefone">Telefone</Form.Label>
                                <Form.Control name="dono_telefone" maxLength={14} id="dono_telefone"
                                              onInput={Helpers.Masks.phone}/>
                                <Form.Text style={{color: "red"}}>{validationErrors["dono_telefone"] ?? ""}</Form.Text>
                            </Form.Group>
                        </Row>

                        <Row className="rounded shadow mb-3 pt-3">
                            <Form.Group className="mb-3 col-lg-6">
                                <Form.Label>É o Responsável Técnico?</Form.Label>
                                <Form.Check name="dono_responsavel_tecnico" type="checkbox" value="Sim"
                                            label="Sou o responsável técnico da minha clínica"
                                            onInput={() => setShowCRMVField(!showCRMVField)}/>
                            </Form.Group>

                            {
                                showCRMVField ?
                                    <Form.Group className="mb-3 col-lg-6">
                                        <Form.Label>CRMV*</Form.Label>
                                        <Form.Control name="dono_crmv" required/>
                                    </Form.Group> :
                                    <></>
                            }
                        </Row>

                        <Row className="rounded shadow mb-3 pt-3">
                            <Form.Group className="mb-3 col-lg-12">
                                <Form.Label htmlFor="dono_email">E-mail*</Form.Label>
                                <Form.Control name="dono_email" maxLength={255} id="dono_email" type="email"
                                              required/>
                                <Form.Text style={{color: "red"}}>{validationErrors["dono_email"] ?? ""}</Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-6">
                                <Form.Label htmlFor="dono_senha">Senha*</Form.Label>
                                <Form.Control type="password" name="dono_senha" maxLength={255} id="dono_senha"
                                              required/>
                                <Form.Text style={{color: "red"}}>{validationErrors["dono_nome"] ?? ""}</Form.Text>

                                {
                                    !passwordMatched ?
                                        <Form.Text style={{color: "red"}}>As senhas não coincidem</Form.Text> : <></>
                                }
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-6">
                                <Form.Label htmlFor="confirme_senha">Confirme sua senha*</Form.Label>
                                <Form.Control type="password" name="confirme_senha" maxLength={255} id="confirme_senha"
                                              required/>

                                {
                                    !passwordMatched ?
                                        <Form.Text style={{color: "red"}}>As senhas não coincidem</Form.Text> : <></>
                                }
                            </Form.Group>
                        </Row>

                        <div className="d-flex justify-content-between">
                            <Link to="/cadastro" className="btn btn-outline-secondary">Voltar</Link>
                            <Button type="submit" variant="outline-success">Finalizar</Button>
                        </div>
                    </Form>
                </Container>
            </main>
        </Layouts.Layout>
    );
}

function setClinicaFields(data: Contracts.DynamicObject<any>, clinicaStoredData: Contracts.Clinica): void {
    for (let key in clinicaStoredData)
        data["clinica_" + key] = (clinicaStoredData as Contracts.DynamicObject<any>)[key];
}

function setDonoFields(data: Contracts.DynamicObject<any>, formData: FormData): void {
    if (!formData.get("dono_telefone")?.toString().trim().length)
        formData.delete("dono_telefone");

    formData.forEach((value, key) => {
        key = !key.match("dono") ? "dono_" + key : key;
        data[key] = value.toString();
    });

    data["dono_responsavel_tecnico"] = data["dono_responsavel_tecnico"] === "Sim";
}