import Layouts from "../../../../layouts/Layouts";
import React, {useEffect, useState} from "react";
import Contracts from "../../../../contracts/Contracts";
import Storages from "../../../../Storages";
import {Link, Navigate, useParams} from "react-router-dom";
import axios from "axios";
import Components from "../../../../components/Components";
import Memory from "../../../../Memory";
import {Container, Row} from "react-bootstrap";
import StockTransaction from "../../../stock-transaction/StockTransaction";

interface PathVariables extends Contracts.PathVariables {
    medicationId: string
}

export default function Details(): JSX.Element {
    const [data, setData] = useState<Contracts.Estoque>();
    const [notFound, setNotFound] = useState<boolean>(false);

    const userData = Storages.userStorage.get();
    const urlParams = useParams<PathVariables>();

    useEffect(() => {
        if (!urlParams.id || !userData)
            return;

        axios.get<Contracts.Estoque>(`${process.env.REACT_APP_API_URL}/medicamento/${urlParams.medicationId}/estoque/${urlParams.id}`, {headers: Memory.headers})
            .then(({data}) => setData(data))
            .catch(() => setNotFound(true));
    }, []);

    if (notFound)
        return <Navigate to="/not-found"/>;

    if (!data)
        return <Components.LoadingScreen/>;

    return (
        <Layouts.RestrictedLayout>
            <main id="stock">

                <Container>
                    <Components.Breadcrumbs>
                        <li className="breadcrumb-item"><Link to="/painel">Painel</Link></li>
                        <li className="breadcrumb-item"><Link to="/painel/medicamentos">Medicamentos</Link></li>
                        <li className="breadcrumb-item">
                            <Link to={`/painel/medicamentos/${urlParams.medicationId}`}>Detalhes do medicamento</Link>
                        </li>

                        <li className="breadcrumb-item active">Detalhes do Estoque</li>
                    </Components.Breadcrumbs>

                    <Row className="summary mb-5 p-2">
                        <span><b>Lote: </b>{data.lote}</span>
                        <span><b>Validade: </b>{new Date(data.validade).toLocaleDateString()}</span>
                        <span><b>Quantidade: </b>{data.quantidade} {data.medida}</span>

                        <div className="col-12">
                            <Link to="editar" className="btn btn-outline-primary btn-sm btn-edit">Editar</Link>
                        </div>
                    </Row>

                    <StockTransaction.Listing/>
                </Container>
            </main>
        </Layouts.RestrictedLayout>
    );
}