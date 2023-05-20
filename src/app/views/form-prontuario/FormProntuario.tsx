import React, {createContext, useEffect, useState} from "react";
import {Card, Container, Row} from "react-bootstrap";

import Layouts from "../../layouts/Layouts";
import SinaisVitais from "./components/forms/SinaisVitais";

import "./form-prontuario.scss";
import ManifestacoesClinicas from "./components/forms/ManifestacoesClinicas";
import {Link, useParams} from "react-router-dom";
import SuspeitaDiagnostica from "./components/forms/SuspeitaDiagnostica";
import MedicacoesPrescritas from "./components/forms/MedicacoesPrescritas";
import MedicacoesUtilizadas from "./components/forms/MedicacoesUtilizadas";
import Exames from "./components/forms/Exames";
import Procedimentos from "./components/forms/Procedimentos";
import Contracts from "../../contracts/Contracts";
import axios from "axios";
import {ProntuarioPathVariables} from "./components/forms/types/ProntuarioPathVariables";
import Memory from "../../Memory";

type Status = "required" | "warning" | "ok";

interface Context {
    updateProntuarioData?: (data: Contracts.Prontuario) => void,
    setVitalSignsStatus?: (status: Status) => void,
    setDiagnosticSuspicionStatus?: (status: Status) => void,
    setClinicalManifestationsStatus?: (status: Status) => void
}

export const FormProntuarioContext = createContext<Context>({});

export default function FormProntuario() {
    const [modal, setModal] = useState<JSX.Element>(<></>);
    const [data, setData] = useState<Contracts.Prontuario>();
    const [vitalSignsStatus, setVitalSignsStatus] = useState<Status>("required");
    const [clinicalManifestationsStatus, setClinicalManifestationsStatus] = useState<Status>("warning");
    const [diagnosticSuspicionStatus, setDiagnosticSuspicionStatus] = useState<Status>("warning");

    const params = useParams<ProntuarioPathVariables>();

    useEffect(() => {
        if (!params.id)
            return;

        axios.get<Contracts.Prontuario>(`${process.env.REACT_APP_API_URL}/prontuario/${params.id}`, {headers: Memory.headers})
            .then(({data}) => {
                setData(data);

                setVitalSignsStatus("ok");
                setDiagnosticSuspicionStatus(data.supeita_diagnostica != null ? "ok" : "warning");
            })
            .catch(console.error);
    }, [params.id]);

    const closeModal = () => setModal(<></>);

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
            modal: <Procedimentos closeModal={closeModal}/>,
            status: vitalSignsStatus,
        },
        {
            title: "Manifestações Clínicas",
            modal: data ? <ManifestacoesClinicas closeModal={closeModal} data={data}/> : <></>,
            status: clinicalManifestationsStatus,
        },
        {
            title: "Histórico Clínico",
            link: "/painel/prontuario/historico-clinico/cadastrar",
            status: vitalSignsStatus,
        },
        {
            title: "Medicações Utilizadas",
            modal: <MedicacoesUtilizadas closeModal={closeModal}/>,
            status: vitalSignsStatus,
        },
        {
            title: "Suspeita Diagnóstica",
            modal: data ? <SuspeitaDiagnostica closeModal={closeModal} data={data}/> : <></>,
            status: diagnosticSuspicionStatus,
        },
        {
            title: "Medicações Prescritas",
            modal: <MedicacoesPrescritas closeModal={closeModal}/>,
            status: vitalSignsStatus,
        },
        {
            title: "Exames",
            modal: <Exames closeModal={closeModal}/>,
            status: vitalSignsStatus,
        },
    ];

    console.log(forms);

    return (
        <Layouts.RestrictedLayout>
            <main id="form-prontuario">
                <h1>Prontuário</h1>

                <FormProntuarioContext.Provider
                    value={{
                        updateProntuarioData: setData,
                        setVitalSignsStatus,
                        setDiagnosticSuspicionStatus,
                        setClinicalManifestationsStatus
                    }}>
                    <Container>
                        {
                            data ?
                                <Row className="summary mb-5 p-2">
                                    <span><b>Tutor: </b>{data.tutor.nome}</span>
                                    <span><b>Animal: </b>{data.animal.nome}</span>
                                    <span><b>Data do Atendimento: </b>{new Date().toLocaleDateString()}</span>
                                    <span><b>Veterinário: </b>{data.veterinario.nome}</span>
                                </Row> : <></>
                        }

                        <Row className="justify-content-between">

                            {
                                forms.map(({title, modal, link, status}, index) => {
                                    let className = "col-xs-12 col-md-6 p-2";

                                    if (index !== 0 && !data)
                                        className += " disabled";

                                    if (link?.length) {
                                        return (
                                            <div className={className} key={title}>
                                                <Link to={link} style={{textDecoration: "none", color: "black"}}>
                                                    <Card className="d-flex justify-content-center">
                                                        <Card.Title>
                                                            {title}
                                                            {status && badges[status]}
                                                        </Card.Title>
                                                    </Card>
                                                </Link>
                                            </div>
                                        );
                                    }

                                    return (
                                        <div className={className} key={title}>
                                            <Card className="d-flex justify-content-center"
                                                  onClick={() => setModal(modal ?? <></>)}>

                                                <Card.Title>{title} {status && badges[status]}</Card.Title>
                                            </Card>
                                        </div>
                                    );
                                })
                            }
                        </Row>
                    </Container>

                    <div>{modal}</div>
                </FormProntuarioContext.Provider>
            </main>
        </Layouts.RestrictedLayout>
    );
}