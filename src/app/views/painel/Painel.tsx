import Layouts from "../../layouts/Layouts";
import {Card, Container, Row} from "react-bootstrap";
import React from "react";
import Storages from "../../Storages";
import {Link} from "react-router-dom";
import Memory from "../../Memory";

export default function Painel(): JSX.Element {
    const userData = Storages.userStorage.get();

    const shortcuts = [
        {
            name: "Novo Funcionário",
            link: "/painel/funcionarios/adicionar",
            role: "ADMIN"
        },
        {
            name: "Novo Agendamento",
            link: "/painel/agenda/adicionar",
            role: "FUNCIONARIO"
        },
        {
            name: "Novo Tutor",
            link: "/painel/tutores/adicionar",
            role: "FUNCIONARIO"
        },
        {
            name: "Novo Medicamento",
            link: "/painel/medicamentos/adicionar",
            role: "VETERINARIO"
        }
    ];

    return (
        <Layouts.RestrictedLayout>
            <main id="painel">
                <Container>
                    <Row className="summary my-5 p-2">
                        <span>Seja bem-vindo(a), <b>{userData?.nome}</b></span>
                    </Row>

                    <Row className="justify-content-between">
                        {
                            shortcuts.map((shortcut) => {
                                if (!Memory.authorites.find((value) => value === shortcut.role))
                                    return <></>;

                                return (
                                    <Link to={shortcut.link} className="col-xs-12 col-md-6 p-2 text-decoration-none">
                                        <Card className="d-flex justify-content-center">
                                            <Card.Title className="text-center">{shortcut.name}</Card.Title>
                                        </Card>
                                    </Link>
                                );
                            })
                        }
                    </Row>
                </Container>
            </main>
        </Layouts.RestrictedLayout>
    );
}