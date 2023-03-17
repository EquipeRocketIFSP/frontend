import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios, {AxiosError, AxiosHeaders, HttpStatusCode} from "axios";
import {Alert, Button, Container, Form, Row, Spinner} from "react-bootstrap";

import Layouts from "../../layouts/Layouts";
import Contracts from "../../contracts/Contracts";
import Memory from "../../Memory";
import Storages from "../../Storages";
import LoadingScreen from "../../components/loading-screen/LoadingScreen";
import Forms from "../../forms/Forms";

export default function FormTutores():JSX.Element{
    const [apiConnectionError, setApiConnectionError] = useState<string | null>(null);
    const [validationErrors, setValidationErrors] = useState<Contracts.DynamicObject<string>>({});
    const [usuario, setUsuario] = useState<Contracts.Funcionario | null>(null);
    const [dataUpdated, setDataUpdated] = useState<boolean>(false);
    const [sendingForm, setSendingForm] = useState<boolean>(false);

    const onSubmit=()=>{
        
    }

    return(
        <Layouts.Layout>
            <Container>
                <main id="form-edit-usuario" className="py-3">
                    <h1>Dados do tutor</h1>

                    <Form onSubmit={onSubmit}>
                        {dataUpdated ? <Alert variant="success">Dados alterados com sucesso</Alert> : <></>}

                        <Forms.Usuario
                            data={usuario}
                            validationErrors={validationErrors}
                            apiConnectionError={apiConnectionError}
                        />

                        {
                            sendingForm ?
                                (
                                    <div className="d-flex justify-content-between">
                                        <Button variant="outline-secondary" disabled>Voltar</Button>
                                        <Button variant="outline-success" disabled><Spinner animation="grow" size="sm"/></Button>
                                    </div>
                                ) :
                                (
                                    <div className="d-flex justify-content-between">
                                        <Link to="/painel" className="btn btn-outline-secondary">Voltar</Link>
                                        <Button type="submit" variant="outline-success">Finalizar</Button>
                                    </div>
                                )
                        }
                    </Form>
                </main>
            </Container>
        </Layouts.Layout>
    );
}