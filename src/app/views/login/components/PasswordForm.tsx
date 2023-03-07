import Contracts from "../../../contracts/Contracts";
import React, {useState} from "react";
import axios, {AxiosError, HttpStatusCode, AxiosHeaders} from "axios";
import {Alert, Button, Form, Row, Spinner} from "react-bootstrap";
import {Link, Navigate} from "react-router-dom";
import Storages from "../../../Storages";

interface Props {
    email: string,
    clinica: Contracts.ClinicaFromDataLogin
}

export default function PasswordForm(props: Props): JSX.Element {
    const {email, clinica} = props;

    const [loading, setLoading] = useState<boolean>(false);
    const [apiConnectionError, setApiConnectionError] = useState<string | null>(null);
    const [navigateToPainel, setNavigateToPainel] = useState<boolean>(false);

    const onSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();

        const headers = new AxiosHeaders();
        headers.setContentType("application/json");

        const formData = new FormData(evt.currentTarget);
        formData.set("email", email);
        formData.set("clinica", clinica.id.toString());

        setLoading(true);

        try {
            const {data} = await axios.post<Contracts.UserData>(`${process.env.REACT_APP_API_URL}/auth`, formData, {headers});

            Storages.userStorage.set(data);

            setNavigateToPainel(true);
        } catch (e) {
            const response = (e as AxiosError).response;

            switch (response?.status) {
                case HttpStatusCode.Forbidden:
                    setApiConnectionError("E-mail e/ou senha inválidos");
                    break;
                default:
                    setApiConnectionError("Não foi possivel efetuar o login no momento. Por favor tente mais tarde.");
                    break;
            }
        }

        setLoading(false);
    }

    if (navigateToPainel)
        return <Navigate to="/painel"/>;

    return (
        <Form className="col-lg-8" onSubmit={onSubmit}>
            {apiConnectionError ? <Alert variant="danger">{apiConnectionError}</Alert> : <></>}

            <Form.Group>
                <Form.Control type="password" name="senha" placeholder="Senha" required/>
            </Form.Group>

            <Row className="d-flex flex-column align-items-center">
                <Link to="" className="btn my-2">Esqueci minha senha</Link>

                {
                    loading ?
                        <Button variant="primary" className="rounded w-50 disabled">
                            <Spinner animation="grow" size="sm"/>
                        </Button> :
                        <Button variant="success" className="rounded w-50" type="submit">Entrar</Button>
                }
            </Row>
        </Form>
    );
}