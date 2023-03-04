import React from "react";

import Layouts from "../../layouts/Layouts";
import {Container, ListGroup, Pagination, Row} from "react-bootstrap";
import SearchBar from "../../components/search-bar/SearchBar";
import {Link} from "react-router-dom";

export default function Animal(): JSX.Element {
    return (
        <Layouts.Layout>
            <main id="animal">
                <h1>Dados do animal</h1>

                <Container>
                    <Row className="summary-aniamal mb-5 p-2">
                        <span><b>Tutor: </b>Joe Doe</span>
                        <span><b>Animal: </b>Lil Cat</span>
                        <span><b>Idade: </b>5</span>
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