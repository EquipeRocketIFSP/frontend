import React, {useState} from "react";
import {Button, Form, Modal, Row} from "react-bootstrap";

import Contracts from "../../../../contracts/Contracts";

export default function ManifestacoesClinicas(props: Contracts.CloseModal) {
    const {closeModal} = props;

    const [showOthersLinfonodos, setShowOthersLinfonodos] = useState<boolean>(false);

    return (
        <Modal show={true} onHide={() => closeModal()} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Manifestações Clínicas</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <fieldset>
                        <legend>Geral</legend>

                        <Row>
                            <Form.Group className="mb-3 col-lg-4">
                                <Form.Label>Prostração</Form.Label>

                                <div className="d-flex">
                                    <Form.Check type="radio" name="prostracao" value="Sim" label="Sim" className="me-2"
                                                defaultChecked required/>
                                    <Form.Check type="radio" name="prostracao" value="Não" label="Não"/>
                                </div>
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-4">
                                <Form.Label>Febre</Form.Label>

                                <div className="d-flex">
                                    <Form.Check type="radio" name="febre" value="Sim" label="Sim" className="me-2"
                                                required/>
                                    <Form.Check type="radio" name="febre" value="Não" label="Não" defaultChecked/>
                                </div>
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-4">
                                <Form.Label>Vômito</Form.Label>

                                <div className="d-flex">
                                    <Form.Check type="radio" name="vomito" value="Sim" label="Sim" className="me-2"
                                                required/>
                                    <Form.Check type="radio" name="vomito" value="Não" label="Não" defaultChecked/>
                                </div>
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-4">
                                <Form.Label>Diarréia</Form.Label>

                                <div className="d-flex">
                                    <Form.Check type="radio" name="diarreia" value="Sim" label="Sim" className="me-2"
                                                required/>
                                    <Form.Check type="radio" name="diarreia" value="Não" label="Não" defaultChecked/>
                                </div>
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-4">
                                <Form.Label>Espasmos/Convulsão</Form.Label>

                                <div className="d-flex">
                                    <Form.Check type="radio" name="espasmos_convulsao" value="Sim" label="Sim"
                                                className="me-2"
                                                required/>
                                    <Form.Check type="radio" name="espasmos_convulsao" value="Não" label="Não"
                                                defaultChecked/>
                                </div>
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-4">
                                <Form.Label>Deambulação Alterada</Form.Label>

                                <div className="d-flex">
                                    <Form.Check type="radio" name="deambulacao" value="Sim" label="Sim" className="me-2"
                                                required/>
                                    <Form.Check type="radio" name="deambulacao" value="Não" label="Não" defaultChecked/>
                                </div>
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-4">
                                <Form.Label>Sensibilidade/Dor</Form.Label>

                                <div className="d-flex">
                                    <Form.Check type="radio" name="sensibilidade_dor" value="Sim" label="Sim"
                                                className="me-2"
                                                required/>
                                    <Form.Check type="radio" name="sensibilidade_dor" value="Não" label="Não"
                                                defaultChecked/>
                                </div>
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-4">
                                <Form.Label>Lesões/Nódulos</Form.Label>

                                <div className="d-flex">
                                    <Form.Check type="radio" name="lesoes_nodulos" value="Sim" label="Sim"
                                                className="me-2"
                                                required/>
                                    <Form.Check type="radio" name="lesoes_nodulos" value="Não" label="Não"
                                                defaultChecked/>
                                </div>
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-12">
                                <Form.Label>Apetite</Form.Label>

                                <div className="d-flex flex-column flex-md-row">
                                    <Form.Check type="radio" name="apetite" value="Normal" label="Normal"
                                                className="me-2"
                                                defaultChecked required/>
                                    <Form.Check type="radio" name="apetite" value="Reduzido" label="Reduzido"
                                                className="me-2"/>
                                    <Form.Check type="radio" name="apetite" value="Aumentado" label="Aumentado"
                                                className="me-2"/>
                                </div>
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-12">
                                <Form.Label>Linfonodos</Form.Label>

                                <div className="d-flex flex-column flex-md-row">
                                    <Form.Check type="radio" name="linfonodos" value="Mandibular" label="Mandibular"
                                                className="me-2" onInput={() => setShowOthersLinfonodos(false)}/>
                                    <Form.Check type="radio" name="linfonodos" value="Cervical" label="Cervical"
                                                className="me-2" onInput={() => setShowOthersLinfonodos(false)}/>
                                    <Form.Check type="radio" name="linfonodos" value="Mamários" label="Mamários"
                                                className="me-2" onInput={() => setShowOthersLinfonodos(false)}/>
                                    <Form.Check type="radio" name="linfonodos" value="Inguinal" label="Inguinal"
                                                className="me-2" onInput={() => setShowOthersLinfonodos(false)}/>
                                    <Form.Check type="radio" name="linfonodos" value="Popiliteo" label="Popiliteo"
                                                className="me-2" onInput={() => setShowOthersLinfonodos(false)}/>
                                    <Form.Check type="radio" name="linfonodos" value="Outras" label="Outras"
                                                className="me-2" onInput={() => setShowOthersLinfonodos(true)}/>
                                </div>

                                {showOthersLinfonodos ?
                                    <Form.Control as="textarea" name="linfonodos_obs" rows={3}
                                                  placeholder="Observações"/> : <></>}
                            </Form.Group>
                        </Row>
                    </fieldset>

                    <fieldset>
                        <legend>Regiões</legend>

                        <Row>
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
                                <Form.Check type="radio" name="m_toracicos" value="Direito" label="Direito"/>
                                <Form.Check type="radio" name="m_toracicos" value="Esquerdo" label="Esquerdo"/>
                                <Form.Check type="radio" name="m_toracicos" value="Proximal" label="Proximal"/>
                                <Form.Check type="radio" name="m_toracicos" value="Distrital" label="Distrital"/>
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-3">
                                <Form.Label>M. Pélvicos</Form.Label>
                                <Form.Check type="radio" name="m_pelvicos" value="Direito" label="Direito"/>
                                <Form.Check type="radio" name="m_pelvicos" value="Esquerdo" label="Esquerdo"/>
                                <Form.Check type="radio" name="m_pelvicos" value="Proximal" label="Proximal"/>
                                <Form.Check type="radio" name="m_pelvicos" value="Distrital" label="Distrital"/>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Outros</Form.Label>
                                <Form.Control as="textarea" name="regioes_obs" placeholder="Descreva Aqui" rows={3}/>
                            </Form.Group>
                        </Row>
                    </fieldset>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={() => closeModal()}>Fechar</Button>
                <Button variant="primary">Salvar</Button>
            </Modal.Footer>
        </Modal>
    );
}