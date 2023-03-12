import {Form, Row} from "react-bootstrap";
import Helpers from "../../helpers/Helpers";
import React from "react";

interface Props {
    email?: string,
    celular?: string,
    telefone?: string
}

export default function Contacts(props: Props): JSX.Element {
    return (
        <Row className="rounded shadow mb-3 pt-3">
            <Form.Group className="mb-3 col-lg-4">
                <Form.Label htmlFor="email">E-mail*</Form.Label>
                <Form.Control name="email" maxLength={255} id="email"
                              defaultValue={props?.email} type="email"
                              required/>
            </Form.Group>

            <Form.Group className="mb-3 col-lg-4">
                <Form.Label htmlFor="celular">Celular*</Form.Label>
                <Form.Control name="celular" maxLength={15} id="celular"
                              defaultValue={props?.celular}
                              onInput={Helpers.Masks.celphone} required/>
            </Form.Group>

            <Form.Group className="mb-3 col-lg-4">
                <Form.Label htmlFor="telefone">Telefone</Form.Label>
                <Form.Control name="telefone" maxLength={14} id="telefone"
                              defaultValue={props?.telefone ?? undefined}
                              onInput={Helpers.Masks.phone}/>
            </Form.Group>
        </Row>
    );
}