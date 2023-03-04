import React from "react";
import Layouts from "../../layouts/Layouts";
import {Button, Container, Form, Row} from "react-bootstrap";
import Select from "react-select";
import {Link} from "react-router-dom";

export default function FormAnimal(): JSX.Element {
    const tutores = [
        {value: 'chocolate', label: 'Chocolate'},
        {value: 'strawberry', label: 'Strawberry'},
        {value: 'vanilla', label: 'Vanilla'}
    ];

    return (
        <Layouts.Layout>
            <main id="form-animal">
                <h1>Cadastrar animal</h1>

                <Container>
                    <Form>
                        <Row>
                            <Form.Group className="mb-3 col-lg-12">
                                <Form.Label>Nome*</Form.Label>
                                <Form.Control name="nome" required/>
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-12">
                                <Form.Label>Tutores*</Form.Label>
                                <Select options={tutores} closeMenuOnSelect={false} isMulti required/>
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-4">
                                <Form.Label>Sexo*</Form.Label>
                                <Form.Select name="sexo" required>
                                    <option value="">- Selecione</option>
                                    <option value="Macho">Macho</option>
                                    <option value="Femea">Femea</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-4">
                                <Form.Label>Idade*</Form.Label>
                                <Form.Control name="idade" type="number" required/>
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-4">
                                <Form.Label>Peso*</Form.Label>
                                <Form.Control name="peso" type="number" required/>
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-4">
                                <Form.Label>Especie*</Form.Label>
                                <Form.Control name="especie" required/>
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-4">
                                <Form.Label>Raça*</Form.Label>
                                <Form.Control name="raça" required/>
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-4">
                                <Form.Label>Pelagem*</Form.Label>
                                <Form.Control name="pelagem" required/>
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-12 d-flex justify-content-between">
                                <Link to="/painel/animais" className="btn btn-outline-secondary">Voltar</Link>
                                <Button type="submit" variant="outline-success" className="w-25">Finalizar</Button>
                            </Form.Group>
                        </Row>
                    </Form>
                </Container>
            </main>
        </Layouts.Layout>
    );
}