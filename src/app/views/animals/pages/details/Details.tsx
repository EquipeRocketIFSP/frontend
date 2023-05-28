import React, {useEffect, useState} from "react";
import {Link, Navigate, useParams} from "react-router-dom";
import axios, {AxiosHeaders} from "axios";
import {Container, Row} from "react-bootstrap";

import Layouts from "../../../../layouts/Layouts";
import Contracts from "../../../../contracts/Contracts";
import Storages from "../../../../Storages";
import Components from "../../../../components/Components";
import MedicalRecord from "../../../medical-record/MedicalRecord";

interface PathVariables extends Contracts.PathVariables {
    tutorId?: string
}

export default function Details(): JSX.Element {
    const [animal, setAnimal] = useState<Contracts.Animal | null>(null);
    const [notFound, setNotFound] = useState<boolean>(false);

    const userData = Storages.userStorage.get();
    const urlParams = useParams<PathVariables>();

    const headers = new AxiosHeaders()
        .setContentType("application/json")
        .setAuthorization(`${userData?.type} ${userData?.token}`);

    useEffect(() => {
        if (!urlParams.id || !userData)
            return;

        axios.get(`${process.env.REACT_APP_API_URL}/tutor/${urlParams.tutorId}/animal/${urlParams.id}`, {headers})
            .then(({data}) => setAnimal(data))
            .catch(() => setNotFound(true));
    }, []);

    if (notFound)
        return <Navigate to="/not-found"/>;

    if (!animal)
        return <Components.LoadingScreen/>;

    const age = new Date().getFullYear() - animal.ano_nascimento;

    return (
        <Layouts.RestrictedLayout>
            <main id="animal">

                <Container>
                    <Components.Breadcrumbs>
                        <li className="breadcrumb-item"><Link to="/painel">Painel</Link></li>
                        <li className="breadcrumb-item"><Link to="/painel/tutores">Tutores</Link></li>
                        <li className="breadcrumb-item"><Link to={"/painel/tutores/" + urlParams.tutorId}>Animais do
                            tutor</Link></li>
                        <li className="breadcrumb-item active">Detalhes do Animal</li>
                    </Components.Breadcrumbs>

                    <Row className="summary mb-5 p-2">
                        <span><b>Nome: </b>{animal.nome}</span>
                        <span><b>Sexo: </b>{animal.sexo === "MACHO" ? "Macho" : "Fêmea"}</span>
                        <span><b>Idade: </b>{age} {age > 1 ? "anos" : "ano"}</span>
                        <span><b>Peso: </b>{animal.peso} kg</span>
                        <span><b>Espécie: </b>{animal.especie}</span>
                        <span><b>Raça: </b>{animal.raca}</span>
                        <span><b>Pelagem: </b>{animal.pelagem}</span>

                        <div className="col-12">
                            <Link to="editar" className="btn btn-outline-primary btn-sm btn-edit">Editar</Link>
                        </div>
                    </Row>

                    <Components.SearchBar btnAdd={{
                        label: "Novo Atendimento",
                        href: `/painel/tutores/${urlParams.tutorId}/animais/${urlParams.id}/prontuario/cadastrar`
                    }}/>

                    <MedicalRecord.Listing/>
                </Container>
            </main>
        </Layouts.RestrictedLayout>
    );
}