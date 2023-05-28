import React, {useContext, useState} from "react";

import Contracts from "../../../../contracts/Contracts";
import {Button, Form, Modal, Row, Spinner} from "react-bootstrap";
import MultiGroups from "../../../../components/multi-groups/MultiGroups";
import Medications from "./components/medications/Medications";
import ProntuarioModalProps from "../types/ProntuarioModalProps";
import Components from "../../../../components/Components";
import {FormProntuarioContext} from "../../FormProntuario";
import axios from "axios";
import Memory from "../../../../Memory";

interface SubmitData {
    descricao: FormDataEntryValue,
    data: FormDataEntryValue,
    animal: FormDataEntryValue,
    tutor: FormDataEntryValue,
    veterinario: FormDataEntryValue,
    medicamentos: {
        medicamento: string,
        lote: string,
        dose: string
    }[]
}

export default function Cirurgias(props: ProntuarioModalProps) {
    const {closeModal, data} = props;
    const {updateProntuarioData, setSurgeriesStatus} = useContext(FormProntuarioContext);

    const [validationErrors, setValidationErrors] = useState<Contracts.DynamicObject<string>>({});
    const [dataStatus, setDataStatus] = useState<Contracts.FormStatus>("idle");

    if (!updateProntuarioData || !setSurgeriesStatus)
        throw new Error("updateProntuarioData or setSurgeriesStatus undefined");

    const onSubmit = async (formData: FormData) => {
        const submitData: SubmitData = {
            descricao: formData.get("descricao") ?? "",
            data: formData.get("data") ?? "",
            animal: formData.get("animal") ?? "",
            tutor: formData.get("tutor") ?? "",
            veterinario: formData.get("veterinario") ?? "",
            medicamentos: []
        };

        Array.from(document.querySelectorAll(`[data-form]`)).forEach((form) => {
            submitData.medicamentos.push({
                medicamento: (form.querySelector("input[name='medicamento']") as HTMLInputElement).value,
                dose: (form.querySelector("input[name='dose']") as HTMLInputElement).value,
                lote: (form.querySelector("input[name='lote']") as HTMLInputElement).value,
            });
        });

        const url = `${process.env.REACT_APP_API_URL}/prontuario/${data.id}/cirurgias`;
        const {data: response} = await axios.put<Contracts.Prontuario>(url, submitData, {headers: Memory.headers});

        updateProntuarioData(response);
        setSurgeriesStatus("ok");

        closeModal();
    }

    return (
        <Modal show={true} onHide={() => closeModal()} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Histórico de Cirurgias</Modal.Title>
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

                                    <Row>
                                        <Form.Group className="mb-3 col-lg-6">
                                            <Form.Label>Nome/Tipo de Cirurgia*</Form.Label>
                                            <Form.Control type="text" name="descricao"
                                                          defaultValue={data.cirurgia?.descricao} required/>
                                        </Form.Group>

                                        <Form.Group className="mb-3 col-lg-6">
                                            <Form.Label>Data*</Form.Label>
                                            <Form.Control type="datetime-local" name="data"
                                                          defaultValue={data.cirurgia?.data} required/>
                                        </Form.Group>
                                    </Row>

                                    <MultiGroups componentType={FormComponent}
                                                 componentPropsList={data.cirurgia?.medicamentos}/>
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

function FormComponent(props: { medicamento: Contracts.Medicamento, lote: Contracts.Estoque, dose: number }): JSX.Element {
    return (
        <div data-form="">
            <Medications {...props}/>
        </div>
    );
}