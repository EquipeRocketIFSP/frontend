import React, {useLayoutEffect} from "react";
import {Link, Navigate, useLocation} from "react-router-dom";

import Layout from "./Layout";
import Storages from "../../Storages";
import Memory from "../../Memory";
import {Button, Form, Modal, Row} from "react-bootstrap";
import axios from "axios";

export default function RestrictedLayout(props: React.PropsWithChildren): JSX.Element {
    const location = useLocation();
    const userData = Storages.userStorage.get();

    useLayoutEffect(() => {
        Memory.headers.setAuthorization(`${userData?.type} ${userData?.token}`);
    }, [location]);

    if (!userData?.token.length) {
        Memory.headers.setAuthorization(null);

        return <Navigate to="/login"/>;
    }

    if (!Memory.hasTechnicalResponsible && location.pathname !== "/painel/funcionarios/adicionar") {
        const onSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
            evt.preventDefault();

            const form = new FormData(evt.currentTarget);

            await axios.put(`${process.env.REACT_APP_API_URL}/clinica/responsavel-tecnico`, form, {headers: Memory.headers});

            window.location.reload();
        }

        return (
            <Modal show size="lg" centered>
                <Modal.Header>
                    <Modal.Title>Responsável Técnico</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Quase lá! Só precisamos do cadastro de um responsável técnico.</p>

                    <Form onSubmit={onSubmit}>
                        <Row className="rounded border mb-3 pt-3">
                            <Form.Group className="mb-3 col-lg-6">
                                <Form.Label>CRMV*</Form.Label>
                                <Form.Control name="crmv" required/>
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-6 d-flex align-items-end">
                                <Button type="submit" className="w-100">Sou o responsável técnico</Button>
                            </Form.Group>
                        </Row>
                    </Form>

                    <Link to="/painel/funcionarios/adicionar">Cadastrar um responsável técnico</Link>
                </Modal.Body>
            </Modal>
        );
    }

    return (
        <Layout>
            {props.children}
        </Layout>
    );
}