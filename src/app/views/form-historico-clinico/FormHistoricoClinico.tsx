import Layouts from "../../layouts/Layouts";
import {Card, Container, Row} from "react-bootstrap";
import React, {useState} from "react";

import Observations from "./components/forms/Observations";
import Vacinas from "./components/forms/Vacinas";

export default function FormHistoricoClinico() {
    const [modal, setModal] = useState<JSX.Element>(<></>);
    const closeModal = () => setModal(<></>);

    const forms = [
        {
            title: "Vacinas",
            modal: <Vacinas closeModal={closeModal}/>
        },
        {
            title: "Ultimas Doenças",
            modal: <Observations closeModal={closeModal} name="ultimas_doencas" title="Ultimas Doenças" maxLength={255}/>
        },
        {
            title: "Cirurgias",
            modal: <Observations closeModal={closeModal} name="cirurgias" title="Cirurgias" maxLength={255}/>
        },
        {
            title: "Medicações",
            modal: <Observations closeModal={closeModal} name="medicacoes" title="Medicações" maxLength={255}/>
        },
    ];

    return (
        <Layouts.RestrictedLayout>
            <main id="form-hisorico-clinico">
                <h1>Histórico Clinico</h1>

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
        </Layouts.RestrictedLayout>
    );
}