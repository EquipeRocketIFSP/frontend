import {Container, Row} from "react-bootstrap";
import Components from "../../../../../components/Components";
import Layouts from "../../../../../layouts/Layouts";
import React, {useEffect, useState} from "react";
import Contracts from "../../../../../contracts/Contracts";
import axios, {AxiosHeaders} from "axios";
import Storages from "../../../../../Storages";
import {Link, useParams} from "react-router-dom";
import Animals from "../../../../animals/Animals";

export default function Details(): JSX.Element {
    const [usuario, setUsuario] = useState<Contracts.PersonalData | null>(null);

    const userData = Storages.userStorage.get();
    const urlParams = useParams<Contracts.PathVariables>();

    const headers = new AxiosHeaders()
        .setContentType("application/json")
        .setAuthorization(`${userData?.type} ${userData?.token}`);

    useEffect(() => {
        if (!urlParams.id || !userData)
            return;

        axios.get(`${process.env.REACT_APP_API_URL}/tutor/${urlParams.id}`, {headers})
            .then(({data}) => setUsuario(data));
    }, []);

    if (!usuario)
        return <Components.LoadingScreen/>;

    return (
        <Layouts.RestrictedLayout>
            <Container className="pt-4">
                <Components.Breadcrumbs>
                    <li className="breadcrumb-item"><Link to="/painel">Painel</Link></li>
                    <li className="breadcrumb-item"><Link to="/painel/tutores">Tutores</Link></li>
                    <li className="breadcrumb-item active">Detalhes do tutor</li>
                </Components.Breadcrumbs>

                <Row className="summary mb-5 p-2">
                    <span><b>Nome: </b>{usuario.nome}</span>
                    <span><b>E-mail: </b>{usuario.email}</span>
                    <span><b>CPF: </b>{usuario.cpf}</span>
                    <span><b>RG: </b>{usuario.rg}</span>
                    <span><b>Endereço: </b>{usuario.logradouro}, {usuario.numero} - {usuario.cep} {usuario.bairro} - {usuario.cidade}/{usuario.estado}</span>
                    <span><b>Celular: </b>{usuario.celular}</span>
                    {usuario.telefone?.length ? <span><b>Telefone: </b>{usuario.telefone}</span> : <></>}

                    <div className="col-12">
                        <Link to={`/painel/tutores/${urlParams.id}/editar`}
                              className="btn btn-outline-primary btn-sm btn-edit">Editar</Link>
                    </div>
                </Row>
            </Container>

            <Animals.Listing/>
        </Layouts.RestrictedLayout>
    );
}