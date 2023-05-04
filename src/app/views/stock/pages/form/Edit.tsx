import React, {useEffect, useState} from "react";
import {Container} from "react-bootstrap";
import {Navigate, useParams} from "react-router-dom";
import axios from "axios";

import Components from "../../../../components/Components";
import Contracts from "../../../../contracts/Contracts";
import Layouts from "../../../../layouts/Layouts";
import Memory from "../../../../Memory";
import DefaultForm from "./components/DefaultForm";

interface PathVariables extends Contracts.PathVariables {
    medicationId: string
}

export default function Edit(): JSX.Element {
    const [validationErrors, setValidationErrors] = useState<Contracts.DynamicObject<string>>({});
    const [dataStatus, setDataStatus] = useState<Contracts.FormStatus>("idle");
    const [navigateToListing, setNavigateToListing] = useState<boolean>(false);
    const [data, setData] = useState<Contracts.Estoque>();
    const {id, medicationId} = useParams<PathVariables>();

    useEffect(() => {
        axios.get<Contracts.Estoque>(`${process.env.REACT_APP_API_URL}/medicamento/${medicationId}/estoque/${id}`, {headers: Memory.headers})
            .then(({data}) => setData(data))
            .catch(() => setNavigateToListing(true));
    }, []);

    const onSubmit = async (formData: FormData) => {
        await axios.put(`${process.env.REACT_APP_API_URL}/medicamento/${medicationId}/estoque/${id}`, formData, {headers: Memory.headers});

        setDataStatus("updated");
        setTimeout(() => setNavigateToListing(true), 2000);
    }

    if (navigateToListing)
        return <Navigate to={`/painel/medicamentos/${medicationId}`}/>;

    if (!data)
        return <Components.LoadingScreen/>;

    return (
        <Layouts.RestrictedLayout>
            <main className="pt-5">
                <h1>Atualizar estoque do medicamento</h1>

                <Container>
                    <Components.FormSubmit
                        onSubmit={onSubmit}
                        setDataStatus={setDataStatus}
                        setValidationErrors={setValidationErrors}
                        dataStatus={dataStatus}
                        validationErrors={validationErrors}
                    >
                        <DefaultForm data={data}/>
                    </Components.FormSubmit>
                </Container>
            </main>
        </Layouts.RestrictedLayout>
    );
}