import React from "react";
import Layouts from "../../layouts/Layouts";
import SearchBar from "../../components/search-bar/SearchBar";
import {Container, ListGroup, Pagination} from "react-bootstrap";
import {Link} from "react-router-dom";

export default function Animais() {
    return (
        <Layouts.Layout>
            <main>
                <Container>
                    <SearchBar/>

                    <div style={{height:"60vh"}}>
                        <Link to={"/painel/animais/1"} style={{textDecoration: "none"}}>
                            <ListGroup horizontal="md" className="my-2 col-12">
                                <ListGroup.Item className="col-md-6">Nome do Animal</ListGroup.Item>
                                <ListGroup.Item className="col-md-3">Cachorro</ListGroup.Item>
                                <ListGroup.Item className="col-md-1">12</ListGroup.Item>
                                <ListGroup.Item className="col-md-2">Macho</ListGroup.Item>
                            </ListGroup>
                        </Link>

                        <Link to={"/painel/animais/1"} style={{textDecoration: "none"}}>
                            <ListGroup horizontal="md" className="my-2 col-12">
                                <ListGroup.Item className="col-md-6">Nome do Animal</ListGroup.Item>
                                <ListGroup.Item className="col-md-3">Cachorro</ListGroup.Item>
                                <ListGroup.Item className="col-md-1">12</ListGroup.Item>
                                <ListGroup.Item className="col-md-2">Macho</ListGroup.Item>
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