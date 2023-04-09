import React, {useState} from "react";
import {Alert, Container} from "react-bootstrap";
import {Navigate} from "react-router-dom";
import axios, {AxiosError, AxiosHeaders, HttpStatusCode} from "axios";

import Contracts from "../../../contracts/Contracts";
import Storages from "../../../Storages";
import Layouts from "../../../layouts/Layouts";
import Components from "../../../components/Components";
import SignIn from "../SignIn";

export default function CreateClinicaOwner(): JSX.Element {
    const [navigateToLogin, setNavigateToLogin] = useState<boolean>(false);
    const [signInSuccessful, setSignInSuccessful] = useState<boolean>(false);
    const [validationErrors, setValidationErrors] = useState<Contracts.DynamicObject<string>>({});
    const [dataStatus, setDataStatus] = useState<Contracts.FormStatus>("idle");

    if (!Storages.signInStorage.get())
        return <Navigate to="/cadastro"/>;

    const onSubmit = async (formData: FormData) => {
        const clinicaStoredData = Storages.signInStorage.get();

        if (!clinicaStoredData) {
            throw new AxiosError(undefined, undefined, undefined, undefined, {
                data: "Não foi possivel concluir o cadastro. Por favor tente mais tarde.",
                status: HttpStatusCode.InternalServerError,
                headers: {},
                statusText: "BAD_REQUEST",
                request: undefined,
                config: {headers: new AxiosHeaders()}
            });
        }

        let data: Contracts.DynamicObject<any> = {};

        setClinicaFields(data, clinicaStoredData);
        setDonoFields(data, formData);

        const errors = validateForm(formData);
        setValidationErrors(errors);

        if (Object.keys(errors).length) {
            throw new AxiosError(undefined, undefined, undefined, undefined, {
                data: errors,
                status: HttpStatusCode.BadRequest,
                headers: {},
                statusText: "BAD_REQUEST",
                request: undefined,
                config: {headers: new AxiosHeaders()}
            });
        }

        await axios.post(`${process.env.REACT_APP_API_URL}/clinica`, data);

        setSignInSuccessful(true);
        setTimeout(() => setNavigateToLogin(true), 1000);
    }

    if (navigateToLogin) {
        Storages.signInStorage.truncate();

        return <Navigate to="/login"/>;
    }

    if (signInSuccessful) {
        return (
            <Layouts.Layout>
                <Container>
                    <Alert variant="success">Cadastro concluído com sucesso</Alert>
                </Container>
            </Layouts.Layout>
        );
    }

    return (
        <Layouts.Layout>
            <main id="sign-in" className="p-5">
                <h1>Cadastrar Dono</h1>

                <Container>
                    <Components.FormSubmit
                        onSubmit={onSubmit}
                        setDataStatus={setDataStatus}
                        setValidationErrors={setValidationErrors}
                        dataStatus={dataStatus}
                        validationErrors={validationErrors}
                    >
                        <SignIn.OwnerForm/>
                    </Components.FormSubmit>
                </Container>
            </main>
        </Layouts.Layout>
    );
}

function setClinicaFields(data: Contracts.DynamicObject<any>, clinicaStoredData: Contracts.Clinica): void {
    for (let key in clinicaStoredData)
        data["clinica_" + key] = (clinicaStoredData as Contracts.DynamicObject<any>)[key];
}

function setDonoFields(data: Contracts.DynamicObject<any>, formData: FormData): void {
    if (!formData.get("dono_telefone")?.toString().trim().length)
        formData.delete("dono_telefone");

    formData.forEach((value, key) => {
        key = !key.match("dono") ? "dono_" + key : key;
        data[key] = value.toString();
    });

    data["dono_responsavel_tecnico"] = data["dono_responsavel_tecnico"] === "Sim";
}

function validateForm(formData: FormData) {
    const errors: Contracts.DynamicObject<string> = {};

    if (formData.get("dono_senha") !== formData.get("confirme_senha")) {
        const msg = "As senhas não coincidem";

        errors["dono_senha"] = msg;
        errors["confirme_senha"] = msg;
    }

    return errors;
}