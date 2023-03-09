import React, {useState} from "react";
import {Button, Container} from "react-bootstrap";

import EmailForm from "./components/EmailForm";
import Contracts from "../../contracts/Contracts";
import ClinicasForm from "./components/ClinicasForm";
import PasswordForm from "./components/PasswordForm";

//@ts-ignore
import logoLogin from "./../../resources/login-logo.png";

import "./login.scss";

export default function Login(): JSX.Element {
    const [clinicas, setClinicas] = useState<Contracts.ClinicaFromDataLogin[]>([]);

    const [email, setEmail] = useState<string>("");
    const [clinica, setClinica] = useState<Contracts.ClinicaFromDataLogin | null>(null);

    const resetForm = () => {
        setEmail("");
        setClinica(null);
        setClinicas([]);
    }

    return (
        <main id="login">
            <Container className="d-flex align-items-center flex-column">
                <div className="col-lg-6 d-flex align-items-center flex-column">
                    <img src={logoLogin} style={{width: "100%"}} alt="Logo"/>

                    {!clinica && !clinicas.length ? <EmailForm setClinicas={setClinicas} setEmail={setEmail}/> : <></>}
                    {!clinica && clinicas.length ? <ClinicasForm clinicas={clinicas} setClinica={setClinica}/> : <></>}
                    {clinica ? <PasswordForm clinica={clinica} email={email}/> : <></>}

                    {
                        clinicas.length ?
                            <Button variant="outline-danger" className="rounded w-25 mt-3" onClick={resetForm}>
                                Cancelar
                            </Button> :
                            <></>
                    }
                </div>
            </Container>
        </main>
    );
}