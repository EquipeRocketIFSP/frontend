import React, {useState} from "react";
import {Container} from "react-bootstrap";
import {Navigate} from "react-router-dom";
import axios from "axios";
import {AxiosError, AxiosHeaders, HttpStatusCode} from "axios";
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

        await axios.post(`${process.env.REACT_APP_API_URL}/agendamento`, formData, {headers: Memory.headers});

        setDataStatus("created");
        setTimeout(() => setNavigateToListing(true), 2000);
    }

    if (navigateToListing)
        return <Navigate to={`/painel/agenda`}/>;

    return (
        <Layouts.RestrictedLayout>
            <main id="form-animal">
                <h1>Dados do animal</h1>

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

function validateForm(formData: FormData): Contracts.DynamicObject<string> {
    const validationErrors: Contracts.DynamicObject<string> = {};

    if (!formData.get("tutor")?.toString().length)
        validationErrors["tutor"] = "Selecione um dos tutores do animal";

    if (!formData.get("animal")?.toString().length)
        validationErrors["animal"] = "Selecione o animal";

    if (!formData.get("veterinario")?.toString().length)
        validationErrors["veterinario"] = "Selecione o veterinário";

    return validationErrors;
}