import Layouts from "../../layouts/Layouts";
import {Card, Container, Row} from "react-bootstrap";
import React, {useState} from "react";

import Vacinas from "./components/forms/Vacinas";
import Cirurgias from "./components/forms/Cirurgias";
import UltimasDoencas from "./components/forms/UltimasDoencas";
import Medicacoes from "./components/forms/Medicacoes";

export default function FormHistoricoClinico() {
    const [modal, setModal] = useState<JSX.Element>(<></>);
    const closeModal = () => setModal(<></>);

    const forms = [
        {
            title: "Vacinas",
            modal: <Vacinas closeModal={closeModal}/>
        },
        {
            title: "Últimas Doenças",
            modal: <UltimasDoencas closeModal={closeModal}/>
        },
        {
            title: "Histórico de Cirurgias",
            modal: <Cirurgias closeModal={closeModal}/>
        },
        {
            title: "Histórico de Medicações",
            modal: <Medicacoes closeModal={closeModal}/>
        },
    ];

    return (
        <Layouts.Layout>
            <main id="form-hisorico-clinico">
                <h1>Histórico Clínico</h1>

                <Container>
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
        </Layouts.Layout>
    );
}