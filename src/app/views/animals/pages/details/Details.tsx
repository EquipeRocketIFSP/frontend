import React, {useEffect, useState} from "react";

import Layouts from "../../../../layouts/Layouts";
import {Container, ListGroup, Pagination, Row} from "react-bootstrap";
import SearchBar from "../../../../components/search-bar/SearchBar";
import {Link, useParams} from "react-router-dom";
import Contracts from "../../../../contracts/Contracts";
import Storages from "../../../../Storages";
import axios, {AxiosHeaders} from "axios";
import Components from "../../../../components/Components";

export default function Details(): JSX.Element {
    const [animal, setAnimal] = useState<Contracts.Animal | null>(null);

    const userData = Storages.userStorage.get();
    const urlParams = useParams<Contracts.PathVariables>();

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

    return (
        <Layouts.Layout>
            <main id="animal">
                <h1>Dados do animal</h1>

                <Container>
                    <Row className="summary mb-5 p-2">
                        <span><b>Nome: </b>{animal.nome}</span>
                        <span><b>Sexo: </b>{animal.sexo === "MACHO" ? "Macho" : "Fêmea"}</span>
                        <span><b>Idade: </b>{animal.idade}</span>
                        <span><b>Espécie: </b>{animal.especie}</span>
                        <span><b>Raça: </b>{animal.raca}</span>
                        <span><b>Pelagem: </b>{animal.pelagem}</span>

                        <div className="col-12">
                            <Link to={`/painel/animais/${urlParams.id}/editar`}
                                  className="btn btn-outline-primary btn-sm btn-edit">Editar</Link>
                        </div>
                    </Row>

                    <SearchBar btnAdd={{label: "Novo Antendimento", href: "/painel/prontuario/cadastrar"}}/>

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