import React from "react";
import {Form, Row} from "react-bootstrap";

import CNPJ from "../../components/cnpj/CNPJ";
import Address from "../../components/address/Address";
import Contacts from "../../components/contacts/Contacts";
import Contracts from "../../contracts/Contracts";

interface Props {
    data: Contracts.Clinica | null,
    validationErrors: Contracts.DynamicObject<string>
}

export default function Clinica(props: Props): JSX.Element {
    const {data, validationErrors} = props;

    return (
        <>
            <Row className="rounded shadow mb-3 pt-3">
                <Form.Group className="mb-3 col-lg-6">
                    <Form.Label htmlFor="nome_fantasia">Nome Fantasia*</Form.Label>
                    <Form.Control name="nome_fantasia" maxLength={255}
                                  defaultValue={data?.nome_fantasia}
                                  id="nome_fantasia"
                                  required/>
                </Form.Group>

                <Form.Group className="mb-3 col-lg-6">
                    <Form.Label htmlFor="razao_social">Razão Social*</Form.Label>
                    <Form.Control name="razao_social" maxLength={255}
                                  defaultValue={data?.razao_social} id="razao_social"
                                  required/>
                </Form.Group>

                <Form.Group className="mb-3 col-lg-6">
                    <CNPJ validationErrors={validationErrors} cnpj={data?.cnpj}/>
                </Form.Group>

                <Form.Group className="mb-3 col-lg-6">
                    <Form.Label htmlFor="cnae">CNAE*</Form.Label>
                    <Form.Control name="cnae" maxLength={255}
                                  defaultValue={data?.cnae} id="cnae"
                                  required/>
                </Form.Group>
            </Row>

            <Address {...data}/>
            <Contacts {...data}/>
        </>
    );
}