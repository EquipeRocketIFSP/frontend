import React, {useState} from "react";
import Contracts from "../../contracts/Contracts";
import Storages from "../../Storages";
import {Link, Navigate} from "react-router-dom";
import Layouts from "../../layouts/Layouts";
import {Alert, Button, Container, Form, Row} from "react-bootstrap";
import Helpers from "../../helpers/Helpers";
import CEP from "../../components/cep/CEP";
import UF from "../../components/uf/UF";
import axios, {AxiosError} from "axios";

export default function CadastroClinicaDono(): JSX.Element {
    const [addressDetails, setAddressDetails] = useState<Contracts.ViaCEPAddress | null>(null);
    const [navigateToLogin, setNavigateToLogin] = useState<boolean>(false);
    const [passwordMatched, setPasswordMatched] = useState<boolean>(true);
    const [showCRMVField, setShowCRMVField] = useState<boolean>(false);
    const [apiConnectionError, setApiConnectionError] = useState<boolean>(false);
    const [validationErrors, setValidationErrors] = useState<Contracts.DynamicObject<string>>({});

    if (!Storages.signInStorage.get())
        return <Navigate to="/cadastro"/>;

    const onSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();

        let data: Contracts.DynamicObject<any> = Storages.signInStorage.get() ?? {};
        const formData = new FormData(evt.currentTarget);

        if (formData.get("dono_senha") !== formData.get("confirme_senha")) {
            setPasswordMatched(false);
            return;
        }

        setPasswordMatched(true);
        formData.forEach((value, key) => data[key] = value.toString());

        data["dono_responsavel_tecnico"] = data["dono_responsavel_tecnico"] === "Sim";

        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/clinica`, data);
            setNavigateToLogin(true);
        } catch (e) {
            const response = (e as AxiosError).response;

            switch (response?.status) {
                case 400:
                    setValidationErrors(response?.data as Contracts.DynamicObject<string> ?? {});
                    break;
                default:
                    setApiConnectionError(true);
                    break;
            }
        }
    }

    if (navigateToLogin)
        return <Navigate to="/login"/>

    return (
        <Layouts.Layout>
            <main id="sign-in">
                <h1>Cadastrar Dono</h1>

                <Container>
                    <Form onSubmit={onSubmit}>

                        {
                            apiConnectionError ?
                                <Alert variant="danger">
                                    Não foi possivel concluir o cadastro. Por favor tente mais tarde.
                                </Alert> :
                                <></>
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

                            <Form.Group className="mb-3 col-lg-2">
                                <CEP name="dono_cep" setAddressDetails={setAddressDetails}/>
                                <Form.Text style={{color: "red"}}>{validationErrors["dono_cep"] ?? ""}</Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-2">
                                <Form.Label htmlFor="dono_numero">Número*</Form.Label>
                                <Form.Control name="dono_numero" maxLength={6} id="dono_numero"
                                              onInput={Helpers.Masks.number} required/>
                                <Form.Text style={{color: "red"}}>{validationErrors["dono_numero"] ?? ""}</Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-4">
                                <Form.Label htmlFor="dono_logradouro">Logradouro*</Form.Label>
                                <Form.Control name="dono_logradouro" maxLength={255}
                                              defaultValue={addressDetails?.logradouro} id="dono_logradouro"
                                              required/>
                                <Form.Text
                                    style={{color: "red"}}>{validationErrors["dono_logradouro"] ?? ""}</Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-4">
                                <Form.Label htmlFor="dono_bairro">Bairro*</Form.Label>
                                <Form.Control name="dono_bairro" maxLength={255}
                                              defaultValue={addressDetails?.bairro} id="dono_bairro" required/>
                                <Form.Text style={{color: "red"}}>{validationErrors["dono_bairro"] ?? ""}</Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-6">
                                <Form.Label htmlFor="dono_cidade">Cidade*</Form.Label>
                                <Form.Control name="dono_cidade" maxLength={255}
                                              defaultValue={addressDetails?.localidade} id="dono_cidade" required/>
                                <Form.Text style={{color: "red"}}>{validationErrors["dono_cidade"] ?? ""}</Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-6">
                                <UF name="dono_estado" defaultValue={addressDetails?.uf}/>
                                <Form.Text style={{color: "red"}}>{validationErrors["dono_estado"] ?? ""}</Form.Text>
                            </Form.Group>

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