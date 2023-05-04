import React, {useState} from "react";
import {Container} from "react-bootstrap";
import {Navigate} from "react-router-dom";
import axios from "axios";

import Medication from "../../Medication";
import Components from "../../../../components/Components";
import Contracts from "../../../../contracts/Contracts";
import Layouts from "../../../../layouts/Layouts";
import Memory from "../../../../Memory";

export default function Create(): JSX.Element {
    const [validationErrors, setValidationErrors] = useState<Contracts.DynamicObject<string>>({});
    const [dataStatus, setDataStatus] = useState<Contracts.FormStatus>("idle");
    const [navigateToListing, setNavigateToListing] = useState<boolean>(false);

    const onSubmit = async (formData: FormData) => {
        await axios.post(`${process.env.REACT_APP_API_URL}/medicamento`, formData, {headers: Memory.headers});

        setDataStatus("created");
        setTimeout(() => setNavigateToListing(true), 2000);
    }

    if (navigateToListing)
        return <Navigate to="/painel/medicamentos"/>;

    return (
        <Layouts.RestrictedLayout>
            <main className="pt-5">
                <h1>Adicionar um novo medicamento</h1>

                <Container>
                    <Components.FormSubmit
                        onSubmit={onSubmit}
                        setDataStatus={setDataStatus}
                        setValidationErrors={setValidationErrors}
                        dataStatus={dataStatus}
                        validationErrors={validationErrors}
                    >
                        <Medication.Form/>
                    </Components.FormSubmit>
                </Container>
            </main>
        </Layouts.RestrictedLayout>
    );
}