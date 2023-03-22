import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import axios, {AxiosHeaders} from "axios";
import {Container, ListGroup, Pagination, Row} from "react-bootstrap";

import Layouts from "../../../../layouts/Layouts";
import Contracts from "../../../../contracts/Contracts";
import Storages from "../../../../Storages";
import Components from "../../../../components/Components";

interface PathVariables extends Contracts.PathVariables {
    tutorId?: string
}

export default function Details(): JSX.Element {
    const [animal, setAnimal] = useState<Contracts.Animal | null>(null);

    const userData = Storages.userStorage.get();
    const urlParams = useParams<PathVariables>();

    const headers = new AxiosHeaders()
        .setContentType("application/json")
        .setAuthorization(`${userData?.type} ${userData?.token}`);

    useEffect(() => {
        if (!urlParams.id || !userData)
            return;

        axios.get(`${process.env.REACT_APP_API_URL}/animal/${urlParams.id}`, {headers})
            .then(({data}) => setAnimal(data));
    }, []);

    if (!animal)
        return <Components.LoadingScreen/>;

    const age = new Date().getFullYear() - animal.ano_nascimento;

    return (
        <Layouts.Layout>
            <main id="animal">
                <h1>Dados do animal</h1>

                <Container>
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

                    <Components.SearchBar btnAdd={{label: "Novo Antendimento", href: "/painel/prontuario/cadastrar"}}/>

                    <h5 style={{textAlign: "center"}}>Prontuários</h5>

                    <div style={{height: "60vh"}}>
                        <Link to={""} style={{textDecoration: "none"}}>
                            <ListGroup horizontal="md" className="my-2 col-12">
                                <ListGroup.Item className="col-md-12">26/08/2023</ListGroup.Item>
                            </ListGroup>
                        </Link>

                        <Link to={""} style={{textDecoration: "none"}}>
                            <ListGroup horizontal="md" className="my-2 col-12">
                                <ListGroup.Item className="col-md-12">26/08/2023</ListGroup.Item>
                            </ListGroup>
                        </Link>
                    </div>

                    <Pagination className="justify-content-center">
                        <Pagination.First/>
                        <Pagination.Prev/>

                        <Pagination.Item>{1}</Pagination.Item>
                        <Pagination.Item>{2}</Pagination.Item>
                        <Pagination.Item active>{3}</Pagination.Item>

                        <Pagination.Ellipsis/>

                        <Pagination.Item>{10}</Pagination.Item>
                        <Pagination.Item>{11}</Pagination.Item>

                        <Pagination.Next/>
                        <Pagination.Last/>
                    </Pagination>


                </Container>
            </main>
        </Layouts.Layout>
    );
}