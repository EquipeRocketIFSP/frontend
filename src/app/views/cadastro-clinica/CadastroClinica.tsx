import Layouts from "../../layouts/Layouts";
import {Button, Container, Form, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import React, {useState} from "react";
import {Navigate} from "react-router-dom";
import Helpers from "../../helpers/Helpers";
import CEP from "../../components/cep/CEP";
import Contracts from "../../contracts/Contracts";
import UF from "../../components/uf/UF";
import Storages from "../../Storages";

export default function CadastroClinica(): JSX.Element {
    const [addressDetails, setAddressDetails] = useState<Contracts.ViaCEPAddress | null>(null);
    const [navigateToNextSection, setNavigateToNextSection] = useState<boolean>(false);

    const onSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();

        let data: Contracts.DynamicObject<string> = {};

        new FormData(evt.currentTarget)
            .forEach((value, key) => data[key] = value.toString());

        Storages.signInStorage.set({clinic: data, owner: {}});

        setNavigateToNextSection(true);
    }

    if (navigateToNextSection)
        return <Navigate to="dono"/>

    return (
        <Layouts.Layout>
            <main id="sign-in">
                <h1>Cadastro</h1>

                <Container>
                    <Form onSubmit={onSubmit}>
                        <Row className="rounded shadow mb-3 pt-3">
                            <Form.Group className="mb-3 col-lg-6">
                                <Form.Label htmlFor="clinica_nome_fantasia">Nome Fantasia*</Form.Label>
                                <Form.Control name="clinica_nome_fantasia" maxLength={255} id="clinica_nome_fantasia"
                                              required/>
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-6">
                                <Form.Label htmlFor="clinica_razao_social">Razão Social*</Form.Label>
                                <Form.Control name="clinica_razao_social" maxLength={255} id="clinica_razao_social"
                                              required/>
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-6">
                                <Form.Label htmlFor="clinica_cnpj">CNPJ*</Form.Label>
                                <Form.Control name="clinica_cnpj" maxLength={255} id="clinica_cnpj"
                                              onInput={Helpers.Masks.cnpj} required/>
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-6">
                                <Form.Label htmlFor="clinica_cnae">CNAE*</Form.Label>
                                <Form.Control name="clinica_cnae" maxLength={255} id="clinica_cnae" required/>
                            </Form.Group>
                        </Row>

                        <Row className="rounded shadow mb-3 pt-3">
                            <Form.Group className="mb-3 col-lg-2">
                                <CEP name="clinica_cep" setAddressDetails={setAddressDetails}/>
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-2">
                                <Form.Label htmlFor="clinica_numero">Número*</Form.Label>
                                <Form.Control name="clinica_numero" maxLength={6} id="clinica_numero"
                                              onInput={Helpers.Masks.number} required/>
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-4">
                                <Form.Label htmlFor="clinica_logradouro">Logradouro*</Form.Label>
                                <Form.Control name="clinica_logradouro" maxLength={255}
                                              defaultValue={addressDetails?.logradouro} id="clinica_logradouro"
                                              required/>
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-4">
                                <Form.Label htmlFor="clinica_bairro">Bairro*</Form.Label>
                                <Form.Control name="clinica_bairro" maxLength={255}
                                              defaultValue={addressDetails?.bairro} id="clinica_bairro" required/>
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-6">
                                <Form.Label htmlFor="clinica_cidade">Cidade*</Form.Label>
                                <Form.Control name="clinica_cidade" maxLength={255}
                                              defaultValue={addressDetails?.localidade} id="clinica_cidade" required/>
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-6">
                                <UF name="clinica_estado" defaultValue={addressDetails?.uf}/>
                            </Form.Group>
                        </Row>

                        <Row className="rounded shadow mb-3 pt-3">
                            <Form.Group className="mb-3 col-lg-4">
                                <Form.Label htmlFor="clinica_email">E-mail*</Form.Label>
                                <Form.Control name="clinica_email" maxLength={255} id="clinica_email" type="email"
                                              required/>
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-4">
                                <Form.Label htmlFor="clinica_celular">Celular*</Form.Label>
                                <Form.Control name="clinica_celular" maxLength={15} id="clinica_celular"
                                              onInput={Helpers.Masks.celphone} required/>
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-4">
                                <Form.Label htmlFor="clinica_telefone">Telefone</Form.Label>
                                <Form.Control name="clinica_telefone" maxLength={14} id="clinica_telefone"
                                              onInput={Helpers.Masks.phone}/>
                            </Form.Group>
                        </Row>

                        <div className="d-flex justify-content-between">
                            <Link to="/painel/animais" className="btn btn-outline-secondary">Voltar</Link>
                            <Button type="submit" variant="outline-primary">Continuar</Button>
                        </div>
                    </Form>
                </Container>
            </main>
        </Layouts.Layout>
    );
}