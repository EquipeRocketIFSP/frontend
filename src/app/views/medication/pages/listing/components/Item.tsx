import React from "react";
import {ListGroup} from "react-bootstrap";
import Contracts from "../../../../../contracts/Contracts";
import {Link} from "react-router-dom";

export default function Item(props: Contracts.Medicamento): JSX.Element {
    const {id, nome, concentracao, codigo_registro, via_uso, fabricante} = props;

    return (
        <Link to={`/painel/medicamentos/${id}`}>
            <ListGroup horizontal="md" className="my-2 col-12">
                <ListGroup.Item className="col-md-2">
                    <b className="d-md-none">Código de registro: </b>{codigo_registro}
                </ListGroup.Item>

                <ListGroup.Item className="col-md-3">
                    <b className="d-md-none">Nome: </b>{nome}
                </ListGroup.Item>

                <ListGroup.Item className="col-md-3">
                    <b className="d-md-none">Concentração: </b>{concentracao}
                </ListGroup.Item>

                <ListGroup.Item className="col-md-2">
                    <b className="d-md-none">Via de uso: </b>{via_uso}
                </ListGroup.Item>

                <ListGroup.Item className="col-md-2">
                    <b className="d-md-none">Fabricante: </b>{fabricante}
                </ListGroup.Item>
            </ListGroup>
        </Link>
    );
}