import React, {createContext, useEffect, useState} from "react";
import {Alert, Button, Card, Container, Form, Row} from "react-bootstrap";
import {Link, useParams} from "react-router-dom";
import axios, {AxiosError, HttpStatusCode} from "axios";

import SinaisVitais from "./components/forms/SinaisVitais";
import SuspeitaDiagnostica from "./components/forms/SuspeitaDiagnostica";
import MedicacoesPrescritas from "./components/forms/MedicacoesPrescritas";
import Exames from "./components/forms/Exames";
import Procedimentos from "./components/forms/Procedimentos";
import ManifestacoesClinicas from "./components/forms/ManifestacoesClinicas";
import Cirurgias from "./components/forms/Cirurgias";

import Documents from "./components/forms/Documents";

import {ProntuarioPathVariables} from "./components/types/ProntuarioPathVariables";

import Layouts from "../../layouts/Layouts";
import Contracts from "../../contracts/Contracts";
import Memory from "../../Memory";

import "./form-prontuario.scss";

type Status = "required" | "warning" | "ok";

interface Context {
    updateProntuarioData?: (data: Contracts.Prontuario) => void,
    setVitalSignsStatus?: (status: Status) => void,
    setProcedimentsStatus?: (status: Status) => void,
    setSurgeriesStatus?: (status: Status) => void,
    setDiagnosticSuspicionStatus?: (status: Status) => void,
    setClinicalManifestationsStatus?: (status: Status) => void,
    setExamsStatus?: (status: Status) => void
}

export const FormProntuarioContext = createContext<Context>({});

export default function FormProntuario() {
    const [modal, setModal] = useState<JSX.Element>(<></>);
    const [data, setData] = useState<Contracts.Prontuario>();
    const [formStatus, setFormStatus] = useState<"idle" | "loading" | "sent">("idle");
    const [apiConnectionError, setApiConnectionError] = useState<string>();

    const [vitalSignsStatus, setVitalSignsStatus] = useState<Status>("required");
    const [procedimentsStatus, setProcedimentsStatus] = useState<Status>("required");
    const [clinicalManifestationsStatus, setClinicalManifestationsStatus] = useState<Status>("required");
    const [surgeriesStatus, setSurgeriesStatus] = useState<Status>("warning");
    const [diagnosticSuspicionStatus, setDiagnosticSuspicionStatus] = useState<Status>("warning");
    const [examsStatus, setExamsStatus] = useState<Status>("warning");

    const params = useParams<ProntuarioPathVariables>();

    useEffect(() => {
        if (!params.id)
            return;

        axios.get<Contracts.Prontuario>(`${process.env.REACT_APP_API_URL}/prontuario/${params.id}`, {headers: Memory.headers})
            .then(({data}) => {
                setData(data);

                setVitalSignsStatus("ok");
                setProcedimentsStatus(data.procedimentos.length ? "ok" : "required");
                setSurgeriesStatus(data.cirurgia ? "ok" : "warning");
                setClinicalManifestationsStatus(data.apetite?.length ? "ok" : "required");
                setDiagnosticSuspicionStatus(data.supeita_diagnostica != null ? "ok" : "warning");
                setExamsStatus(data.exames.length ? "ok" : "warning");
            })
            .catch(console.error);
    }, [params.id]);

    const closeModal = () => setModal(<></>);

    const onSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();

        try {
            setFormStatus("loading");

            const {data: response} = await axios.put<Contracts.Prontuario>(`${process.env.REACT_APP_API_URL}/prontuario/${data?.id}/finalizar`, new FormData(evt.currentTarget), {headers: Memory.headers});

            setFormStatus("sent");
            setData(response);
        } catch (e) {
            const response = (e as AxiosError).response;

            switch (response?.status) {
                case HttpStatusCode.Unauthorized:
                case HttpStatusCode.Forbidden:
                case HttpStatusCode.Conflict:
                    setApiConnectionError(response.data as string);
                    break;

                default:
                    setApiConnectionError("Não foi possivel concluir essa operação");
                    break;
            }

            setFormStatus("idle");
        }
    }

    const badges: Record<Status, JSX.Element> = {
        "required": <i className="fa-regular fa-circle-exclamation text-danger p-1 mx-1"></i>,
        "warning": <i className="fa-regular fa-triangle-exclamation text-warning p-1 mx-1"></i>,
        "ok": <i className="fa-regular fa-circle-check text-success p-1 mx-1"></i>,
    }

    const forms = [
        {
            title: "Sinais Vitais",
            modal: <SinaisVitais closeModal={closeModal} data={data}/>,
            status: vitalSignsStatus,
        },
        {
            title: "Procedimentos",
            modal: data ? <Procedimentos closeModal={closeModal} data={data}/> : <></>,
            status: procedimentsStatus,
        },
        {
            title: "Manifestações Clínicas",
            modal: data ? <ManifestacoesClinicas closeModal={closeModal} data={data}/> : <></>,
            status: clinicalManifestationsStatus,
        },
        {
            title: "Suspeita Diagnóstica",
            modal: data ? <SuspeitaDiagnostica closeModal={closeModal} data={data}/> : <></>,
            status: diagnosticSuspicionStatus,
        },
        {
            title: "Cirurgias",
            modal: data ? <Cirurgias closeModal={closeModal} data={data}/> : <></>,
            status: surgeriesStatus,
        },
        {
            title: "Exames",
            modal: data ? <Exames closeModal={closeModal} data={data}/> : <></>,
            status: examsStatus,
        },
        {
            title: "Medicações Prescritas",
            modal: <MedicacoesPrescritas closeModal={closeModal}/>,
            status: vitalSignsStatus,
        },
    ];

    return (
        <Layouts.RestrictedLayout>
            <main id="form-prontuario">
                <h1>Prontuário</h1>

                <FormProntuarioContext.Provider
                    value={{
                        updateProntuarioData: setData,
                        setVitalSignsStatus,
                        setProcedimentsStatus,
                        setSurgeriesStatus,
                        setDiagnosticSuspicionStatus,
                        setClinicalManifestationsStatus,
                        setExamsStatus
                    }}>
                    <Container>
                        {
                            data ?
                                <Row className="summary mb-5 p-2">
                                    <span><b>Tutor: </b>{data.tutor.nome}</span>
                                    <span><b>Animal: </b>{data.animal.nome}</span>
                                    <span><b>Veterinário: </b>{data.veterinario.nome}</span>

                                    {
                                        data.data_atendimento ?
                                            <span><b>Data do Atendimento: </b>{new Date(data.data_atendimento).toLocaleDateString('pt-BR')}</span> : <></>
                                    }
                                </Row> : <></>
                        }

                        <Documents/>

                        {formStatus === "sent" ? <Alert variant="success">Prontuário concluído</Alert> : <></>}
                        {apiConnectionError ? <Alert variant="danger">{apiConnectionError}</Alert> : <></>}

                        <Row className="justify-content-between">

                            {
                                forms.map(({title, modal, status}, index) => {
                                    let className = "col-xs-12 col-md-6 p-2";

                                    if (index !== 0 && !data)
                                        className += " disabled";

                                    return (
                                        <div className={className} key={title}>
                                            <Card className="d-flex justify-content-center"
                                                  onClick={() => setModal(modal)}>

                                                <Card.Title>{title} {status && badges[status]}</Card.Title>
                                            </Card>
                                        </div>
                                    );
                                })
                            }
                        </Row>

                        {
                            vitalSignsStatus === "ok" && procedimentsStatus === "ok" && clinicalManifestationsStatus === "ok" ?
                                <Form className="d-flex justify-content-between" onSubmit={onSubmit}>
                                    {
                                        formStatus === "idle" ?
                                            <>
                                                <Link className="btn btn-outline-secondary"
                                                      to={`/painel/tutores/${params.tutorId}/animais/${params.animalId}`}>
                                                    Voltar
                                                </Link>
                                                <Button variant="outline-success" type="submit">Concluir</Button>
                                            </> : <></>
                                    }

                                    <input type="hidden" name="animal" value={data?.animal.id}/>
                                    <input type="hidden" name="tutor" value={data?.tutor.id}/>
                                    <input type="hidden" name="veterinario" value={data?.veterinario.id}/>
                                </Form> : <></>
                        }
                    </Container>

                    <div>{modal}</div>
                </FormProntuarioContext.Provider>
            </main>
        </Layouts.RestrictedLayout>
    );
}