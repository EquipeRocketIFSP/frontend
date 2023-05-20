import React, {useContext, useState} from "react";
import {Button, Form, Modal, Spinner} from "react-bootstrap";
import axios from "axios";
import Contracts from "../../../../contracts/Contracts";
import Components from "../../../../components/Components";
import Memory from "../../../../Memory";
import {FormProntuarioContext} from "../../FormProntuario";
import ProntuarioModalProps from "./types/ProntuarioModalProps";

export default function SuspeitaDiagnostica(props: ProntuarioModalProps) {
    const {closeModal, data} = props;
    const {updateProntuarioData, setDiagnosticSuspicionStatus} = useContext(FormProntuarioContext);
    const [validationErrors, setValidationErrors] = useState<Contracts.DynamicObject<string>>({});
    const [dataStatus, setDataStatus] = useState<Contracts.FormStatus>("idle");

    if (!updateProntuarioData || !setDiagnosticSuspicionStatus)
        throw new Error("updateProntuarioData or setDiagnosticSuspicionStatus undefined");

    const onSubmit = async (formData: FormData) => {
        const url = `${process.env.REACT_APP_API_URL}/prontuario/${data.id}/supeita-diagnostica`;
        const {data: response} = await axios.put<Contracts.Prontuario>(url, formData, {headers: Memory.headers});

        updateProntuarioData(response);
        setDiagnosticSuspicionStatus("ok");

        closeModal();
    }

    return (
        <Modal show={true} onHide={() => closeModal()} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Suspeita Diagnóstica</Modal.Title>
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
                                    <Form.Group className="mb-3 col-lg-12">
                                        <Form.Label htmlFor="supeita_diagnostica">Observações</Form.Label>
                                        <Form.Control as="textarea" name="supeita_diagnostica" id="supeita_diagnostica"
                                                      defaultValue={data.supeita_diagnostica}
                                                      maxLength={2000}/>
                                    </Form.Group>
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

                <input type="hidden" name="animal" value={data?.animal.id}/>
                <input type="hidden" name="tutor" value={data?.tutor.id}/>
                <input type="hidden" name="veterinario" value={data?.veterinario.id}/>
            </Components.FormSubmit>
        </Modal>
    );
}