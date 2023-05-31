import {Button, Form, Modal, Row, Spinner} from "react-bootstrap";
import React, {useContext, useState} from "react";
import Contracts from "../../../../contracts/Contracts";
import MultiGroups from "../../../../components/multi-groups/MultiGroups";
import Components from "../../../../components/Components";
import axios from "axios";
import Memory from "../../../../Memory";
import ProntuarioModalProps from "../types/ProntuarioModalProps";
import {FormProntuarioContext} from "../../FormProntuario";

export default function MedicacoesPrescritas(props: ProntuarioModalProps) {
    const {closeModal, data} = props;
    const {updateProntuarioData, setPrescriptionsStatus} = useContext(FormProntuarioContext);

    const [validationErrors, setValidationErrors] = useState<Contracts.DynamicObject<string>>({});
    const [dataStatus, setDataStatus] = useState<Contracts.FormStatus>("idle");

    if (!updateProntuarioData || !setPrescriptionsStatus)
        throw new Error("updateProntuarioData or setPrescriptionsStatus undefined");

    const onSubmit = async (formData: FormData) => {
        const submitData: Record<string, any> = {
            animal: formData.get("animal") ?? "",
            tutor: formData.get("tutor") ?? "",
            veterinario: formData.get("veterinario") ?? "",
            medicacoes_prescritas: []
        };

        Array.from(document.querySelectorAll(`[data-form]`)).forEach((form) => {
            submitData.medicacoes_prescritas.push({
                nome: (form.querySelector("[name='nome']") as HTMLInputElement).value,
                dose: (form.querySelector("[name='dose']") as HTMLInputElement).value,
                uso: (form.querySelector("[name='uso']") as HTMLInputElement).value,
                forma_farmaceutica: (form.querySelector("[name='forma_farmaceutica']") as HTMLInputElement).value,
                concentracao: (form.querySelector("[name='concentracao']") as HTMLInputElement).value,
                frequencia: (form.querySelector("[name='frequencia']") as HTMLInputElement).value,
                duracao: (form.querySelector("[name='duracao']") as HTMLInputElement).value,
                quando_aplicar: (form.querySelector("[name='quando_aplicar']") as HTMLInputElement).value,
                observacoes: (form.querySelector("[name='observacoes']") as HTMLInputElement).value,
            });
        });

        const url = `${process.env.REACT_APP_API_URL}/prontuario/prescricao/${data.codigo}`;

        await axios.delete(url, {headers: Memory.headers});
        const {data: response} = await axios.post(url, submitData, {headers: Memory.headers});

        data.prescricoes = response.medicacoes_prescritas;

        updateProntuarioData(data);
        setPrescriptionsStatus("ok");

        closeModal();
    }

    return (
        <Modal show={true} onHide={() => closeModal()} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Medicações Prescritas</Modal.Title>
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
                                    <MultiGroups componentType={FormComponent} componentPropsList={data.prescricoes}/>
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

function FormComponent(props: Contracts.Prescricao) {
    const [whenToApply, setWhenToApply] = useState<string>(props.quando_aplicar ?? "");

    const whenToApplyValues = [
        "Em Jejum",
        "Após Alimentação",
        "Junto do Alimento"
    ];

    const use = [
        "Oral",
        "Tópico",
        "Oftalmico",
        "ETC"
    ];

    const frequency = [
        "1x/dia - SID - cd 24h",
        "2x/dia - BID - cd 12h",
        "3x/dia - TID - cd 8h",
        "4x/dia - QID - cd 6h"
    ];

    return (
        <Row data-form="">
            <Form.Group className="mb-3 col-lg-6">
                <Form.Label>Uso*</Form.Label>
                <Form.Select name="uso" required>
                    <option value="">- Selecione</option>

                    {
                        use.map((value) => {
                            return <option value={value} selected={value == props.uso}>{value}</option>;
                        })
                    }
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3 col-lg-6">
                <Form.Label>Nome*</Form.Label>
                <Form.Control type="text" name="nome" defaultValue={props.nome} required/>
            </Form.Group>

            <Form.Group className="mb-3 col-lg-4">
                <Form.Label>Dose*</Form.Label>
                <Form.Control type="text" name="dose" defaultValue={props.dose} placeholder="ml, mg, g, ul, comp"
                              required/>
            </Form.Group>

            <Form.Group className="mb-3 col-lg-4">
                <Form.Label>Forma Farmaceutica*</Form.Label>
                <Form.Control type="text" name="forma_farmaceutica"
                              placeholder="Comprimido, Xarope, Gotas, etc..." defaultValue={props.forma_farmaceutica}
                              required/>
            </Form.Group>

            <Form.Group className="mb-3 col-lg-4">
                <Form.Label>Concentração*</Form.Label>
                <Form.Control type="text" name="concentracao" defaultValue={props.concentracao} required/>
            </Form.Group>

            <Form.Group className="mb-3 col-lg-6">
                <Form.Label>Frequência*</Form.Label>
                <Form.Select name="frequencia" required>
                    <option value="">-Selecione</option>

                    {
                        frequency.map((value) => {
                            return <option value={value} selected={value == props.frequencia}>{value}</option>;
                        })
                    }
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3 col-lg-6">
                <Form.Label>Duração*</Form.Label>
                <Form.Control type="text" name="duracao" placeholder="Dose única, durante x dias"
                              defaultValue={props.duracao} required/>
            </Form.Group>

            <Form.Group className="mb-3 col-lg-12">
                <Form.Label>Quando Aplicar*</Form.Label>

                {
                    whenToApplyValues.map((value) =>
                        <Form.Check type="radio" label={value} checked={whenToApply === value} key={value}
                                    onChange={() => setWhenToApply(value)}/>
                    )
                }
            </Form.Group>

            <Form.Group className="mb-3 col-lg-12">
                <Form.Label>Observações</Form.Label>
                <Form.Control type="text" as="textarea" name="observacoes" rows={3}
                              defaultValue={props.observacoes ?? undefined}/>
            </Form.Group>

            <input type="hidden" name="quando_aplicar" defaultValue={whenToApply}/>
        </Row>
    );
}