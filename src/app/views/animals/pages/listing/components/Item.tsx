import React from "react";
import {Link, useParams} from "react-router-dom";
import {ListGroup} from "react-bootstrap";
import Contracts from "../../../../../contracts/Contracts";

interface Props {
    id: number,
    nome: string,
    especie: string,
    ano_nascimento: number,
    sexo: Contracts.AnimalSex
}

export default function Item(props: Props): JSX.Element {
    const {id, nome, especie, ano_nascimento, sexo} = props;
    const urlParams = useParams<Contracts.PathVariables>();
    const age = new Date().getFullYear() - ano_nascimento;

    return (
        <Link to={`/painel/tutores/${urlParams.id}/animais/${id}`} style={{textDecoration: "none"}}>
            <ListGroup horizontal="md" className="my-2 col-12">
                <ListGroup.Item className="col-md-6"><b className="d-md-none">Nome: </b>{nome}</ListGroup.Item>
                <ListGroup.Item className="col-md-3"><b className="d-md-none">Espécie: </b>{especie}</ListGroup.Item>
                <ListGroup.Item className="col-md-1"><b className="d-md-none">Idade: </b>{age} {age > 1 ? "anos" : "ano"}</ListGroup.Item>
                <ListGroup.Item className="col-md-2"><b className="d-md-none">Sexo: </b>{sexo === "MACHO" ? "Macho" : "Fêmea"}</ListGroup.Item>
            </ListGroup>
        </Link>
    );
}