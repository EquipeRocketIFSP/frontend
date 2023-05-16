import React, {useState} from "react";
import {Button, Form, Modal, Row, Spinner} from "react-bootstrap";
import Contracts from "../../../../contracts/Contracts";
import Components from "../../../../components/Components";
import axios from "axios";
import Memory from "../../../../Memory";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import Helpers from "../../../../helpers/Helpers";
import {ProntuarioPathVariables} from "./types/ProntuarioPathVariables";

interface Props extends Contracts.CloseModal {
    data?: Contracts.Prontuario
}

export default function SinaisVitais(props: Props) {
    const {closeModal, data} = props;
    const params = useParams<ProntuarioPathVariables>();
    const navigate = useNavigate();
    const location = useLocation();
    const [validationErrors, setValidationErrors] = useState<Contracts.DynamicObject<string>>({});
    const [dataStatus, setDataStatus] = useState<Contracts.FormStatus>("idle");

    const pesoArray = data?.peso?.split(" ");

    const peso = pesoArray && pesoArray[0];
    const pesoMedida = pesoArray && pesoArray[1];

    const hidratacao = ["< 3s (leve)", ">= 3s (média)", "> 5s (severa)"];
    const tpc = ["< 2s", ">= 2s"];
    const mucosa = ["Rosácea", "Hiperemica", "Perolácea", "Ictérica", "Cianótica"];
    const estadoConciencia = ["Conciente", "Inconciente"];
    const escoreCorporal = ["Muito Abaixo do Peso", "Abaixo do Peso", "Normal", "Acima do Peso", "Muito Acima do Peso"];

    //Todo: incluir dados do animal na resposta da api

    const onSubmit = async (formData: FormData) => {
        const weight = `${formData.get("peso")} ${formData.get("unidade_medida_peso")}`;
        formData.set("peso", weight);

        const {data: response} = await axios.post<Contracts.Prontuario>(`${process.env.REACT_APP_API_URL}/prontuario`, formData, {headers: Memory.headers});
        const pathnames = location.pathname.split("/");

        pathnames.pop();
        pathnames.push(response.codigo);

        navigate(pathnames.join("/"));
        closeModal();
    }

    return (
        <Modal show={true} onHide={() => closeModal()} size="lg" centered>
            <Components.FormSubmit
                onSubmit={onSubmit}
                setDataStatus={setDataStatus}
                setValidationErrors={setValidationErrors}
                dataStatus={dataStatus}
                validationErrors={validationErrors}
            >
                <Components.FormSubmitContext.Consumer>
                    {({sendingForm}) => (
                        <>
                            <Modal.Header closeButton>
                                <Modal.Title>Sinais Vitais</Modal.Title>
                            </Modal.Header>

                            <Modal.Body>

                                <Row>
                                    <Form.Group className="mb-3 col-lg-4">
                                        <Form.Label htmlFor="frequencia_cardiaca">
                                            Frequência Cardiaca (BPN)*
                                        </Form.Label>
                                        <Form.Control type="number" name="frequencia_cardiaca" id="frequencia_cardiaca"
                                                      defaultValue={data?.frequencia_cardiaca}
                                                      required/>
                                    </Form.Group>

                                    <Form.Group className="mb-3 col-lg-4">
                                        <Form.Label htmlFor="frequencia_respiratoria">Frequência Repiratória
                                            (MPN)*</Form.Label>
                                        <Form.Control type="number" name="frequencia_respiratoria"
                                                      id="frequencia_respiratoria"
                                                      defaultValue={data?.frequencia_respiratoria}
                                                      required/>
                                    </Form.Group>

                                    <Form.Group className="mb-3 col-lg-4">
                                        <Form.Label htmlFor="temperatura">Temperatura (°C)*</Form.Label>
                                        <Form.Control type="number" name="temperatura" id="temperatura" min="0"
                                                      defaultValue={data?.temperatura} required/>
                                    </Form.Group>
                                </Row>

                                <Row>
                                    <Form.Group className="mb-3 col-10">
                                        <Form.Label htmlFor="peso">Peso*</Form.Label>
                                        <Form.Control type="number" name="peso" id="peso" min="0" step="0.01"
                                                      defaultValue={peso} required/>
                                    </Form.Group>

                                    <Form.Group className="mb-3 col-2 pt-4">
                                        <Form.Check type="radio" name="unidade_medida_peso" value="kg" label="kg"
                                                    className="me-2" defaultChecked={pesoMedida === "kg"} required/>
                                        <Form.Check type="radio" name="unidade_medida_peso" value="g" label="g"
                                                    defaultChecked={pesoMedida === "g"}/>
                                    </Form.Group>
                                </Row>

                                <Row>
                                    <Form.Group className="mb-3 col-lg-4">
                                        <Form.Label>Desidratação*</Form.Label>

                                        {hidratacao.map((value) => {
                                            return <Form.Check type="radio" name="hidratacao" value={value}
                                                               label={value} defaultChecked={data?.hidratacao === value}
                                                               required/>
                                        })}
                                    </Form.Group>

                                    <Form.Group className="mb-3 col-lg-4">
                                        <Form.Label>Tempo de Preenchimento Capilar (TPC)*</Form.Label>
                                        {tpc.map((value) =>
                                            <Form.Check type="radio" name="tpc" value={value} label={value}
                                                        defaultChecked={data?.tpc === value} required/>)}
                                    </Form.Group>

                                    <Form.Group className="mb-3 col-lg-4">
                                        <Form.Label>Mucosa*</Form.Label>

                                        {mucosa.map((value) =>
                                            <Form.Check type="radio" name="mucosa" value={value} label={value}
                                                        defaultChecked={data?.mucosa === value}
                                                        required/>)}
                                    </Form.Group>
                                </Row>

                                <Row>
                                    <Form.Group className="mb-3 col-lg-6">
                                        <Form.Label>Estado de Conciência*</Form.Label>

                                        {estadoConciencia.map((value) =>
                                            <Form.Check type="radio" name="conciencia" value={value} label={value}
                                                        defaultChecked={data?.conciencia === value} required/>)}
                                    </Form.Group>

                                    <Form.Group className="mb-3 col-lg-6">
                                        <Form.Label>Escore Corporal*</Form.Label>

                                        {escoreCorporal.map((value) =>
                                            <Form.Check type="radio" name="escore_corporal" value={value}
                                                        label={value} defaultChecked={data?.escore_corporal === value}
                                                        required/>)}
                                    </Form.Group>
                                </Row>


                                <input type="hidden" name="animal" value={params.animalId}/>
                                <input type="hidden" name="tutor" value={params.tutorId}/>
                                <input type="hidden" name="veterinario" value={Helpers.JWTData.getUserId()}/>

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
                                                <Button variant="secondary" onClick={() => closeModal()}>Fechar</Button>
                                                <Button variant="primary" type="submit">Salvar</Button>
                                            </>
                                        )
                                }
                            </Modal.Footer>
                        </>
                    )}
                </Components.FormSubmitContext.Consumer>
            </Components.FormSubmit>
        </Modal>
    );
}