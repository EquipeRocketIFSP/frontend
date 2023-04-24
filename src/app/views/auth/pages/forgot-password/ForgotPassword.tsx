import React, {useState} from "react";
import {Alert, Button, Container, Form, Row, Spinner} from "react-bootstrap";
import axios, {AxiosHeaders} from "axios";

//@ts-ignore
import logoLogin from "../../../../resources/login-logo.png";

import "./forgot-password.scss";

export default function ForgotPassword(): JSX.Element {
    const [loading, setLoading] = useState<boolean>(false);
    const [forgotPassword, setForgotPassword] = useState<boolean>(false);
    const [apiConnectionError, setApiConnectionError] = useState<string | null>(null);

    const onSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();

        setLoading(true);

        const formData = new FormData(evt.currentTarget);
        const headers = new AxiosHeaders();
        headers.setContentType("application/json");

        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/esqueci-minha-senha`, formData, {headers});

            setApiConnectionError(null);
            setForgotPassword(true);
        } catch (e) {
            setApiConnectionError("Não foi possivel solicitar a redefinição de senha. Por favor tente mais tarde.");
        }

        setLoading(false);
    }

    return (
        <main id="forgot-password">
            <Container className="d-flex align-items-center flex-column">
                <div className="col-lg-6 d-flex align-items-center flex-column">
                    <img src={logoLogin} style={{width: "100%"}} alt="Logo"/>

                    <Form className="col-lg-8" onSubmit={onSubmit}>
                        {
                            forgotPassword ?
                                <Alert variant="info">Enviamos um link de recuperação para o seu e-mail</Alert> : <></>
                        }

                        {apiConnectionError ? <Alert variant="danger">{apiConnectionError}</Alert> : <></>}

                        <Form.Group className="mb-3">
                            <Form.Control type="text" name="clinica" placeholder="Código da Clínica" required/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Control type="email" name="email" placeholder="E-mail" required/>
                        </Form.Group>

                        <Row className="d-flex flex-column align-items-center mt-3">
                            {
                                loading ?
                                    <Button variant="success" className="rounded w-50 disabled">
                                        <Spinner animation="grow" size="sm"/>
                                    </Button> :
                                    <Button variant="success" className="rounded w-50" type="submit">Solicitar
                                        redefinição</Button>
                            }
                        </Row>
                    </Form>
                </div>
            </Container>
        </main>
    );
}