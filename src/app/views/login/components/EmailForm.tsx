import {Button, Form, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import React from "react";

interface Props {
    setFormData: (formData: FormData) => void
}

export default function EmailForm(props: Props): JSX.Element {
    const {setFormData} = props;

    const onSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();

        setFormData(new FormData(evt.currentTarget));
    }

    return (
        <Form className="col-lg-8" onSubmit={onSubmit}>
            <Form.Group className="mb-3">
                <Form.Control type="text" name="clinica" placeholder="Código da Clínica" required/>
            </Form.Group>

            <Form.Group>
                <Form.Control type="email" name="email" placeholder="E-mail" required/>
            </Form.Group>

            <Row className="d-flex flex-column align-items-center mt-3">
                <Button variant="primary" className="rounded w-50" type="submit">Avançar</Button>
                <span className="my-2" style={{textAlign: "center"}}>ou</span>
                <Link to="/cadastro" className="btn btn-outline-secondary rounded w-50">Cadastrar-se</Link>
            </Row>
        </Form>
    );
}