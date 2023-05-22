import React from "react";
import {Form, Row} from "react-bootstrap";
import Contracts from "../../../../../contracts/Contracts";

interface Props {
    title: string,
    data: Contracts.AffectedRegions
}

export default function RegioesAfetadas(props: Props) {
    const {title, data} = props;

    const colunas = ["Cervical", "Torácica", "Lombar", "Sacral", "Caudal"];
    const abdomens = ["Epigástrica", "Mesogástrica", "Hipogástrica"];
    const musculos = ["Direito", "Esquerdo", "Proximal", "Distrital"];

    return (
        <fieldset>
            <legend>{title}</legend>

            <Row>
                <Form.Group className="mb-3 col-lg-6">
                    <Form.Label>Cabeça</Form.Label>

                    <div className="d-flex flex-column flex-md-row">
                        <Form.Check type="radio" name="cabeca" value="true" label="Sim" className="me-2"
                                    defaultChecked={data.cabeca}/>
                        <Form.Check type="radio" name="cabeca" value="false" label="Não" defaultChecked={!data.cabeca}/>
                    </div>
                </Form.Group>

                <Form.Group className="mb-3 col-lg-6">
                    <Form.Label>Torax</Form.Label>

                    <div className="d-flex flex-column flex-md-row">
                        <Form.Check type="radio" name="torax" value="true" label="Sim" className="me-2"
                                    defaultChecked={data.torax}/>
                        <Form.Check type="radio" name="torax" value="false" label="Não" defaultChecked={!data.torax}/>
                    </div>
                </Form.Group>

                <Form.Group className="mb-3 col-lg-3">
                    <Form.Label>Coluna</Form.Label>
                    {
                        colunas.map((value) => {
                            return (
                                <Form.Check
                                    type="checkbox"
                                    name="coluna[]"
                                    value={value}
                                    label={value}
                                    defaultChecked={data.coluna?.includes(value)}/>
                            );
                        })
                    }
                </Form.Group>

                <Form.Group className="mb-3 col-lg-3">
                    <Form.Label>Abdômen</Form.Label>
                    {
                        abdomens.map((value) => {
                            return (
                                <Form.Check
                                    type="checkbox"
                                    name="abdomen[]"
                                    value={value}
                                    label={value}
                                    defaultChecked={data.abdomen?.includes(value)}/>
                            );
                        })
                    }
                </Form.Group>

                <Form.Group className="mb-3 col-lg-3">
                    <Form.Label>M. Torácicos</Form.Label>
                    {
                        musculos.map((value) => {
                            return (
                                <Form.Check
                                    type="checkbox"
                                    name="m_toracicos[]"
                                    value={value}
                                    label={value}
                                    defaultChecked={data.m_toracicos?.includes(value)}/>
                            );
                        })
                    }
                </Form.Group>

                <Form.Group className="mb-3 col-lg-3">
                    <Form.Label>M. Pélvicos</Form.Label>
                    {
                        musculos.map((value) => {
                            return (
                                <Form.Check
                                    type="checkbox"
                                    name="m_pelvicos[]"
                                    value={value}
                                    label={value}
                                    defaultChecked={data.m_pelvicos?.includes(value)}/>
                            );
                        })
                    }
                </Form.Group>

                <Form.Group>
                    <Form.Label>Outros</Form.Label>
                    <Form.Control as="textarea" name="regioes_obs" placeholder="Descreva Aqui" rows={3}
                                  defaultValue={data.regioes_obs}/>
                </Form.Group>
            </Row>
        </fieldset>
    );
}