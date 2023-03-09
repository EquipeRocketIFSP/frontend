import Layouts from "../../layouts/Layouts";
import {Container, Row} from "react-bootstrap";
import React from "react";
import Storages from "../../Storages";

export default function Painel(): JSX.Element {
    const userData = Storages.userStorage.get();

    return (
        <Layouts.RestrictedLayout>
            <Container>
                <main id="painel">
                    <Row className="summary my-5 p-2">
                        <span>Seja bem-vindo(a), <b>{userData?.nome}</b></span>
                    </Row>
                </main>
            </Container>
        </Layouts.RestrictedLayout>
    );
}