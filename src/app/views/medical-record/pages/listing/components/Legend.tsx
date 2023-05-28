import React from "react";
import {ListGroup} from "react-bootstrap";

export default function Legend(): JSX.Element {
    return (
        <ListGroup horizontal="md" className="my-2 col-12">
            <ListGroup.Item className="col-md-3"><b>Código</b></ListGroup.Item>
            <ListGroup.Item className="col-md-4"><b>Veterinário</b></ListGroup.Item>
            <ListGroup.Item className="col-md-3"><b>Tutor</b></ListGroup.Item>
            <ListGroup.Item className="col-md-2"><b>Data</b></ListGroup.Item>
        </ListGroup>
    );
}