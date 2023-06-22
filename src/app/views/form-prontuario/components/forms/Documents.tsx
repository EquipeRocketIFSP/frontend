import {Dropdown, DropdownButton, Row} from "react-bootstrap";
import axios, {AxiosHeaders} from "axios";
import Memory from "../../../../Memory";
import React from "react";
import {useParams} from "react-router-dom";
import {ProntuarioPathVariables} from "../types/ProntuarioPathVariables";
import Storages from "../../../../Storages";

export default function Documents(): JSX.Element {
    const params = useParams<ProntuarioPathVariables>();

    const download = async (type: string, fileName: string) => {
        const url = `${process.env.REACT_APP_API_URL}/documento/novo?tipo=${type}&prontuario=${params.id}`;
        const {data} = await axios.get(url, {headers: Memory.headers, responseType: "blob"});
        const href = window.URL.createObjectURL(new Blob([data]));
        const link = document.createElement("a");

        link.href = href;
        link.setAttribute("download", fileName + ".pdf");

        document.body.appendChild(link);

        link.click();
    }

    const downloadPrescricao = async (fileName: string) => {
        const userData = Storages.userStorage.get();

        if (!userData)
            return;

        const data = await (await fetch(`${process.env.REACT_APP_API_URL}/prontuario/prescricao/${params.id}`, {
            headers: {
                'Authorization': `${userData.type} ${userData.token}`,
                'Content-Type': 'application/pdf',
                'Accept': 'application/pdf'
            }
        })).blob();

        const href = window.URL.createObjectURL(new Blob([data]));
        const link = document.createElement("a");

        link.href = href;
        link.setAttribute("download", fileName + ".pdf");

        document.body.appendChild(link);

        link.click();
    }

    return (
        <div className="bg-light search-bar my-5 px-3 py-1">
            <Row>
                <DropdownButton id="dropdown-basic-button" title="Documentos">
                    <Dropdown.Item onClick={() => download("sanitario", "Atestado Sanitário")}>
                        Atestado Sanitário
                    </Dropdown.Item>

                    <Dropdown.Item onClick={() => downloadPrescricao("Prescrição")}>
                        Prescrição
                    </Dropdown.Item>

                    {/*<Dropdown.Item onClick={() => download("obito", "Atestado de Óbito")}>
                        Atestado de Óbito
                    </Dropdown.Item>

                    <Dropdown.Item onClick={() => download("exames", "Autorização de Realização de Exames")}>
                        Autorização de Realização de Exames
                    </Dropdown.Item>

                    <Dropdown.Item
                        onClick={() => download("terapeutico", "Autorização de Realização de Procediemento Terapêutico")}>
                        Autorização de Realização de Procediemento Terapêutico
                    </Dropdown.Item>

                    <Dropdown.Item onClick={() => download("retiraCorpo", "Termo de Retirada do Corpo do Animal")}>
                        Termo de Retirada do Corpo do Animal
                    </Dropdown.Item>

                    <Dropdown.Item onClick={() => download("cirurgia", "Autorização para Realização de Cirurgia")}>
                        Autorização para Realização de Cirurgia
                    </Dropdown.Item>

                    <Dropdown.Item
                        onClick={() => download("tratamentoClinico", "Autorização para Realização de Internação")}>
                        Autorização para Realização de Internação
                    </Dropdown.Item>

                    <Dropdown.Item onClick={() => download("anestesia", "Autorização para Realização de Anestesia")}>
                        Autorização para Realização de Anestesia
                    </Dropdown.Item>

                    <Dropdown.Item onClick={() => download("eutanasia", "Autorização para Realização de Eutanasia")}>
                        Autorização para Realização de Eutanasia
                    </Dropdown.Item>

                    <Dropdown.Item onClick={() => download("retiradaSemAlta", "Autorização para Retirada sem Alta")}>
                        Autorização para Retirada sem Alta
                    </Dropdown.Item>

                    <Dropdown.Item onClick={() => download("vacinacao", "Autorização para Vacinação")}>
                        Autorização para Vacinação
                    </Dropdown.Item>

                    <Dropdown.Item
                        onClick={() => download("doacaoPesquisa", "Autorização para Doação de Corpo do Animal")}>
                        Autorização para Doação de Corpo do Animal
                    </Dropdown.Item>*/}
                </DropdownButton>
            </Row>
        </div>
    );
}