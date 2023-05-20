import React, {useContext, useState} from "react";
import {Button, Form, Modal, Row, Spinner} from "react-bootstrap";
import Components from "../../../../components/Components";

import Contracts from "../../../../contracts/Contracts";
import RegioesAfetadas from "./components/RegioesAfetadas";
import {FormProntuarioContext} from "../../FormProntuario";
import axios from "axios";
import Memory from "../../../../Memory";
import ProntuarioModalProps from "./types/ProntuarioModalProps";

export default function ManifestacoesClinicas(props: ProntuarioModalProps) {
    const {closeModal, data} = props;
    const {updateProntuarioData, setClinicalManifestationsStatus} = useContext(FormProntuarioContext);

    const [showOthersLinfonodos, setShowOthersLinfonodos] = useState<boolean>(data.linfonodos === "Outras");
    const [showDor, setShowDor] = useState<boolean>(data.sensibilidade_dor);
    const [showLesoes, setShowLesoes] = useState<boolean>(data.lesoes_nodulos);

    const [validationErrors, setValidationErrors] = useState<Contracts.DynamicObject<string>>({});
    const [dataStatus, setDataStatus] = useState<Contracts.FormStatus>("idle");

    if (!updateProntuarioData || !setClinicalManifestationsStatus)
        throw new Error("updateProntuarioData or setClinicalManifestationsStatus undefined");

    let titleRegioes = "";

    if (showDor && showLesoes)
        titleRegioes = "Regiões Afetadas";
    else if (showDor)
        titleRegioes = "Regiões com Sensibilidade/Dor";
    else if (showLesoes)
        titleRegioes = "Regiões com Lesões/Nódulos";

    const onSubmit = async (formData: FormData) => {
        const url = `${process.env.REACT_APP_API_URL}/prontuario/${data.id}/manifestacoes-clinicas`;
        const {data: response} = await axios.put<Contracts.Prontuario>(url, formData, {headers: Memory.headers});

        updateProntuarioData(response);
        setClinicalManifestationsStatus("ok");

        closeModal();
    }

    const apetites = ["Normal", "Reduzido", "Aumentado"];
    const linfonodos = ["Mandibular", "Cervical", "Mamários", "Inguinal", "Popiliteo", "Outras"];

    return (
        <Modal show={true} onHide={() => closeModal()} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Manifestações Clínicas</Modal.Title>
            </Modal.Header>

            <Components.FormSubmit
                onSubmit={onSubmit}
                setDataStatus={setDataStatus}
                setValidationErrors={setValidationErrors}
                dataStatus={dataStatus}
                validationErrors={validationErrors}
            >
                <Components.FormSubmitContext.Consumer>
                    {
                        ({sendingForm}) => (
                            <>
                                <Modal.Body>
                                    <fieldset>
                                        <legend>Geral</legend>

                                        <Row>
                                            <Form.Group className="mb-3 col-lg-4">
                                                <Form.Label>Prostração</Form.Label>

                                                <div className="d-flex">
                                                    <Form.Check type="radio" name="prostracao" value="true"
                                                                label="Sim"
                                                                className="me-2"
                                                                defaultChecked={data.prostracao}
                                                                required/>
                                                    <Form.Check type="radio" name="prostracao" value="false"
                                                                label="Não" defaultChecked={!data.prostracao}/>
                                                </div>
                                            </Form.Group>

                                            <Form.Group className="mb-3 col-lg-4">
                                                <Form.Label>Febre</Form.Label>

                                                <div className="d-flex">
                                                    <Form.Check type="radio" name="febre" value="true" label="Sim"
                                                                className="me-2"
                                                                defaultChecked={data.febre}
                                                                required/>
                                                    <Form.Check type="radio" name="febre" value="false" label="Não"
                                                                defaultChecked={!data.febre}/>
                                                </div>
                                            </Form.Group>

                                            <Form.Group className="mb-3 col-lg-4">
                                                <Form.Label>Vômito</Form.Label>

                                                <div className="d-flex">
                                                    <Form.Check type="radio" name="vomito" value="true" label="Sim"
                                                                className="me-2"
                                                                defaultChecked={data.vomito}
                                                                required/>
                                                    <Form.Check type="radio" name="vomito" value="false" label="Não"
                                                                defaultChecked={!data.vomito}/>
                                                </div>
                                            </Form.Group>

                                            <Form.Group className="mb-3 col-lg-4">
                                                <Form.Label>Diarréia</Form.Label>

                                                <div className="d-flex">
                                                    <Form.Check type="radio" name="diarreia" value="true"
                                                                label="Sim"
                                                                className="me-2"
                                                                defaultChecked={data.diarreia}
                                                                required/>
                                                    <Form.Check type="radio" name="diarreia" value="false"
                                                                label="Não"
                                                                defaultChecked={!data.diarreia}/>
                                                </div>
                                            </Form.Group>

                                            <Form.Group className="mb-3 col-lg-4">
                                                <Form.Label>Espasmos/Convulsão</Form.Label>

                                                <div className="d-flex">
                                                    <Form.Check type="radio" name="espasmos_convulsao" value="true"
                                                                label="Sim"
                                                                className="me-2"
                                                                defaultChecked={data.espasmos_convulsao}
                                                                required/>
                                                    <Form.Check type="radio" name="espasmos_convulsao" value="false"
                                                                label="Não"
                                                                defaultChecked={!data.espasmos_convulsao}/>
                                                </div>
                                            </Form.Group>

                                            <Form.Group className="mb-3 col-lg-4">
                                                <Form.Label>Deambulação Alterada</Form.Label>

                                                <div className="d-flex">
                                                    <Form.Check type="radio" name="deambulacao" value="true"
                                                                label="Sim"
                                                                className="me-2"
                                                                defaultChecked={data.deambulacao}
                                                                required/>
                                                    <Form.Check type="radio" name="deambulacao" value="false"
                                                                label="Não"
                                                                defaultChecked={!data.deambulacao}/>
                                                </div>
                                            </Form.Group>

                                            <Form.Group className="mb-3 col-lg-4">
                                                <Form.Label>Sensibilidade/Dor</Form.Label>

                                                <div className="d-flex">
                                                    <Form.Check type="radio" name="sensibilidade_dor" value="true"
                                                                label="Sim"
                                                                className="me-2"
                                                                onInput={() => setShowDor(true)}
                                                                defaultChecked={data.sensibilidade_dor}
                                                                required/>
                                                    <Form.Check type="radio" name="sensibilidade_dor" value="false"
                                                                label="Não"
                                                                onInput={() => setShowDor(false)}
                                                                defaultChecked={!data.sensibilidade_dor}/>
                                                </div>
                                            </Form.Group>

                                            <Form.Group className="mb-3 col-lg-4">
                                                <Form.Label>Lesões/Nódulos</Form.Label>

                                                <div className="d-flex">
                                                    <Form.Check type="radio" name="lesoes_nodulos" value="true"
                                                                label="Sim"
                                                                className="me-2"
                                                                onInput={() => setShowLesoes(true)}
                                                                defaultChecked={data.lesoes_nodulos}
                                                                required/>
                                                    <Form.Check type="radio" name="lesoes_nodulos" value="false"
                                                                label="Não"
                                                                onInput={() => setShowLesoes(false)}
                                                                defaultChecked={!data.lesoes_nodulos}/>
                                                </div>
                                            </Form.Group>

                                            {
                                                showDor || showLesoes ?
                                                    <RegioesAfetadas title={titleRegioes} data={data}/> : <></>
                                            }

                                            <Form.Group className="mb-3 col-lg-12">
                                                <Form.Label>Apetite</Form.Label>

                                                <div className="d-flex flex-column flex-md-row">
                                                    {
                                                        apetites.map((value) => {
                                                            return (
                                                                <Form.Check
                                                                    type="radio"
                                                                    name="apetite"
                                                                    value={value}
                                                                    label={value}
                                                                    className="me-2"
                                                                    defaultChecked={value === data.apetite}
                                                                    required/>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </Form.Group>

                                            <Form.Group className="mb-3 col-lg-12">
                                                <Form.Label>Linfonodos</Form.Label>

                                                <div className="d-flex flex-column flex-md-row">
                                                    {
                                                        linfonodos.map((value) => {
                                                            return (
                                                                <Form.Check
                                                                    type="radio"
                                                                    name="linfonodos"
                                                                    value={value}
                                                                    label={value}
                                                                    className="me-2"
                                                                    defaultChecked={value === data.linfonodos}
                                                                    onInput={() => setShowOthersLinfonodos(value === "Outras")}/>
                                                            );
                                                        })
                                                    }
                                                </div>

                                                {showOthersLinfonodos ?
                                                    <Form.Control as="textarea" name="linfonodos_obs" rows={3}
                                                                  defaultValue={data.linfonodos_obs}
                                                                  placeholder="Observações"/> : <></>}
                                            </Form.Group>
                                        </Row>
                                    </fieldset>
                                </Modal.Body>

                                <Modal.Footer>
                                    {
                                        sendingForm ?
                                            (
                                                <>
                                                    <Button variant="outline-secondary" disabled>Voltar</Button>
                                                    <Button variant="outline-success" disabled>
                                                        <Spinner animation="grow" size="sm"/>
                                                    </Button>
                                                </>
                                            ) :
                                            (
                                                <>
                                                    <Button variant="secondary"
                                                            onClick={() => closeModal()}>Fechar</Button>
                                                    <Button variant="primary" type="submit">Salvar</Button>
                                                </>
                                            )
                                    }
                                </Modal.Footer>
                            </>
                        )
                    }
                </Components.FormSubmitContext.Consumer>

                <input type="hidden" name="animal" value={data.animal.id}/>
                <input type="hidden" name="tutor" value={data.tutor.id}/>
                <input type="hidden" name="veterinario" value={data.veterinario.id}/>
            </Components.FormSubmit>
        </Modal>
    );
}