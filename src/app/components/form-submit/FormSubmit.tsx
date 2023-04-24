import {Alert, Form} from "react-bootstrap";
import React, {createContext, useState} from "react";
import Contracts from "../../contracts/Contracts";
import {AxiosError, HttpStatusCode} from "axios";

interface Props extends React.PropsWithChildren {
    onSubmit: (formData: FormData) => Promise<void>,
    setDataStatus: (status: Contracts.FormStatus) => void
    setValidationErrors: (errors: Contracts.DynamicObject<string>) => void,
    dataStatus: Contracts.FormStatus,
    validationErrors: Contracts.DynamicObject<string>,
    successMessageOnCreation?: string
}

interface Context {
    validationErrors: Contracts.DynamicObject<string>,
    sendingForm: boolean
}

export const FormSubmitContext = createContext<Context>({
    validationErrors: {},
    sendingForm: false
});

export default function FormSubmit(props: Props): JSX.Element {
    const {
        onSubmit,
        setDataStatus,
        setValidationErrors,
        children,
        validationErrors,
        dataStatus,
        successMessageOnCreation
    } = props;

    const [apiConnectionError, setApiConnectionError] = useState<string | null>(null);
    const [sendingForm, setSendingForm] = useState<boolean>(false);

    const formSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();

        setSendingForm(true);
        setDataStatus("idle");

        const formData = new FormData(evt.currentTarget);

        try {
            await onSubmit(formData);
        } catch (e) {
            const response = (e as AxiosError).response;

            switch (response?.status) {
                case HttpStatusCode.BadRequest:
                    setValidationErrors(response.data as Contracts.DynamicObject<string>);
                    break;

                case HttpStatusCode.Unauthorized:
                case HttpStatusCode.Conflict:
                    setApiConnectionError(response.data as string);
                    break;

                default:
                    setApiConnectionError("Não foi possivel concluir essa operação");
                    break;
            }
        }

        setSendingForm(false);
    }

    return (
        <Form onSubmit={formSubmit}>
            {dataStatus === "created" ?
                <Alert variant="success">{successMessageOnCreation ?? "Cadastro efetuado com sucesso"}</Alert> : <></>}
            {dataStatus === "updated" ?
                <Alert variant="success">Dados alterados com sucesso</Alert> : <></>}

            {apiConnectionError ? <Alert variant="danger">{apiConnectionError}</Alert> : <></>}

            <FormSubmitContext.Provider value={{validationErrors, sendingForm}}>
                {children}
            </FormSubmitContext.Provider>
        </Form>
    );
}