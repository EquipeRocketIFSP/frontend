import React, {useState} from "react";
import {Button, Container} from "react-bootstrap";

import EmailForm from "./components/EmailForm";
import PasswordForm from "./components/PasswordForm";

//@ts-ignore
import logoLogin from "./../../resources/login-logo.png";

import "./login.scss";

export default function Login(): JSX.Element {
    const [formData, setFormData] = useState<FormData | null>(null);

    return (
        <main id="login">
            <Container className="d-flex align-items-center flex-column">
                <div className="col-lg-6 d-flex align-items-center flex-column">
                    <img src={logoLogin} style={{width: "100%"}} alt="Logo"/>

                    {!formData ? <EmailForm setFormData={setFormData}/> : <></>}
                    {formData ? <PasswordForm formData={formData}/> : <></>}

                    {
                        formData ?
                            <Button variant="outline-danger" className="rounded w-25 mt-3"
                                    onClick={() => setFormData(null)}>
                                Cancelar
                            </Button> :
                            <></>
                    }
                </div>
            </Container>
        </main>
    );
}