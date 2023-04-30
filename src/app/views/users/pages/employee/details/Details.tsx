import React, {useEffect, useState} from "react";
import {Link, Navigate, useParams} from "react-router-dom";
import {Container, Row} from "react-bootstrap";
import axios from "axios";

import Components from "../../../../../components/Components";
import Layouts from "../../../../../layouts/Layouts";
import Contracts from "../../../../../contracts/Contracts";
import Memory from "../../../../../Memory";

export default function Details(): JSX.Element {
    const [usuario, setUsuario] = useState<Contracts.Funcionario | null>(null);
    const [notFound, setNotFound] = useState<boolean>(false);

    const urlParams = useParams<Contracts.PathVariables>();

    useEffect(() => {
        if (!urlParams.id)
            return;

        axios.get(`${process.env.REACT_APP_API_URL}/funcionario/${urlParams.id}`, {headers: Memory.headers})
            .then(({data}) => setUsuario(data))
            .catch(() => setNotFound(true));
    }, []);

    if (notFound)
        return <Navigate to="/not-found"/>;

    if (!usuario)
        return <Components.LoadingScreen/>;

    return (
        <Layouts.RestrictedLayout>
            <Container className="pt-4">
                <Components.Breadcrumbs>
                    <li className="breadcrumb-item"><Link to="/painel">Painel</Link></li>
                    <li className="breadcrumb-item"><Link to="/painel/funcionarios">Funcionarios</Link></li>
                    <li className="breadcrumb-item active">Detalhes do funcionario</li>
                </Components.Breadcrumbs>

                <Row className="summary mb-5 p-2">
                    <span><b>Nome: </b>{usuario.nome}</span>
                    <span><b>E-mail: </b>{usuario.email}</span>
                    {usuario.crmv ? <span><b>CRMV: </b>{usuario.crmv}</span> : <></>}
                    <span><b>CPF: </b>{usuario.cpf}</span>
                    <span><b>RG: </b>{usuario.rg}</span>
                    <span><b>Endereço: </b>{usuario.logradouro}, {usuario.numero} - {usuario.cep} {usuario.bairro} - {usuario.cidade}/{usuario.estado}</span>
                    <span><b>Celular: </b>{usuario.celular}</span>
                    {usuario.telefone?.length ? <span><b>Telefone: </b>{usuario.telefone}</span> : <></>}

                    <div className="col-12">
                        <Link to={`/painel/funcionarios/${urlParams.id}/editar`}
                              className="btn btn-outline-primary btn-sm btn-edit">Editar</Link>
                    </div>
                </Row>
            </Container>
        </Layouts.RestrictedLayout>
    );
}