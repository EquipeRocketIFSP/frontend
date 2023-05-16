import React, {createContext, useEffect, useState} from "react";
import {Card, Container, Row} from "react-bootstrap";

import Layouts from "../../layouts/Layouts";
import SinaisVitais from "./components/forms/SinaisVitais";

import "./form-prontuario.scss";
import ManifestacoesClinicas from "./components/forms/ManifestacoesClinicas";
import {Link, useParams} from "react-router-dom";
import Observations from "./components/forms/Observations";
import MedicacoesPrescritas from "./components/forms/MedicacoesPrescritas";
import MedicacoesUtilizadas from "./components/forms/MedicacoesUtilizadas";
import Exames from "./components/forms/Exames";
import Procedimentos from "./components/forms/Procedimentos";
import Storages from "../../Storages";
import Contracts from "../../contracts/Contracts";
import axios from "axios";
import {ProntuarioPathVariables} from "./components/forms/types/ProntuarioPathVariables";
import Memory from "../../Memory";

type Status = "required" | "warning" | "ok";

interface Context {
    setVitalSignsStatus?: (status: Status) => void,
}

export const FormProntuarioContext = createContext<Context>({});

export default function FormProntuario() {
    const [modal, setModal] = useState<JSX.Element>(<></>);
    const [data, setData] = useState<Contracts.Prontuario>();
    const [vitalSignsStatus, setVitalSignsStatus] = useState<Status>("required");

    const params = useParams<ProntuarioPathVariables>();

    useEffect(() => {
        if (!params.id)
            return;

        axios.get(`${process.env.REACT_APP_API_URL}/prontuario/${params.id}`, {headers: Memory.headers})
            .then(({data}) => {
                setData(data);
                setVitalSignsStatus("ok");
            })
            .catch(console.error);
    }, []);

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
            title: "Manifestações Clínicas",
            modal: <ManifestacoesClinicas closeModal={closeModal}/>,
            status: vitalSignsStatus,
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
            modal: <Observations title="Suspeita Diagnóstica" name="supeita_diagnostica" maxLength={20000}
                                 closeModal={closeModal}/>,
            status: vitalSignsStatus,
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
        {
            title: "Procedimentos",
            modal: <Procedimentos closeModal={closeModal}/>,
            status: vitalSignsStatus,
        },
    ];

    console.log(forms);

    return (
        <Layouts.RestrictedLayout>
            <main id="form-prontuario">
                <h1>Prontuário</h1>

                <Container>
                    {
                        data ?
                            <Row className="summary mb-5 p-2">
                                <span><b>Tutor: </b>Joe Doe</span>
                                <span><b>Animal: </b>Lil Cat</span>
                                <span><b>Data do Atendimento: </b>{new Date().toLocaleDateString()}</span>
                                <span><b>Veterinário: </b>{Storages.userStorage.get()?.nome}</span>
                            </Row> : <></>
                    }

                    <Row className="justify-content-between">
                        <FormProntuarioContext.Provider value={{setVitalSignsStatus}}>

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

                        </FormProntuarioContext.Provider>
                    </Row>
                </Container>

                <div>{modal}</div>
            </main>
        </Layouts.RestrictedLayout>
    );
}