import Layouts from "../../../../layouts/Layouts";
import React, {useEffect, useState} from "react";
import Contracts from "../../../../contracts/Contracts";
import Storages from "../../../../Storages";
import {Link, Navigate, useParams} from "react-router-dom";
import axios from "axios";
import Components from "../../../../components/Components";
import Memory from "../../../../Memory";
import {Container, Row} from "react-bootstrap";

export default function Details(): JSX.Element {
    const [medication, setMedication] = useState<Contracts.Medicamento | null>(null);
    const [notFound, setNotFound] = useState<boolean>(false);

    const userData = Storages.userStorage.get();
    const urlParams = useParams<Contracts.PathVariables>();

    useEffect(() => {
        if (!urlParams.id || !userData)
            return;

        axios.get(`${process.env.REACT_APP_API_URL}/medicamento/${urlParams.id}`, {headers: Memory.headers})
            .then(({data}) => setMedication(data))
            .catch(() => setNotFound(true));
    }, []);

    if (notFound)
        return <Navigate to="/not-found"/>;

    if (!medication)
        return <Components.LoadingScreen/>;

    return (
        <Layouts.RestrictedLayout>
            <main id="medication">

                <Container>
                    <Components.Breadcrumbs>
                        <li className="breadcrumb-item"><Link to="/painel">Painel</Link></li>
                        <li className="breadcrumb-item"><Link to="/painel/medicamentos">Medicamentos</Link></li>
                        <li className="breadcrumb-item active">Detalhes do Medicamento</li>
                    </Components.Breadcrumbs>

                    <Row className="summary mb-5 p-2">
                        <span><b>Código de registro: </b>{medication.codigo_registro}</span>
                        <span><b>Nome: </b>{medication.nome}</span>
                        <span><b>Princípio ativo: </b>{medication.principio_ativo}</span>
                        <span><b>Fabricante: </b>{medication.fabricante}</span>
                        <span><b>Via de uso: </b>{medication.via_uso}</span>
                        <span><b>Concentração: </b>{medication.concentracao}</span>
                    </Row>
                </Container>
            </main>
        </Layouts.RestrictedLayout>
    );
}