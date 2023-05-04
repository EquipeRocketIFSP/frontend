import React, {useEffect, useState} from "react";
import {Container} from "react-bootstrap";
import {Navigate, useParams} from "react-router-dom";
import axios from "axios";

import Medication from "../../Medication";
import Components from "../../../../components/Components";
import Contracts from "../../../../contracts/Contracts";
import Layouts from "../../../../layouts/Layouts";
import Memory from "../../../../Memory";

export default function Edit(): JSX.Element {
    const [validationErrors, setValidationErrors] = useState<Contracts.DynamicObject<string>>({});
    const [dataStatus, setDataStatus] = useState<Contracts.FormStatus>("idle");
    const [navigateToListing, setNavigateToListing] = useState<boolean>(false);
    const [data, setData] = useState<Contracts.Medicamento>();

    const {id} = useParams<Contracts.PathVariables>();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/medicamento/${id}`, {headers: Memory.headers})
            .then(({data}) => setData(data))
            .catch(() => setNavigateToListing(true));
    }, []);

    const onSubmit = async (formData: FormData) => {
        await axios.put(`${process.env.REACT_APP_API_URL}/medicamento/${id}`, formData, {headers: Memory.headers});

        setDataStatus("updated");
        setTimeout(() => setNavigateToListing(true), 2000);
    }

    if (navigateToListing)
        return <Navigate to="/painel/medicamentos"/>;

    if (!data)
        return <Components.LoadingScreen/>;

    return (
        <Layouts.RestrictedLayout>
            <main className="pt-5">
                <h1>Editar medicamento</h1>

                <Container>
                    <Components.FormSubmit
                        onSubmit={onSubmit}
                        setDataStatus={setDataStatus}
                        setValidationErrors={setValidationErrors}
                        dataStatus={dataStatus}
                        validationErrors={validationErrors}
                    >
                        <Medication.Form data={data}/>
                    </Components.FormSubmit>
                </Container>
            </main>
        </Layouts.RestrictedLayout>
    );
}