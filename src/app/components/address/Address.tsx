import React, {useState} from "react";
import {Form, Row} from "react-bootstrap";

import Helpers from "../../helpers/Helpers";
import Contracts from "../../contracts/Contracts";

import CEP from "../cep/CEP";
import UF from "../uf/UF";

interface Props {
    cep?: string,
    logradouro?: string,
    bairro?: string,
    cidade?: string,
    estado?: string,
    numero?: string
}

export default function Address(props: Props): JSX.Element {
    const [addressDetails, setAddressDetails] = useState<Contracts.ViaCEPAddress | null>(null);

    return (
        <Row className="rounded shadow mb-3 pt-3">
            <Form.Group className="mb-3 col-lg-2">
                <CEP name="cep" defaultValue={props?.cep}
                     setAddressDetails={setAddressDetails}/>
            </Form.Group>

            <Form.Group className="mb-3 col-lg-2">
                <Form.Label htmlFor="numero">Número*</Form.Label>
                <Form.Control name="numero" maxLength={6} id="numero"
                              defaultValue={props?.numero}
                              onInput={Helpers.Masks.number} required/>
            </Form.Group>

            <Form.Group className="mb-3 col-lg-4">
                <Form.Label htmlFor="logradouro">Logradouro*</Form.Label>
                <Form.Control name="logradouro" maxLength={255}
                              defaultValue={addressDetails?.logradouro ?? props?.logradouro}
                              id="logradouro"
                              required/>
            </Form.Group>

            <Form.Group className="mb-3 col-lg-4">
                <Form.Label htmlFor="bairro">Bairro*</Form.Label>
                <Form.Control name="bairro" maxLength={255}
                              defaultValue={addressDetails?.bairro ?? props?.bairro}
                              id="bairro" required/>
            </Form.Group>

            <Form.Group className="mb-3 col-lg-6">
                <Form.Label htmlFor="cidade">Cidade*</Form.Label>
                <Form.Control name="cidade" maxLength={255}
                              defaultValue={addressDetails?.localidade ?? props?.cidade}
                              id="cidade" required/>
            </Form.Group>

            <Form.Group className="mb-3 col-lg-6">
                <UF name="estado" defaultValue={addressDetails?.uf ?? props?.estado}/>
            </Form.Group>
        </Row>
    );
}