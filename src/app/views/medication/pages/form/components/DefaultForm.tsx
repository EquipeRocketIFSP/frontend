import {Button, Form, Row, Spinner} from "react-bootstrap";
import React, {useContext} from "react";
import {Link} from "react-router-dom";
import Components from "../../../../../components/Components";
import Helpers from "../../../../../helpers/Helpers";

export default function DefaultForm(): JSX.Element {
    const {sendingForm, validationErrors} = useContext(Components.FormSubmitContext);

    return (
        <>
            <Row>
                <Form.Group className="mb-3 col-lg-3">
                    <Form.Label htmlFor="codigo_registro">Código de registro</Form.Label>
                    <Form.Control name="codigo_registro" id="codigo_registro" maxLength={255}
                                  onInput={Helpers.Masks.number} required/>
                    <Form.Text className="text-danger">{validationErrors["codigo_registro"] ?? ""}</Form.Text>
                </Form.Group>

                <Form.Group className="mb-3 col-lg-9">
                    <Form.Label htmlFor="nome">Nome</Form.Label>
                    <Form.Control name="nome" id="nome" maxLength={255} required/>
                    <Form.Text className="text-danger">{validationErrors["nome"] ?? ""}</Form.Text>
                </Form.Group>

                <Form.Group className="mb-3 col-lg-4">
                    <Form.Label htmlFor="principio_ativo">Principio Ativo</Form.Label>
                    <Form.Control name="principio_ativo" id="principio_ativo" maxLength={255} required/>
                    <Form.Text className="text-danger">{validationErrors["principio_ativo"] ?? ""}</Form.Text>
                </Form.Group>

                <Form.Group className="mb-3 col-lg-4">
                    <Form.Label htmlFor="via_uso">Via de Uso</Form.Label>
                    <Form.Control name="via_uso" id="via_uso" maxLength={255} required/>
                    <Form.Text className="text-danger">{validationErrors["via_uso"] ?? ""}</Form.Text>
                </Form.Group>

                <Form.Group className="mb-3 col-lg-4">
                    <Form.Label htmlFor="concentracao">Concentração</Form.Label>
                    <Form.Control name="concentracao" id="concentracao" maxLength={255} required/>
                    <Form.Text className="text-danger">{validationErrors["concentracao"] ?? ""}</Form.Text>
                </Form.Group>

                <Form.Group className="mb-3 col-lg-12">
                    <Form.Label htmlFor="fabricante">Fabricante</Form.Label>
                    <Form.Control name="fabricante" id="fabricante" maxLength={255} required/>
                    <Form.Text className="text-danger">{validationErrors["fabricante"] ?? ""}</Form.Text>
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