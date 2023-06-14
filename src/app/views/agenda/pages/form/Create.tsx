import React, {useState} from "react";
import {Container} from "react-bootstrap";
import {Navigate} from "react-router-dom";
import axios, {AxiosError, AxiosHeaders, HttpStatusCode} from "axios";
import Layouts from "../../../../layouts/Layouts";
import Components from "../../../../components/Components";
import Agenda from "../../Agenda";
import Memory from "../../../../Memory";
import Storages from "../../../../Storages";
import Contracts from "../../../../contracts/Contracts";

export default function Create(): JSX.Element {
    const [navigateToListing, setNavigateToListing] = useState<boolean>(false);
    const [validationErrors, setValidationErrors] = useState<Contracts.DynamicObject<string>>({});
    const [dataStatus, setDataStatus] = useState<Contracts.FormStatus>("idle");

    const userData = Storages.userStorage.get();

    const onSubmit = async (formData: FormData) => {
        if (!userData)
            return;

        const errors = Agenda.validateForm(formData);
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

        await axios.post(`${process.env.REACT_APP_API_URL}/agendamento`, formData, {headers: Memory.headers});

        setDataStatus("created");
        setTimeout(() => setNavigateToListing(true), 2000);
    }

    if (navigateToListing)
        return <Navigate to={`/painel/agenda`}/>;

    return (
        <Layouts.RestrictedLayout>
            <main>
                <h1>Dados do agendamento</h1>

                <Container>
                    <Components.FormSubmit
                        onSubmit={onSubmit}
                        setDataStatus={setDataStatus}
                        setValidationErrors={setValidationErrors}
                        dataStatus={dataStatus}
                        validationErrors={validationErrors}
                    >
                        <Agenda.Form/>
                    </Components.FormSubmit>
                </Container>
            </main>
        </Layouts.RestrictedLayout>
    );
}