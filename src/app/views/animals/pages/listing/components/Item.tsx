import React from "react";
import {Link} from "react-router-dom";
import {ListGroup} from "react-bootstrap";
import Contracts from "../../../../../contracts/Contracts";

interface Props {
    id: number,
    nome: string,
    especie: string,
    idade: number,
    sexo: Contracts.AnimalSex
}

export default function Item(props: Props): JSX.Element {
    const {id, nome, especie, idade, sexo} = props;

    return (
        <Link to={"/painel/animais/" + id} style={{textDecoration: "none"}}>
            <ListGroup horizontal="md" className="my-2 col-12">
                <ListGroup.Item className="col-md-6">{nome}</ListGroup.Item>
                <ListGroup.Item className="col-md-3">{especie}</ListGroup.Item>
                <ListGroup.Item className="col-md-1">{idade}</ListGroup.Item>
                <ListGroup.Item className="col-md-2">{sexo === "MACHO" ? "Macho" : "Fêmea"}</ListGroup.Item>
            </ListGroup>
        </Link>
    );
}