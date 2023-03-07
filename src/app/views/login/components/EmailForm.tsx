import {Alert, Button, Form, Row, Spinner} from "react-bootstrap";
import {Link} from "react-router-dom";
import React, {useState} from "react";
import axios from "axios";
import Contracts from "../../../contracts/Contracts";

interface Props {
    setClinicas: (clinicas: Contracts.ClinicaFromDataLogin[]) => void,
    setEmail: (email: string) => void
}

export default function EmailForm(props: Props): JSX.Element {
    const {setClinicas, setEmail} = props;

    const [loading, setLoading] = useState<boolean>(false);
    const [apiConnectionError, setApiConnectionError] = useState<string | null>(null);

    const onSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();

        const formData = new FormData(evt.currentTarget);

        setLoading(true);

        try {
            const email = formData.get("email")?.toString() ?? "";
            const {data} = await axios.get<Contracts.ClinicaFromDataLogin[]>(`${process.env.REACT_APP_API_URL}/usuario/clinicas?email=${email}`);

            if(!data.length)
                setApiConnectionError("Nenhuma clínica encontrada");

            setClinicas(data);
            setEmail(email);
        } catch (e) {
            setClinicas([]);
            setApiConnectionError("Não foi possivel encontrar as clínicas. Por favor tente mais tarde.");
        }

        setLoading(false);
    }

    return (
        <Form className="col-lg-8" onSubmit={onSubmit}>
            {apiConnectionError ? <Alert variant="danger">{apiConnectionError}</Alert> : <></>}

            <Form.Group>
                <Form.Control type="email" name="email" placeholder="E-mail" required/>
            </Form.Group>

            <Row className="d-flex flex-column align-items-center mt-3">
                {
                    loading ?
                        <Button variant="primary" className="rounded w-50 disabled">
                            <Spinner animation="grow" size="sm"/>
                        </Button> :
                        <Button variant="primary" className="rounded w-50" type="submit">Avançar</Button>
                }
                <span className="my-2" style={{textAlign: "center"}}>ou</span>
                <Link to="/cadastro" className="btn btn-outline-secondary rounded w-50">Cadastrar-se</Link>
            </Row>
        </Form>
    );
}