import {Button, Form, Row, Spinner} from "react-bootstrap";
import Forms from "../../../../../../forms/Forms";
import {Link} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import Components from "../../../../../../components/Components";
import Contracts from "../../../../../../contracts/Contracts";

interface Props {
    usuario?: Contracts.Funcionario,
    setVeterinario: (value: boolean) => void
}

export default function DefaultForm(props: Props): JSX.Element {
    const {usuario} = props;
    const {validationErrors, sendingForm} = useContext(Components.FormSubmitContext);

    const authorities = new Set(usuario?.authorities);

    const [showCRMVField, setShowCRMVField] = useState<boolean>(authorities.has("VETERINARIO"));

    useEffect(() => {
        props.setVeterinario(authorities.has("VETERINARIO"));
    }, []);

    const onInputIsVeterinario = () => {
        setShowCRMVField(!showCRMVField);
        props.setVeterinario(!showCRMVField);
    }

    return (
        <>
            <Forms.Usuario data={usuario} validationErrors={validationErrors}/>

            <Row className="rounded shadow mb-3 pt-3">
                <Form.Group className="mb-3 col-lg-4">
                    <Form.Check type="checkbox" name="is_admin" value="true" label="Permissão de administrador"
                                defaultChecked={authorities.has("ADMIN")}/>
                </Form.Group>

                <Form.Group className="mb-3 col-lg-4">
                    <Form.Check name="is_veterinario" type="checkbox" label="Permissão de veterinário"
                                defaultChecked={authorities.has("VETERINARIO")}
                                disabled={usuario?.is_techinical_responsible} onInput={onInputIsVeterinario}/>
                </Form.Group>

                <Form.Group className="mb-3 col-lg-4">
                    <Form.Check name="is_technical_responsible" type="checkbox" value="true" label="Responsável técnico"
                                defaultChecked={usuario?.is_techinical_responsible}
                                disabled={!showCRMVField || usuario?.is_techinical_responsible}/>
                </Form.Group>

                {
                    showCRMVField ?
                        <Form.Group className="mb-3 col-lg-12">
                            <Form.Label>CRMV*</Form.Label>
                            <Form.Control name="crmv" defaultValue={usuario?.crmv} required/>
                        </Form.Group> :
                        <></>
                }
            </Row>

            <Row className="rounded shadow mb-3 pt-3">
                <Form.Group className="mb-3 col-lg-12">
                    <Form.Label htmlFor="email">E-mail*</Form.Label>
                    <Form.Control name="email" defaultValue={usuario?.email} maxLength={255} id="email" type="email"
                                  required/>
                    <Form.Text style={{color: "red"}}>{validationErrors["email"] ?? ""}</Form.Text>
                </Form.Group>
            </Row>

            {
                sendingForm ?
                    (
                        <div className="d-flex justify-content-between">
                            <Button variant="outline-secondary" disabled>Voltar</Button>
                            <Button variant="outline-success" disabled><Spinner animation="grow" size="sm"/></Button>
                        </div>
                    ) :
                    (
                        <div className="d-flex justify-content-between">
                            <Link to={`/painel`}
                                  className="btn btn-outline-secondary">Voltar</Link>
                            <Button type="submit" variant="outline-success">Finalizar</Button>
                        </div>
                    )
            }
        </>
    );
}