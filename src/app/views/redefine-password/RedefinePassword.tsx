import React, {useState} from "react";
import {Alert, Button, Container, Form, Spinner} from "react-bootstrap";

import Contracts from "../../contracts/Contracts";

//@ts-ignore
import logoLogin from "./../../resources/login-logo.png";

import "./redefine-password.scss";
import axios, {AxiosError, AxiosHeaders, HttpStatusCode} from "axios";
import {Navigate, useSearchParams} from "react-router-dom";

export default function RedefinePassword(): JSX.Element {
    const [validationErrors, setValidationErrors] = useState<Contracts.DynamicObject<string>>({});
    const [apiConnectionError, setApiConnectionError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [successifulReset, setSuccessifulReset] = useState<boolean>(false);
    const [redirectToLogin, setRedirectToLogin] = useState<boolean>(false);
    const [queryParams] = useSearchParams();

    const token = queryParams.get("t");

    if (!token)
        return <Navigate to="/login"/>;

    const onSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();

        const formData = new FormData(evt.currentTarget);
        const errors = validateForm(formData);

        if (Object.keys(errors).length) {
            setValidationErrors(errors);
            return;
        }

        const headers = new AxiosHeaders();
        headers.setContentType("application/json");

        setLoading(true);

        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/redefinir-senha`, formData, {headers});

            setApiConnectionError(null);
            setSuccessifulReset(true);

            setTimeout(() => setRedirectToLogin(true), 2000);
        } catch (e) {
            const response = (e as AxiosError).response;

            switch (response?.status) {
                case HttpStatusCode.NotFound:
                    setApiConnectionError(response?.data as string);
                    break;
                default:
                    setApiConnectionError("Não foi possivel concluir essa operação. Por favor tente mais tarde.");
                    break;
            }
        }

        setLoading(false);
    }

    if (redirectToLogin)
        return <Navigate to="/login"/>;

    return (
        <main id="redefine-password">
            <Container className="d-flex align-items-center flex-column">
                <div className="col-lg-6 d-flex align-items-center flex-column">
                    <img src={logoLogin} style={{width: "100%"}} alt="Logo"/>

                    <Form onSubmit={onSubmit}>

                        {apiConnectionError ? <Alert variant="danger">{apiConnectionError}</Alert> : <></>}
                        {successifulReset ? <Alert variant="success">Senha alterada com sucesso</Alert> : <></>}

                        <Form.Group className="mb-3">
                            <Form.Control placeholder="Nova Senha" name="senha" type="password" required/>
                            <Form.Text style={{color: "red"}}>{validationErrors["senha"] ?? ""}</Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Control placeholder="Repetir nova senha" name="senha_repetir" type="password"
                                          required/>
                            <Form.Text style={{color: "red"}}>{validationErrors["senha_repetir"] ?? ""}</Form.Text>
                        </Form.Group>

                        {
                            loading ?
                                <Button variant="success" className="w-100 rounded disabled">
                                    <Spinner animation="grow" size="sm"/>
                                </Button> :
                                <Button variant="success" className="w-100 rounded " type="submit">
                                    Redefinir Senha
                                </Button>
                        }

                        <input type="hidden" value={token} name="token"/>
                    </Form>
                </div>
            </Container>
        </main>
    );
}

function validateForm(formData: FormData): Contracts.DynamicObject<string> {
    const validationErrors: Contracts.DynamicObject<string> = {};

    if (formData.get("senha") !== formData.get("senha_repetir")) {
        validationErrors["senha"] = "As senhas não coincidem";
        validationErrors["senha_repetir"] = "As senhas não coincidem";
    }

    return validationErrors;
}