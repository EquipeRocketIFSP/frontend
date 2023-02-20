import React from "react";
import {Form, Row} from "react-bootstrap";

interface Props {
    title: string
}

export default function RegioesAfetadas(props: Props) {
    return (
        <fieldset>
            <legend>{props.title}</legend>

            <Row>
                <Form.Group className="mb-3 col-lg-6">
                    <Form.Label>Cabeça</Form.Label>

                    <div className="d-flex flex-column flex-md-row">
                        <Form.Check type="radio" name="cabeca" value="Sim" label="Sim" className="me-2"/>
                        <Form.Check type="radio" name="cabeca" value="Não" label="Não"/>
                    </div>
                </Form.Group>

                <Form.Group className="mb-3 col-lg-6">
                    <Form.Label>Torax</Form.Label>

                    <div className="d-flex flex-column flex-md-row">
                        <Form.Check type="radio" name="torax" value="Sim" label="Sim" className="me-2"/>
                        <Form.Check type="radio" name="torax" value="Não" label="Não"/>
                    </div>
                </Form.Group>

                <Form.Group className="mb-3 col-lg-3">
                    <Form.Label>Coluna</Form.Label>
                    <Form.Check type="radio" name="cervical" value="Cervical" label="Cervical"/>
                    <Form.Check type="radio" name="cervical" value="Torácica" label="Torácica"/>
                    <Form.Check type="radio" name="cervical" value="Lombar" label="Lombar"/>
                    <Form.Check type="radio" name="cervical" value="Sacral" label="Sacral"/>
                    <Form.Check type="radio" name="cervical" value="Caudal" label="Caudal"/>
                </Form.Group>

                <Form.Group className="mb-3 col-lg-3">
                    <Form.Label>Abdômen</Form.Label>
                    <Form.Check type="radio" name="abdomen" value="Epigástrica" label="Epigástrica"/>
                    <Form.Check type="radio" name="abdomen" value="Mesogástrica" label="Mesogástrica"/>
                    <Form.Check type="radio" name="abdomen" value="Hipogástrica" label="Hipogástrica"/>
                </Form.Group>

                <Form.Group className="mb-3 col-lg-3">
                    <Form.Label>M. Torácicos</Form.Label>
                    <Form.Check type="radio" name="m_toracicos_y" value="Direito" label="Direito"/>
                    <Form.Check type="radio" name="m_toracicos_y" value="Esquerdo" label="Esquerdo"/>
                    <Form.Check type="radio" name="m_toracicos_x" value="Proximal" label="Proximal"/>
                    <Form.Check type="radio" name="m_toracicos_x" value="Distrital" label="Distrital"/>
                </Form.Group>

                <Form.Group className="mb-3 col-lg-3">
                    <Form.Label>M. Pélvicos</Form.Label>
                    <Form.Check type="radio" name="m_pelvicos_y" value="Direito" label="Direito"/>
                    <Form.Check type="radio" name="m_pelvicos_y" value="Esquerdo" label="Esquerdo"/>
                    <Form.Check type="radio" name="m_pelvicos_x" value="Proximal" label="Proximal"/>
                    <Form.Check type="radio" name="m_pelvicos_x" value="Distrital" label="Distrital"/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Outros</Form.Label>
                    <Form.Control as="textarea" name="regioes_obs" placeholder="Descreva Aqui" rows={3}/>
                </Form.Group>
            </Row>
        </fieldset>
    );
}