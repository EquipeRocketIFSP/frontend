import React from "react";
import {Link} from "react-router-dom";
import {Badge, ListGroup} from "react-bootstrap";
import Contracts from "../../../../../../contracts/Contracts";

export default function Item(props: Contracts.PersonalData): JSX.Element {
    const {id, nome, email, authorities} = props;

    const authoritesSet = new Set(authorities);

    return (
        <Link to={"/painel/tutores/" + id} style={{textDecoration: "none"}}>
            <ListGroup horizontal="md" className="my-2 col-12">
                <ListGroup.Item className="col-md-6"><b className="d-md-none">Nome: </b>{nome}</ListGroup.Item>
                <ListGroup.Item className="col-md-6 d-flex justify-content-between flex-wrap">
                    <div>
                        <b className="d-md-none">E-mail: </b>{email}
                    </div>

                    <div className="d-flex justify-content-center">
                        {authoritesSet.has("ADMIN") ? <Badge pill bg="primary" className="mx-1">Administrador</Badge> : <></>}

                        {authoritesSet.has("VETERINARIO") ? <Badge pill bg="success" className="mx-1">Veterinario</Badge> : <></>}

                        {
                            authoritesSet.has("FUNCIONARIO") && !authoritesSet.has("ADMIN") ?
                                <Badge pill bg="secondary" className="mx-1">Funcionario</Badge> : <></>
                        }
                    </div>
                </ListGroup.Item>
            </ListGroup>
        </Link>
    );
}