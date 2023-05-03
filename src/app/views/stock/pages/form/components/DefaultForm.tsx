import {Button, Form, Row, Spinner} from "react-bootstrap";
import React, {useContext} from "react";
import {Link, useParams} from "react-router-dom";
import Components from "../../../../../components/Components";

interface PathVariables extends Record<string, string> {
    medicationId: string
}

export default function DefaultForm(): JSX.Element {
    const {sendingForm, validationErrors} = useContext(Components.FormSubmitContext);
    const {medicationId} = useParams<PathVariables>();

    return (
        <>
            <Row>
                <Form.Group className="mb-3 col-lg-6">
                    <Form.Label htmlFor="lote">Lote</Form.Label>
                    <Form.Control name="lote" id="lote" maxLength={255} required/>
                    <Form.Text className="text-danger">{validationErrors["lote"] ?? ""}</Form.Text>
                </Form.Group>

                <Form.Group className="mb-3 col-lg-6">
                    <Form.Label htmlFor="validade">Validade</Form.Label>
                    <Form.Control type="date" name="validade" id="validade" required/>
                    <Form.Text className="text-danger">{validationErrors["validade"] ?? ""}</Form.Text>
                </Form.Group>

                <Form.Group className="mb-3 col-lg-6">
                    <Form.Label htmlFor="quantidade">Quantidade</Form.Label>
                    <Form.Control type="number" step="0.01" name="quantidade" id="quantidade" maxLength={255} required/>
                    <Form.Text className="text-danger">{validationErrors["quantidade"] ?? ""}</Form.Text>
                </Form.Group>

                <Form.Group className="mb-3 col-lg-6">
                    <Form.Label htmlFor="medida">Medida</Form.Label>
                    <Form.Control name="medida" id="medida" maxLength={255} required/>
                    <Form.Text className="text-danger">{validationErrors["medida"] ?? ""}</Form.Text>
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
                            <Link to={`/painel/medicamentos/${medicationId}`}
                                  className="btn btn-outline-secondary">Voltar</Link>
                            <Button type="submit" variant="outline-success">Finalizar</Button>
                        </div>
                    )
            }
        </>
    );
}