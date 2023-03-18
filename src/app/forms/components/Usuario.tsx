import {Alert, Form, Row} from "react-bootstrap";
import Helpers from "../../helpers/Helpers";
import Address from "../../components/address/Address";
import React from "react";
import Contracts from "../../contracts/Contracts";

interface Props {
    data: Contracts.Funcionario | null,
    validationErrors: Contracts.DynamicObject<string>,
    apiConnectionError: string | null
}

export default function Usuario(props: Props): JSX.Element {
    const {data, validationErrors, apiConnectionError} = props;

    return (
        <>
            {
                apiConnectionError ?
                    <Alert variant="danger">{apiConnectionError}</Alert> : <></>
            }

            <Row className="rounded shadow mb-3 pt-3">
                <Form.Group className="mb-3 col-lg-12">
                    <Form.Label htmlFor="nome">Nome*</Form.Label>
                    <Form.Control name="nome" defaultValue={data?.nome} maxLength={255} id="nome"
                                  required/>
                    <Form.Text style={{color: "red"}}>{validationErrors["nome"] ?? ""}</Form.Text>
                </Form.Group>

                <Form.Group className="mb-3 col-lg-6">
                    <Form.Label htmlFor="cpf">CPF*</Form.Label>
                    <Form.Control name="cpf" defaultValue={data?.cpf} maxLength={14} id="cpf"
                                  onInput={Helpers.Masks.cpf}
                                  required/>
                    <Form.Text style={{color: "red"}}>{validationErrors["cpf"] ?? ""}</Form.Text>
                </Form.Group>

                <Form.Group className="mb-3 col-lg-6">
                    <Form.Label htmlFor="rg">RG*</Form.Label>
                    <Form.Control name="rg" defaultValue={data?.rg} maxLength={255} id="rg" required/>
                    <Form.Text style={{color: "red"}}>{validationErrors["rg"] ?? ""}</Form.Text>
                </Form.Group>
            </Row>

            <Address {...data}/>

            <Row className="rounded shadow mb-3 pt-3">
                <Form.Group className="mb-3 col-lg-12">
                    <Form.Label htmlFor="email">E-mail*</Form.Label>
                    <Form.Control name="email" defaultValue={data?.email} maxLength={255} id="email"
                                  type="email"
                                  required/>
                    <Form.Text style={{color: "red"}}>{validationErrors["email"] ?? ""}</Form.Text>
                </Form.Group>

                <Form.Group className="mb-3 col-lg-6">
                    <Form.Label htmlFor="celular">Celular*</Form.Label>
                    <Form.Control name="celular" defaultValue={data?.celular} maxLength={15} id="celular"
                                  onInput={Helpers.Masks.celphone} required/>
                    <Form.Text style={{color: "red"}}>{validationErrors["celular"] ?? ""}</Form.Text>
                </Form.Group>

                <Form.Group className="mb-3 col-lg-6">
                    <Form.Label htmlFor="telefone">Telefone</Form.Label>
                    <Form.Control name="telefone" defaultValue={data?.telefone} maxLength={14}
                                  id="telefone"
                                  onInput={Helpers.Masks.phone}/>
                    <Form.Text style={{color: "red"}}>{validationErrors["telefone"] ?? ""}</Form.Text>
                </Form.Group>
            </Row>
        </>
    );
}