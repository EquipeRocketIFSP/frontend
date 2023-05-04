import React from "react";
import {ListGroup} from "react-bootstrap";

export default function Legend(): JSX.Element {
    return (
        <ListGroup horizontal="md" className="my-2 col-12">
            <ListGroup.Item className="col-md-3"><b>Status</b></ListGroup.Item>
            <ListGroup.Item className="col-md-3"><b>Quantidade</b></ListGroup.Item>
            <ListGroup.Item className="col-md-3"><b>Data</b></ListGroup.Item>
            <ListGroup.Item className="col-md-3"><b>Motivo</b></ListGroup.Item>
        </ListGroup>
    );
}