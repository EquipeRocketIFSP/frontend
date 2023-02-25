import React, {useState} from "react";
import {Card, Container, Row} from "react-bootstrap";

import Layouts from "../../layouts/Layouts";
import SinaisVitais from "./components/forms/SinaisVitais";

import "./form-prontuario.scss";
import ManifestacoesClinicas from "./components/forms/ManifestacoesClinicas";
import {Link} from "react-router-dom";
import Observations from "./components/forms/Observations";

export default function FormProntuario() {
    const [modal, setModal] = useState<JSX.Element>(<></>);
    const closeModal = () => setModal(<></>);

    const forms = [
        {
            title: "Sinais Vitais",
            modal: <SinaisVitais closeModal={closeModal}/>
        },
        {
            title: "Manifestações Clínicas",
            modal: <ManifestacoesClinicas closeModal={closeModal}/>
        },
        {
            title: "Histórico Clínico",
            link: "/painel/prontuario/historico-clinico/cadastrar"
        },
        {
            title: "Medicações Utilizadas"
        },
        {
            title: "Suspeita Diagnóstica",
            modal: <Observations title="Suspeita Diagnóstica" name="supeita_diagnostica" maxLength={20000}
                                 closeModal={closeModal}/>
        },
        {
            title: "Medicações Prescritas"
        },
        {
            title: "Exames"
        },
        {
            title: "Procedimentos"
        },
    ];

    return (
        <Layouts.Layout>
            <main id="form-prontuario">
                <h1>Prontuário</h1>

                <Container>
                    <Row className="summary-prontuario mb-5 p-2">
                        <span><b>Tutor: </b>Joe Doe</span>
                        <span><b>Animal: </b>Lil Cat</span>
                        <span><b>Data do Atendimento: </b>19/02/2023</span>
                        <span><b>Veterinário: </b>Doe</span>
                    </Row>

                    <Row className="justify-content-between">

                        {
                            forms.map(({title, modal, link}) => {
                                if (link?.length) {
                                    return (
                                        <div className="col-xs-12 col-md-6 p-2" key={title}>
                                            <Link to={link} style={{textDecoration: "none", color: "black"}}>
                                                <Card className="d-flex justify-content-center">
                                                    <Card.Title>{title}</Card.Title>
                                                </Card>
                                            </Link>
                                        </div>
                                    );
                                }

                                return (
                                    <div className="col-xs-12 col-md-6 p-2" key={title}>
                                        <Card className="d-flex justify-content-center"
                                              onClick={() => setModal(modal ?? <></>)}>

                                            <Card.Title>{title}</Card.Title>
                                        </Card>
                                    </div>
                                );
                            })
                        }

                    </Row>
                </Container>

                <div>{modal}</div>
            </main>
        </Layouts.Layout>
    );
}