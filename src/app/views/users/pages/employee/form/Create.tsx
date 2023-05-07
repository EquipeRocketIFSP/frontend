import React, {useState} from "react";
import {Container} from "react-bootstrap";
import {Navigate} from "react-router-dom";
import axios from "axios";
import Layouts from "../../../../../layouts/Layouts";
import Components from "../../../../../components/Components";
import Storages from "../../../../../Storages";
import Contracts from "../../../../../contracts/Contracts";
import Memory from "../../../../../Memory";
import DefaultForm from "./components/DefaultForm";

export default function Create(): JSX.Element {
    const [navigateToListing, setNavigateToListing] = useState<boolean>(false);
    const [validationErrors, setValidationErrors] = useState<Contracts.DynamicObject<string>>({});
    const [dataStatus, setDataStatus] = useState<Contracts.FormStatus>("idle");
    const [isVeterinario, setVeterinario] = useState<boolean>(false);

    const userData = Storages.userStorage.get();

    const onSubmit = async (formData: FormData) => {
        if (!userData)
            return;

        const url = `${process.env.REACT_APP_API_URL}/${isVeterinario ? 'veterinario' : 'funcionario'}`;

        await axios.post(url, formData, {headers: Memory.headers});

        setDataStatus("created");
        setTimeout(() => setNavigateToListing(true), 2000);
    }

    if (navigateToListing)
        return <Navigate to={`/painel/funcionarios`}/>;

    return (
        <Layouts.RestrictedLayout>
            <main>
                <h1>Cadastro de funcionário</h1>

                <Container>
                    <Components.FormSubmit
                        onSubmit={onSubmit}
                        setDataStatus={setDataStatus}
                        setValidationErrors={setValidationErrors}
                        dataStatus={dataStatus}
                        validationErrors={validationErrors}
                    >
                        <DefaultForm setVeterinario={setVeterinario}/>
                    </Components.FormSubmit>
                </Container>
            </main>
        </Layouts.RestrictedLayout>
    );
}