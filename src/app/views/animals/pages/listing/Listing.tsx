import React from "react";
import {Container} from "react-bootstrap";
import {useParams, useSearchParams} from "react-router-dom";

import Components from "../../../../components/Components";
import Item from "./components/Item";
import Contracts from "../../../../contracts/Contracts";
import Legend from "./components/Legend";

export default function Listing() {
    const [searchParams] = useSearchParams();
    const search = searchParams.get("buscar");
    const page = searchParams.get("pagina") ?? "1";
    const urlParams = useParams<Contracts.PathVariables>();

    return (
        <Container>
            <Components.SearchBar
                btnAdd={{label: "Adicionar", href: `/painel/tutores/${urlParams.id}/animais/adicionar`}}/>

            <h4>Animais do tutor</h4>

            <main>
                <Components.Listing
                    pathname={!search ? `tutor/${urlParams.id}/animal?pagina=${page}` : `tutor/${urlParams.id}/animal?buscar=${search}&pagina=${page}`}
                    componentDesktopLegend={Legend}
                    componentItem={Item}/>
            </main>
        </Container>
    );
}