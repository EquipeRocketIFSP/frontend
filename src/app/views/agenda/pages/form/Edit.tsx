import React, {useEffect, useState} from "react";
import Contracts from "../../../../contracts/Contracts";
import Storages from "../../../../Storages";
import axios, {AxiosError, AxiosHeaders, HttpStatusCode} from "axios";
import Memory from "../../../../Memory";
import {Navigate, useParams} from "react-router-dom";
import Layouts from "../../../../layouts/Layouts";
import {Container} from "react-bootstrap";
import Components from "../../../../components/Components";
import Agenda from "../../Agenda";

export default function Edit(): JSX.Element {
    const urlParams = useParams<Contracts.PathVariables>();

    const [navigateToListing, setNavigateToListing] = useState<boolean>(false);
    const [validationErrors, setValidationErrors] = useState<Contracts.DynamicObject<string>>({});
    const [dataStatus, setDataStatus] = useState<Contracts.FormStatus>("idle");
    const [agendamento, setAgendamento] = useState<Contracts.AgendamentoComplete | null>(null);

    const userData = Storages.userStorage.get();

    useEffect(() => {
        if (!urlParams.id || !userData)
            return;

        axios.get<Contracts.AgendamentoComplete>(`${process.env.REACT_APP_API_URL}/agendamento/${urlParams.id}`, {headers: Memory.headers})
            .then(({data}) => setAgendamento(data))
            .catch(console.error);
    }, []);

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

        const {data} = await axios.put(`${process.env.REACT_APP_API_URL}/agendamento/${agendamento?.id}`, formData, {headers: Memory.headers});

        setAgendamento(data);
        setDataStatus("updated");
        setTimeout(() => setNavigateToListing(true), 1000);
    }

    if (!agendamento)
        return <Components.LoadingScreen/>;

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
                        <Agenda.Form agendamento={agendamento}/>
                    </Components.FormSubmit>
                </Container>
            </main>
        </Layouts.RestrictedLayout>
    );
}