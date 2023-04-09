import React, {useContext, useState} from "react";
import {Button, Form, Row, Spinner} from "react-bootstrap";
import {Link} from "react-router-dom";
import Helpers from "../../../helpers/Helpers";
import Address from "../../../components/address/Address";
import Components from "../../../components/Components";

export default function FormOwner() {
    const [showCRMVField, setShowCRMVField] = useState<boolean>(false);

    const {sendingForm, validationErrors} = useContext(Components.FormSubmitContext);

    return (
        <>
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

                    <Form.Text style={{color: "red"}}>{validationErrors["dono_senha"] ?? ""}</Form.Text>
                </Form.Group>

                <Form.Group className="mb-3 col-lg-6">
                    <Form.Label htmlFor="confirme_senha">Confirme sua senha*</Form.Label>
                    <Form.Control type="password" name="confirme_senha" maxLength={255} id="confirme_senha"
                                  required/>

                    <Form.Text style={{color: "red"}}>{validationErrors["confirme_senha"] ?? ""}</Form.Text>
                </Form.Group>
            </Row>

            {
                sendingForm ?
                    (
                        <div className="d-flex justify-content-between">
                            <Button variant="outline-secondary" disabled>Voltar</Button>
                            <Button variant="outline-success" disabled>
                                <Spinner animation="grow" size="sm"/>
                            </Button>
                        </div>
                    ) :
                    (
                        <div className="d-flex justify-content-between">
                            <Link to="/cadastro" className="btn btn-outline-secondary">Voltar</Link>
                            <Button type="submit" variant="outline-success">Finalizar</Button>
                        </div>
                    )
            }
        </>
    );
}