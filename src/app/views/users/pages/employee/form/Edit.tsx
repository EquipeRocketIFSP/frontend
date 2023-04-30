import React, {useEffect, useState} from "react";
import axios from "axios";
import {Navigate, useParams} from "react-router-dom";
import {Container} from "react-bootstrap";
import Contracts from "../../../../../contracts/Contracts";
import Memory from "../../../../../Memory";
import Components from "../../../../../components/Components";
import Layouts from "../../../../../layouts/Layouts";
import DefaultForm from "./components/DefaultForm";


export default function Edit(): JSX.Element {
    const urlParams = useParams<Contracts.PathVariables>();

    const [navigateToListing, setNavigateToListing] = useState<boolean>(false);
    const [validationErrors, setValidationErrors] = useState<Contracts.DynamicObject<string>>({});
    const [dataStatus, setDataStatus] = useState<Contracts.FormStatus>("idle");
    const [isVeterinario, setVeterinario] = useState<boolean>(false);
    const [usuario, setUsuario] = useState<Contracts.Funcionario>();

    useEffect(() => {
        if (!urlParams.id)
            return;

        axios.get<Contracts.Funcionario>(`${process.env.REACT_APP_API_URL}/funcionario/${urlParams.id}`, {headers: Memory.headers})
            .then(({data}) => setUsuario(data))
            .catch(() => setNavigateToListing(true));
    }, []);

    const onSubmit = async (formData: FormData) => {
        const url = `${process.env.REACT_APP_API_URL}/${isVeterinario ? 'veterinario' : 'funcionario'}/${urlParams.id}`;

        await axios.put(url, formData, {headers: Memory.headers});

        setDataStatus("updated");
        setTimeout(() => setNavigateToListing(true), 2000);
    }

    if (navigateToListing)
        return <Navigate to={`/painel/funcionarios`}/>;

    if (!usuario)
        return <Components.LoadingScreen/>;

    return (
        <Layouts.RestrictedLayout>
            <main>
                <h1>Atualizar dados do funcionário</h1>

                <Container>
                    <Components.FormSubmit
                        onSubmit={onSubmit}
                        setDataStatus={setDataStatus}
                        setValidationErrors={setValidationErrors}
                        dataStatus={dataStatus}
                        validationErrors={validationErrors}
                    >
                        <DefaultForm setVeterinario={setVeterinario} usuario={usuario}/>
                    </Components.FormSubmit>
                </Container>
            </main>
        </Layouts.RestrictedLayout>
    );
}