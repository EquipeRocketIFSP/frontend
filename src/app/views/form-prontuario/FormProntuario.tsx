import React, {useState} from "react";
import {Card, Container, Row} from "react-bootstrap";

import Layouts from "../../layouts/Layouts";
import SinaisVitais from "./components/forms/SinaisVitais";

import "./form-prontuario.scss";

export default function FormProntuario() {
    const [modal, setModal] = useState<JSX.Element>(<></>);
    const closeModal = () => setModal(<></>);

    const forms = [
        {
            title: "Sinais Vitais",
            modal: <SinaisVitais closeModal={closeModal}/>
        },
        {
            title: "Manifestações Clínicas"
        },
        {
            title: "Histórico Clinico"
        },
        {
            title: "Medicações Utilizadas"
        },
        {
            title: "Suspeita Diagnóstica"
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
        <Layouts.RestrictedLayout>
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
                            forms.map(({title, modal}) => {
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
        </Layouts.RestrictedLayout>
    );
}