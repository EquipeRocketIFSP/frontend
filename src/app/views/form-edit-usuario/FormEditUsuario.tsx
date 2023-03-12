import {Link} from "react-router-dom";
import React, {useState} from "react";
import {Alert, Button, Container, Form, Row} from "react-bootstrap";

import Layouts from "../../layouts/Layouts";
import Helpers from "../../helpers/Helpers";
import Address from "../../components/address/Address";
import Contracts from "../../contracts/Contracts";
import Memory from "../../Memory";

export default function FormEditUsuario(): JSX.Element {
    const [apiConnectionError, setApiConnectionError] = useState<string | null>(null);
    const [validationErrors, setValidationErrors] = useState<Contracts.DynamicObject<string>>({});
    const [passwordMatched, setPasswordMatched] = useState<boolean>(true);

    return (
        <Layouts.RestrictedLayout>
            <Container>
                <main id="form-edit-usuario" className="py-3">
                    <h1>Dados do usuário</h1>

                    <Form>
                        {
                            apiConnectionError ?
                                <Alert variant="danger">{apiConnectionError}</Alert> : <></>
                        }

                        <Row className="rounded shadow mb-3 pt-3">
                            <Form.Group className="mb-3 col-lg-12">
                                <Form.Label htmlFor="nome">Nome*</Form.Label>
                                <Form.Control name="nome" maxLength={255} id="nome" required/>
                                <Form.Text style={{color: "red"}}>{validationErrors["nome"] ?? ""}</Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-6">
                                <Form.Label htmlFor="cpf">CPF*</Form.Label>
                                <Form.Control name="cpf" maxLength={255} id="cpf" onInput={Helpers.Masks.cpf}
                                              required/>
                                <Form.Text style={{color: "red"}}>{validationErrors["cpf"] ?? ""}</Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-6">
                                <Form.Label htmlFor="rg">RG*</Form.Label>
                                <Form.Control name="rg" maxLength={255} id="rg" required/>
                                <Form.Text style={{color: "red"}}>{validationErrors["rg"] ?? ""}</Form.Text>
                            </Form.Group>
                        </Row>

                        <Address/>

                        <Row className="rounded shadow mb-3 pt-3">
                            <Form.Group className="mb-3 col-lg-6">
                                <Form.Label htmlFor="celular">Celular*</Form.Label>
                                <Form.Control name="celular" maxLength={15} id="celular"
                                              onInput={Helpers.Masks.celphone} required/>
                                <Form.Text style={{color: "red"}}>{validationErrors["celular"] ?? ""}</Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-6">
                                <Form.Label htmlFor="telefone">Telefone</Form.Label>
                                <Form.Control name="telefone" maxLength={14} id="telefone"
                                              onInput={Helpers.Masks.phone}/>
                                <Form.Text style={{color: "red"}}>{validationErrors["telefone"] ?? ""}</Form.Text>
                            </Form.Group>
                        </Row>

                        {
                            Memory.authorites.find((authority) => authority === "VETERINARIO") ?
                                <Row className="rounded shadow mb-3 pt-3">
                                    <Form.Group className="mb-3 col-lg-12">
                                        <Form.Label>CRMV*</Form.Label>
                                        <Form.Control name="crmv" required/>
                                    </Form.Group>
                                </Row> : <></>
                        }

                        <Row className="rounded shadow mb-3 pt-3">
                            <Form.Group className="mb-3 col-lg-12">
                                <Form.Label htmlFor="email">E-mail*</Form.Label>
                                <Form.Control name="email" maxLength={255} id="email" type="email"
                                              required/>
                                <Form.Text style={{color: "red"}}>{validationErrors["email"] ?? ""}</Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-6">
                                <Form.Label htmlFor="senha">Senha*</Form.Label>
                                <Form.Control type="password" name="senha" maxLength={255} id="senha"
                                              required/>
                                <Form.Text style={{color: "red"}}>{validationErrors["nome"] ?? ""}</Form.Text>

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
                            <Link to="/painel" className="btn btn-outline-secondary">Voltar</Link>
                            <Button type="submit" variant="outline-success">Finalizar</Button>
                        </div>
                    </Form>
                </main>
            </Container>
        </Layouts.RestrictedLayout>
    );
}