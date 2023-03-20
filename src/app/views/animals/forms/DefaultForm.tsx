import React, {useEffect, useState} from "react";
import Layouts from "../../../layouts/Layouts";
import {Alert, Button, Container, Form, Row, Spinner} from "react-bootstrap";
import Select, {ActionMeta, MultiValue} from "react-select";
import {Link, Navigate, useParams} from "react-router-dom";
import axios, {AxiosError, AxiosHeaders, HttpStatusCode} from "axios";
import Contracts from "../../../contracts/Contracts";
import Storages from "../../../Storages";
import Components from "../../../components/Components";

type FormStatus = "idle" | "created" | "updated";

interface SubmitContext {
    url: string,
    formData: FormData,
    headers: AxiosHeaders,
    setDataStatus: (status: FormStatus) => void,
}

interface PathVariables extends Contracts.PathVariables {
    tutorId?: string
}

interface ReactSelectOption {
    value: number,
    label: string,
    isFixed: boolean
}

export default function DefaultForm(): JSX.Element {
    const [apiConnectionError, setApiConnectionError] = useState<string | null>(null);
    const [validationErrors, setValidationErrors] = useState<Contracts.DynamicObject<string>>({});
    const [animal, setAnimal] = useState<Contracts.Animal | null>(null);
    const [tutores, setTutores] = useState<Contracts.PersonalData[]>([]);
    const [selectedTutores, setSelectedTutores] = useState<ReactSelectOption[]>([]);
    const [dataStatus, setDataStatus] = useState<FormStatus>("idle");
    const [sendingForm, setSendingForm] = useState<boolean>(false);
    const [navigateToListing, setNavigateToListing] = useState<boolean>(false);
    const [searchTutor, setSearchTutor] = useState<string>("");
    const [timeoutRef, setTimeoutRef] = useState<NodeJS.Timer | null>(null);

    const userData = Storages.userStorage.get();
    const urlParams = useParams<PathVariables>();

    const headers = new AxiosHeaders()
        .setContentType("application/json")
        .setAuthorization(`${userData?.type} ${userData?.token}`);

    useEffect(() => {
        axios.get<Contracts.PaginetedResponse<Contracts.PersonalData>>(`${process.env.REACT_APP_API_URL}/tutor?buscar=${searchTutor}`, {headers})
            .then(async ({data: response}) => {
                if (!response.data.find(({id}) => id.toString() === urlParams.tutorId)) {
                    try {
                        const {data: dataTutor} = await axios.get<Contracts.PersonalData>(`${process.env.REACT_APP_API_URL}/tutor/${urlParams.tutorId}`, {headers})

                        response.data.push(dataTutor);
                    } catch (e) {
                        console.error(e);
                    }
                }

                const defaultTutor = response.data.find(({id}) => id.toString() === urlParams.tutorId);

                setTutores(response.data);

                if (defaultTutor && !selectedTutores.length)
                    setSelectedTutores([{value: defaultTutor.id, label: defaultTutor.nome, isFixed: true}]);
            })
            .catch(console.error);
    }, [searchTutor]);

    useEffect(() => {
        if (!urlParams.id || !userData)
            return;

        axios.get<Contracts.Animal>(`${process.env.REACT_APP_API_URL}/animal/${urlParams.id}`, {headers})
            .then(({data}) => setAnimal(data))
            .catch(console.error);
    }, []);

    const onSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();

        if (!userData)
            return;

        const errors: Contracts.DynamicObject<string> = {};

        setValidationErrors(errors);
        setDataStatus("idle");
        setSendingForm(true);

        const formData = new FormData(evt.currentTarget);

        selectedTutores.forEach(({value}) => formData.append("tutores[]", value.toString()));

        try {
            if (!urlParams.id) {
                await createOnSubmit({
                    url: `${process.env.REACT_APP_API_URL}/animal`,
                    formData, setDataStatus, headers
                }, setNavigateToListing);
            } else {
                await editOnSubmit({
                    url: `${process.env.REACT_APP_API_URL}/animal/${urlParams.id}`,
                    formData, setDataStatus, headers
                }, setAnimal);
            }
        } catch (e) {
            const response = (e as AxiosError).response;

            switch (response?.status) {
                case HttpStatusCode.BadRequest:
                    setValidationErrors(response.data as Contracts.DynamicObject<string>);
                    break;

                case HttpStatusCode.Unauthorized:
                case HttpStatusCode.Conflict:
                    setApiConnectionError(response.data as string);
                    break;

                default:
                    setApiConnectionError("Não foi possivel concluir essa operação");
                    break;
            }
        }

        setSendingForm(false);
    }

    const onInputChange = (value: string) => {
        if (timeoutRef) {
            clearTimeout(timeoutRef);
            setTimeoutRef(null);
        }

        const timer = setTimeout(() => setSearchTutor(value), 1000);
        setTimeoutRef(timer);
    }

    const onChange = (values: MultiValue<ReactSelectOption>, actionMeta: ActionMeta<ReactSelectOption>) => {
        if (actionMeta.removedValue && actionMeta.removedValue.isFixed)
            return;

        setSelectedTutores(values as ReactSelectOption[]);
    }

    if (navigateToListing)
        return <Navigate to={`/painel`}/>;

    if (!animal && urlParams.id)
        return <Components.LoadingScreen/>;

    const tutoresSelectOptions = tutores.map(({id, nome}) => {
        return {value: id, label: nome, isFixed: urlParams.tutorId === id.toString()}
    });

    return (
        <Layouts.Layout>
            <main id="form-animal">
                <h1>Dados do animal</h1>

                <Container>
                    <Form onSubmit={onSubmit}>
                        {dataStatus === "created" ?
                            <Alert variant="success">Cadastro efetuado com sucesso</Alert> : <></>}
                        {dataStatus === "updated" ?
                            <Alert variant="success">Dados alterados com sucesso</Alert> : <></>}

                        {apiConnectionError ? <Alert variant="danger">{apiConnectionError}</Alert> : <></>}

                        <Row>
                            <Form.Group className="mb-3 col-lg-12">
                                <Form.Label>Nome*</Form.Label>
                                <Form.Control name="nome" required/>
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-12">
                                <Form.Label>Tutores*</Form.Label>
                                <Select options={tutoresSelectOptions}
                                        placeholder="Selecione um ou mais tutores"
                                        isClearable={!tutoresSelectOptions.some(({isFixed}) => isFixed)}
                                        value={selectedTutores}
                                        onInputChange={(value) => onInputChange(value)}
                                        onChange={onChange}
                                        closeMenuOnSelect={false} isMulti required/>
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-4">
                                <Form.Label>Sexo*</Form.Label>
                                <Form.Select name="sexo" required>
                                    <option value="">- Selecione</option>
                                    <option value="MACHO">Macho</option>
                                    <option value="FEMEA">Fêmea</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-4">
                                <Form.Label>Idade*</Form.Label>
                                <Form.Control name="idade" min={1} type="number" required/>
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-4">
                                <Form.Label>Peso*</Form.Label>
                                <Form.Control name="peso" min={1} type="number" required/>
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-4">
                                <Form.Label>Especie*</Form.Label>
                                <Form.Control name="especie" required/>
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-4">
                                <Form.Label>Raça*</Form.Label>
                                <Form.Control name="raca" required/>
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-4">
                                <Form.Label>Pelagem*</Form.Label>
                                <Form.Control name="pelagem" required/>
                            </Form.Group>

                            {
                                sendingForm ?
                                    (
                                        <div className="d-flex justify-content-between">
                                            <Button variant="outline-secondary" disabled>Voltar</Button>
                                            <Button variant="outline-success" disabled><Spinner animation="grow"
                                                                                                size="sm"/></Button>
                                        </div>
                                    ) :
                                    (
                                        <div className="d-flex justify-content-between">
                                            <Link to={`/painel`}
                                                  className="btn btn-outline-secondary">Voltar</Link>
                                            <Button type="submit" variant="outline-success">Finalizar</Button>
                                        </div>
                                    )
                            }
                        </Row>
                    </Form>
                </Container>
            </main>
        </Layouts.Layout>
    );
}

async function createOnSubmit(context: SubmitContext, setNavigateToListing: (value: boolean) => void) {
    const {url, formData, headers, setDataStatus} = context;
    await axios.post(url, formData, {headers});

    setDataStatus("created");
    setTimeout(() => setNavigateToListing(true), 2000);
}

async function editOnSubmit(context: SubmitContext, setData: (data: Contracts.Animal) => void) {
    const {url, formData, headers, setDataStatus} = context;
    const {data} = await axios.put(url, formData, {headers});

    setData(data);
    setDataStatus("updated");
}