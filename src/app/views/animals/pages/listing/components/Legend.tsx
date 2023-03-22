import React from "react";
import {ListGroup} from "react-bootstrap";

export default function Legend(): JSX.Element {
    return (
        <ListGroup horizontal="md" className="my-2 col-12">
            <ListGroup.Item className="col-md-6"><b>Nome</b></ListGroup.Item>
            <ListGroup.Item className="col-md-3"><b>Espécie</b></ListGroup.Item>
            <ListGroup.Item className="col-md-1"><b>Idade</b></ListGroup.Item>
            <ListGroup.Item className="col-md-2"><b>Sexo</b></ListGroup.Item>
        </ListGroup>
    );
}