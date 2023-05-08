import React from "react";
import {ListGroup} from "react-bootstrap";
import Contracts from "../../../../../contracts/Contracts";

export default function Item(props: Contracts.EstoqueTransacao): JSX.Element {
    const {quantidade, data, status, motivo, responsavel} = props;

    return (
        <ListGroup horizontal="md" className="my-2 col-12">
            <ListGroup.Item className="col-md-2">
                <b className="d-md-none">Status: </b>{status}
            </ListGroup.Item>

            <ListGroup.Item className="col-md-2">
                <b className="d-md-none">Quantidade: </b>{quantidade}
            </ListGroup.Item>

            <ListGroup.Item className="col-md-2">
                <b className="d-md-none">Data: </b>{new Date(data).toLocaleString()}
            </ListGroup.Item>

            <ListGroup.Item className="col-md-3">
                <b className="d-md-none">Motivo: </b>{motivo}
            </ListGroup.Item>

            <ListGroup.Item className="col-md-3">
                <b className="d-md-none">Responsável: </b>{responsavel}
            </ListGroup.Item>
        </ListGroup>
    );
}