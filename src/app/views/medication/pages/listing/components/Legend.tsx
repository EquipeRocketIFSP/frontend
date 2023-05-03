import React from "react";
import {ListGroup} from "react-bootstrap";

export default function Legend(): JSX.Element {
    return (
        <ListGroup horizontal="md" className="my-2 col-12">
            <ListGroup.Item className="col-md-2"><b>Código de registro</b></ListGroup.Item>
            <ListGroup.Item className="col-md-3"><b>Nome</b></ListGroup.Item>
            <ListGroup.Item className="col-md-3"><b>Concentração</b></ListGroup.Item>
            <ListGroup.Item className="col-md-2"><b>Via de uso</b></ListGroup.Item>
            <ListGroup.Item className="col-md-2"><b>Fabricante</b></ListGroup.Item>
        </ListGroup>
    );
}