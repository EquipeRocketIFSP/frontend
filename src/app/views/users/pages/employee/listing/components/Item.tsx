import React, {useContext, useState} from "react";
import {Link} from "react-router-dom";
import {Badge, Form, ListGroup} from "react-bootstrap";
import Contracts from "../../../../../../contracts/Contracts";
import axios from "axios";
import {ListingContext} from "../../../../../../components/listing/Listing";
import Memory from "../../../../../../Memory";
import JWTData from "../../../../../../helpers/components/JWTData";

export default function Item(props: Contracts.PersonalData): JSX.Element {
    const {id, nome, email, authorities, deleted_at} = props;
    const {updateListing} = useContext(ListingContext);

    const [disabledUser, setDisabledUser] = useState<boolean>(!props.deleted_at);

    const authoritesSet = new Set(authorities);

    const onToggleDeleteBtn = async () => {
        setDisabledUser(!deleted_at);

        try {
            if (deleted_at)
                await axios.put(`${process.env.REACT_APP_API_URL}/funcionario/${id}/restaurar`, {}, {headers: Memory.headers});
            else
                await axios.delete(`${process.env.REACT_APP_API_URL}/funcionario/${id}`, {headers: Memory.headers});

            updateListing();
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <ListGroup horizontal="md" className="my-2 col-12">
            <ListGroup.Item className="col-md-5 d-flex align-items-center">
                <Link to={"/painel/funcionarios/" + id} style={{textDecoration: "none"}}>
                    <b className="d-md-none">Nome: </b>{nome}
                </Link>
            </ListGroup.Item>

            <ListGroup.Item className="col-md-5 d-flex align-items-center">
                <Link to={"/painel/funcionarios/" + id} style={{textDecoration: "none"}}
                      className="d-flex justify-content-between flex-wrap w-100">
                    <div>
                        <b className="d-md-none">E-mail: </b>{email}
                    </div>

                    <div className="d-flex justify-content-center">
                        {authoritesSet.has("ADMIN") ?
                            <Badge pill bg="primary" className="mx-1">Administrador</Badge> : <></>}

                        {authoritesSet.has("VETERINARIO") ?
                            <Badge pill bg="success" className="mx-1">Veterinario</Badge> : <></>}

                        {
                            authoritesSet.has("FUNCIONARIO") && !authoritesSet.has("ADMIN") ?
                                <Badge pill bg="secondary" className="mx-1">Funcionario</Badge> : <></>
                        }
                    </div>
                </Link>
            </ListGroup.Item>

            <ListGroup.Item className="col-md-1 d-flex justify-content-center">
                {
                    id !== JWTData.getUserId() ?
                        <Link className="btn btn-outline-primary btn-sm" to={`/painel/funcionarios/${id}/editar`}>
                            <i className="fa-solid fa-pen-to-square"></i>
                        </Link>:
                        <Link className="btn btn-outline-primary btn-sm" to={`/painel/usuario/editar`}>
                            <i className="fa-solid fa-pen-to-square"></i>
                        </Link>
                }
            </ListGroup.Item>

            <ListGroup.Item className="col-md-1 d-flex justify-content-center">
                {
                    id !== JWTData.getUserId() ?
                        <Form.Check type="switch" id="custom-switch" onInput={onToggleDeleteBtn}
                                    checked={disabledUser}/> :
                        <Form.Check type="switch" id="custom-switch" checked={disabledUser} disabled/>
                }
            </ListGroup.Item>
        </ListGroup>
    );
}