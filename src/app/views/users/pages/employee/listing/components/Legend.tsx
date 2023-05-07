import {ListGroup} from "react-bootstrap";
import React from "react";

export default function Legend():JSX.Element{
    return (
        <ListGroup horizontal="md" className="my-2 col-12">
            <ListGroup.Item className="col-md-5"><b>Nome</b></ListGroup.Item>
            <ListGroup.Item className="col-md-5"><b>E-mail</b></ListGroup.Item>
            <ListGroup.Item className="col-md-1"><b>Ações</b></ListGroup.Item>
            <ListGroup.Item className="col-md-1"><b>Acesso</b></ListGroup.Item>
        </ListGroup>
    );
}