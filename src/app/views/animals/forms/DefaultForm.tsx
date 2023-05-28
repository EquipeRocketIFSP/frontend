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
    const [notFound, setNotFound] = useState<boolean>(false);
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
                if (!response.data.find(({id}) => id.toString() === urlParams.tutorId) && !urlParams.id) {
                    try {
                        const {data: dataTutor} = await axios.get<Contracts.PersonalData>(`${process.env.REACT_APP_API_URL}/tutor/${urlParams.tutorId}`, {headers})

                        response.data.push(dataTutor);
                    } catch (e) {
                        console.error(e);
                    }
                }

                const defaultTutor = response.data.find(({id}) => id.toString() === urlParams.tutorId);

                setTutores(response.data);

                if (defaultTutor && !selectedTutores.length && !urlParams.id)
                    setSelectedTutores([{value: defaultTutor.id, label: defaultTutor.nome, isFixed: true}]);
            })
            .catch(console.error);
    }, [searchTutor]);

    useEffect(() => {
        if (!urlParams.id || !userData)
            return;

        axios.get<Contracts.Animal>(`${process.env.REACT_APP_API_URL}/tutor/${urlParams.tutorId}/animal/${urlParams.id}`, {headers})
            .then(({data}) => {
                setAnimal(data);
                setSelectedTutores(data.tutores.map((tutor) => {
                    return {value: tutor.id, label: tutor.nome, isFixed: false};
                }));
            })
            .catch(() => setNotFound(true));
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
                    url: `${process.env.REACT_APP_API_URL}/tutor/${urlParams.tutorId}/animal/${urlParams.id}`,
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

    if (notFound)
        return <Navigate to="/not-found"/>;

    if (navigateToListing)
        return <Navigate to={`/painel/tutores/${urlParams.tutorId}`}/>;

    if (!animal && urlParams.id)
        return <Components.LoadingScreen/>;

    const tutoresSelectOptions = tutores.map(({id, nome}) => {
        return {value: id, label: nome, isFixed: urlParams.tutorId === id.toString()}
    });

    const yearsSelectOptions = factoryYearsOption();

    return (
        <Layouts.RestrictedLayout>
            <main id="form-animal">
                <h1>Dados do animal</h1>

                <Container>
                    <Components.Breadcrumbs>
                        <li className="breadcrumb-item"><Link to="/painel">Painel</Link></li>
                        <li className="breadcrumb-item"><Link to="/painel/tutores">Tutores</Link></li>
                        <li className="breadcrumb-item"><Link to={"/painel/tutores/" + urlParams.tutorId}>Detalhes do
                            tutor</Link></li>

                        {
                            urlParams.id ?
                                <li className="breadcrumb-item">
                                    <Link to={"/painel/tutores/" + urlParams.tutorId + "/animais/" + urlParams.id}>Detalhes
                                        do Animal</Link>
                                </li> :
                                <></>
                        }

                        <li className="breadcrumb-item active">Dados do animal</li>
                    </Components.Breadcrumbs>

                    <Form onSubmit={onSubmit}>
                        {dataStatus === "created" ?
                            <Alert variant="success">Cadastro efetuado com sucesso</Alert> : <></>}
                        {dataStatus === "updated" ?
                            <Alert variant="success">Dados alterados com sucesso</Alert> : <></>}

                        {apiConnectionError ? <Alert variant="danger">{apiConnectionError}</Alert> : <></>}

                        <Row>
                            <Form.Group className="mb-3 col-lg-12">
                                <Form.Label>Nome*</Form.Label>
                                <Form.Control name="nome" defaultValue={animal?.nome} required/>
                                <Form.Text>{validationErrors["nome"] ?? ""}</Form.Text>
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

                                <Form.Text>{validationErrors["tutores"] ?? ""}</Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-4">
                                <Form.Label>Sexo*</Form.Label>
                                <Form.Select name="sexo" required>
                                    <option value="">- Selecione</option>
                                    <option value="MACHO" selected={animal?.sexo === "MACHO"}>Macho</option>
                                    <option value="FEMEA" selected={animal?.sexo === "FEMEA"}>Fêmea</option>
                                </Form.Select>
                                <Form.Text>{validationErrors["sexo"] ?? ""}</Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-4">
                                <Form.Label>Ano de nascimento*</Form.Label>

                                <Form.Select name="ano_nascimento" required>
                                    <option value="">- Selecione</option>

                                    {
                                        yearsSelectOptions.map((year) => (
                                            <option value={year}
                                                    key={year}
                                                    selected={animal?.ano_nascimento === year}>{year}</option>
                                        ))
                                    }
                                </Form.Select>

                                <Form.Text>{validationErrors["ano_nascimento"] ?? ""}</Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-4">
                                <Form.Label>Peso (kg)*</Form.Label>
                                <Form.Control name="peso" min={1} type="number" step="0.01" defaultValue={animal?.peso} required/>
                                <Form.Text>{validationErrors["peso"] ?? ""}</Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-4">
                                <Form.Label>Espécie*</Form.Label>
                                <Form.Control name="especie" maxLength={255} defaultValue={animal?.especie} required/>
                                <Form.Text>{validationErrors["especie"] ?? ""}</Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-4">
                                <Form.Label>Raça*</Form.Label>
                                <Form.Control name="raca" maxLength={255} defaultValue={animal?.raca} required/>
                                <Form.Text>{validationErrors["raca"] ?? ""}</Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-4">
                                <Form.Label>Pelagem*</Form.Label>
                                <Form.Control name="pelagem" maxLength={255} defaultValue={animal?.pelagem} required/>
                                <Form.Text>{validationErrors["pelagem"] ?? ""}</Form.Text>
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
                                            <Link
                                                to={
                                                    urlParams?.id ?
                                                        `/painel/tutores/${urlParams.tutorId}/animais/${urlParams?.id}` :
                                                        `/painel/tutores/${urlParams.tutorId}`
                                                }
                                                className="btn btn-outline-secondary">Voltar</Link>
                                            <Button type="submit" variant="outline-success">Finalizar</Button>
                                        </div>
                                    )
                            }
                        </Row>
                    </Form>
                </Container>
            </main>
        </Layouts.RestrictedLayout>
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

function factoryYearsOption(): number[] {
    const years: number[] = [];
    const present = new Date().getFullYear();
    const past = present - 20;

    for (let i = present; i >= past; i--)
        years.push(i);

    return years;
}
