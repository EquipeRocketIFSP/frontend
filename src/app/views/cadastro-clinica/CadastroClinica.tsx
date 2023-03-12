import Layouts from "../../layouts/Layouts";
import {Button, Container, Form} from "react-bootstrap";
import {Link} from "react-router-dom";
import React, {useState} from "react";
import {Navigate} from "react-router-dom";
import Contracts from "../../contracts/Contracts";
import Storages from "../../Storages";
import DynamicObject = Contracts.DynamicObject;
import Forms from "../../forms/Forms";

export default function CadastroClinica(): JSX.Element {
    const [navigateToNextSection, setNavigateToNextSection] = useState<boolean>(false);
    const [validationErrors, setValidationErrors] = useState<Contracts.DynamicObject<string>>({});

    const storedData = Storages.signInStorage.get();

    const onSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();

        let data: DynamicObject<any> = {};
        const formData = new FormData(evt.currentTarget);

        if (Object.keys(validationErrors).length) {
            setValidationErrors(validationErrors);
            return;
        }

        if (!formData.get("telefone")?.toString().trim().length)
            formData.delete("telefone");

        formData.forEach((value, key) => data[key] = value.toString());
        Storages.signInStorage.set(data as Contracts.Clinica);

        setNavigateToNextSection(true);
    }

    if (navigateToNextSection)
        return <Navigate to="dono"/>

    return (
        <Layouts.Layout>
            <main id="sign-in" className="p-5">
                <h1>Cadastrar Clínica</h1>

                <Container>
                    <Form onSubmit={onSubmit}>
                        <Forms.Clinica data={storedData} validationErrors={validationErrors}/>

                        <div className="d-flex justify-content-between">
                            <Link to="/login" className="btn btn-outline-secondary">Voltar</Link>
                            <Button type="submit" variant="outline-primary">Continuar</Button>
                        </div>
                    </Form>
                </Container>
            </main>
        </Layouts.Layout>
    );
}