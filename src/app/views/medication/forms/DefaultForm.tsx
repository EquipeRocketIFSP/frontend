import {Button, Form, Row, Spinner} from "react-bootstrap";
import React, {useContext} from "react";
import {Link} from "react-router-dom";
import Components from "../../../components/Components";
import Helpers from "../../../helpers/Helpers";

export default function DefaultForm(): JSX.Element {
    const {sendingForm, validationErrors} = useContext(Components.FormSubmitContext);

    return (
        <>
            <Row>
                <Form.Group className="mb-3 col-lg-12">
                    <Form.Label htmlFor="numero_registro">Número de registro</Form.Label>
                    <Form.Control name="numero_registro" id="numero_registro" maxLength={255}
                                  onInput={Helpers.Masks.number} required/>
                    <Form.Text className="text-danger">{validationErrors["numero_registro"] ?? ""}</Form.Text>
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
                            <Link to="/painel/medicamentos" className="btn btn-outline-secondary">Voltar</Link>
                            <Button type="submit" variant="outline-success">Finalizar</Button>
                        </div>
                    )
            }
        </>
    );
}