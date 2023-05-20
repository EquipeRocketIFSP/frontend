import React from "react";
import {Link} from "react-router-dom";
import {ListGroup} from "react-bootstrap";
import Contracts from "../../../../../contracts/Contracts";

export default function Item(props: Contracts.Prontuario): JSX.Element {
    const {codigo, veterinario, tutor, data_atendimento} = props;

    return (
        <Link to={`prontuario/${codigo}`} style={{textDecoration: "none"}}>
            <ListGroup horizontal="md" className="my-2 col-12">
                <ListGroup.Item className="col-md-3"><b className="d-md-none">Código: </b>{codigo}</ListGroup.Item>

                <ListGroup.Item className="col-md-4">
                    <b className="d-md-none">Veterinário: </b>{veterinario.nome}
                </ListGroup.Item>

                <ListGroup.Item className="col-md-3"><b className="d-md-none">Tutor: </b>{tutor.nome}</ListGroup.Item>

                <ListGroup.Item className="col-md-2">
                    <b className="d-md-none">Data: </b>{data_atendimento}
                </ListGroup.Item>
            </ListGroup>
        </Link>
    );
}