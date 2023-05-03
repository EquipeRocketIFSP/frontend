import React from "react";
import {ListGroup} from "react-bootstrap";
import Contracts from "../../../../../contracts/Contracts";
import {Link, useParams} from "react-router-dom";

export default function Item(props: Contracts.Estoque): JSX.Element {
    const {id, quantidade, lote, medida, validade} = props;
    const {id: medicationId} = useParams();

    return (
        <Link to={`/painel/medicamentos/${medicationId}/estoques/${id}`}>
            <ListGroup horizontal="md" className="my-2 col-12">
                <ListGroup.Item className="col-md-3">
                    <b className="d-md-none">Lote: </b>{lote}
                </ListGroup.Item>

                <ListGroup.Item className="col-md-3">
                    <b className="d-md-none">Quantidade: </b>{quantidade}
                </ListGroup.Item>

                <ListGroup.Item className="col-md-3">
                    <b className="d-md-none">Medida: </b>{medida}
                </ListGroup.Item>

                <ListGroup.Item className="col-md-3">
                    <b className="d-md-none">Validade: </b>{validade}
                </ListGroup.Item>
            </ListGroup>
        </Link>
    );
}