import {Link, useParams, useSearchParams} from "react-router-dom";
import {Container} from "react-bootstrap";
import Components from "../../../../components/Components";
import React from "react";
import Layouts from "../../../../layouts/Layouts";
import Legend from "./components/Legend";
import Item from "./components/Item";
import Contracts from "../../../../contracts/Contracts";

export default function Listing(): JSX.Element {
    const [searchParams] = useSearchParams();
    const search = searchParams.get("buscar");
    const page = searchParams.get("pagina") ?? "1";
    const {id: medicationId} = useParams<Contracts.PathVariables>();

    return (
        <>
            <Components.SearchBar disableSearch btnAdd={{label: "Novo Lote", href: "adicionar"}}/>

            <h4>Estoques/Lotes</h4>

            <main>
                <Components.Listing
                    pathname={!search ? `medicamento/${medicationId}/estoque?pagina=${page}` : `medicamento/${medicationId}/estoque?buscar=${search}&pagina=${page}`}
                    componentDesktopLegend={Legend}
                    componentItem={Item}/>
            </main>
        </>
    );
}