import React, {useState} from "react";
import {Alert, Button, Container, Form, Row, Spinner} from "react-bootstrap";

//@ts-ignore
import logoLogin from "../../../../resources/login-logo.png";

import "./login.scss";
import {Link, Navigate} from "react-router-dom";
import axios, {AxiosError, AxiosHeaders, HttpStatusCode} from "axios";
import Contracts from "../../../../contracts/Contracts";
import Storages from "../../../../Storages";
import Memory from "../../../../Memory";

export default function Login(): JSX.Element {
    const [loading, setLoading] = useState<boolean>(false);
    const [apiConnectionError, setApiConnectionError] = useState<string | null>(null);
    const [navigateToPainel, setNavigateToPainel] = useState<boolean>(false);

    const onSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();

        const headers = new AxiosHeaders();
        headers.setContentType("application/json");

        const data = new FormData(evt.currentTarget);

        setLoading(true);

        try {
            const {data: userData} = await axios.post<Contracts.UserData>(`${process.env.REACT_APP_API_URL}/auth`, data, {headers});

            headers.setAuthorization(`${userData.type} ${userData.token}`);

            const {data: authorites} = await axios.get<string[]>(`${process.env.REACT_APP_API_URL}/usuario/autoridades`, {headers});

            Storages.userStorage.set(userData);
            Memory.authorites.push(...authorites);

            try {
                await axios.get(`${process.env.REACT_APP_API_URL}/clinica/responsavel-tecnico`, {headers});

                Memory.hasTechnicalResponsible = true;
            } catch (e) {
                Memory.hasTechnicalResponsible = false
            }

            setNavigateToPainel(true);
        } catch (e) {
            setApiConnectionError("E-mail, senha e/ou código da clínica inválidos");
        }

        setLoading(false);
    }

    if (navigateToPainel)
        return <Navigate to="/painel"/>;

    return (
        <main id="login">
            <Container className="d-flex align-items-center flex-column">
                <div className="col-lg-6 d-flex align-items-center flex-column">
                    <img src={logoLogin} style={{width: "100%"}} alt="Logo"/>

                    <Form className="col-lg-8" onSubmit={onSubmit}>
                        {apiConnectionError ? <Alert variant="danger">{apiConnectionError}</Alert> : <></>}

                        <Form.Group className="mb-3">
                            <Form.Control type="text" name="clinica" placeholder="Código da Clínica" required/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Control type="email" name="email" placeholder="E-mail" required/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Control type="password" name="senha" placeholder="Senha" required/>
                        </Form.Group>

                        <Row className="d-flex flex-column align-items-center mt-3">
                            <Link to="/login/redefinir" className="btn btn-link my-2">Esqueci minha senha</Link>

                            {
                                loading ?
                                    <Button variant="success" className="rounded w-50 disabled">
                                        <Spinner animation="grow" size="sm"/>
                                    </Button> :
                                    <Button variant="success" className="rounded w-50" type="submit">Entrar</Button>
                            }

                            <span className="my-2" style={{textAlign: "center"}}>ou</span>
                            <Link to="/cadastro" className="btn btn-outline-secondary rounded w-50">Cadastrar-se</Link>
                        </Row>
                    </Form>
                </div>
            </Container>
        </main>
    );
}