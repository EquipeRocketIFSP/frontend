import React from "react";
import {Link} from "react-router-dom";
import {ListGroup} from "react-bootstrap";

interface Props {
    id: number,
    nome: string,
    email: string
}

export default function Item(props: Props): JSX.Element {
    const {id, nome, email} = props;

    return (
        <Link to={"/painel/tutores/" + id} style={{textDecoration: "none"}}>
            <ListGroup horizontal="md" className="my-2 col-12">
                <ListGroup.Item className="col-md-6">{nome}</ListGroup.Item>
                <ListGroup.Item className="col-md-6">{email}</ListGroup.Item>
            </ListGroup>
        </Link>
    );
}