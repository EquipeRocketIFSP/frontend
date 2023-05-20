import React from "react";
import {useParams, useSearchParams} from "react-router-dom";

import Components from "../../../../components/Components";
import Item from "./components/Item";
import Contracts from "../../../../contracts/Contracts";
import Legend from "./components/Legend";

interface PathVariables extends Contracts.PathVariables {
    tutorId?: string
}

export default function Listing() {
    const [searchParams] = useSearchParams();
    const search = searchParams.get("buscar");
    const page = searchParams.get("pagina") ?? "1";
    const urlParams = useParams<PathVariables>();

    return (
        <>
            <h4 style={{textAlign: "center"}}>Prontuários</h4>

            <main>
                <Components.Listing
                    pathname={`tutor/${urlParams.tutorId}/animal/${urlParams.id}/prontuarios?pagina=${page}${search ? `&buscar=${search}` : ''}`}
                    componentDesktopLegend={Legend}
                    componentItem={Item}/>
            </main>
        </>
    );
}