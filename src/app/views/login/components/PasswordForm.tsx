import Contracts from "../../../contracts/Contracts";
import React, {useState} from "react";
import axios, {AxiosError, HttpStatusCode, AxiosHeaders} from "axios";
import {Alert, Button, Form, Row, Spinner} from "react-bootstrap";
import {Navigate} from "react-router-dom";
import Storages from "../../../Storages";

interface Props {
    email: string,
    clinica: Contracts.ClinicaFromDataLogin
}

export default function PasswordForm(props: Props): JSX.Element {
    const {email, clinica} = props;

    const [loading, setLoading] = useState<boolean>(false);
    const [loadingForgotPassword, setLoadingForgotPassword] = useState<boolean>(false);
    const [forgotPassword, setForgotPassword] = useState<boolean>(false);
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

    const onClickForgotPassword = async () => {
        setLoadingForgotPassword(true);

        const headers = new AxiosHeaders();
        headers.setContentType("application/json");

        const formData = new FormData();
        formData.set("email", email);
        formData.set("clinica", clinica.id.toString());

        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/esqueci-minha-senha`, formData, {headers});

            setApiConnectionError(null);
            setForgotPassword(true);
        } catch (e) {
            setApiConnectionError("Não foi possivel solicitar a redefinição de senha. Por favor tente mais tarde.");
        }

        setLoadingForgotPassword(false);
    }

    if (navigateToPainel)
        return <Navigate to="/painel"/>;

    if (forgotPassword)
        return <Alert variant="info">Enviamos um link de recuperação para o seu e-mail</Alert>;

    if (loadingForgotPassword)
        return <Button variant="link" className="my-2"><Spinner animation="grow" size="sm"/></Button>;

    return (
        <Form className="col-lg-8" onSubmit={onSubmit}>
            {apiConnectionError ? <Alert variant="danger">{apiConnectionError}</Alert> : <></>}

            <Form.Group>
                <Form.Control type="password" name="senha" placeholder="Senha" required/>
            </Form.Group>

            <Row className="d-flex flex-column align-items-center">
                <Button variant="link" className="my-2" onClick={onClickForgotPassword}>Esqueci minha senha</Button>

                {
                    loading ?
                        <Button variant="success" className="rounded w-50 disabled">
                            <Spinner animation="grow" size="sm"/>
                        </Button> :
                        <Button variant="success" className="rounded w-50" type="submit">Entrar</Button>
                }
            </Row>
        </Form>
    );
}