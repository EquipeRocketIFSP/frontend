import {useParams} from "react-router-dom";
import Components from "../../../../components/Components";
import React from "react";
import Legend from "./components/Legend";
import Item from "./components/Item";
import Contracts from "../../../../contracts/Contracts";

interface PathVariables extends Contracts.PathVariables {
    medicationId: string
}

export default function Listing(): JSX.Element {
    const {id, medicationId} = useParams<PathVariables>();

    return (
        <>
            <h4>Transações</h4>

            <main>
                <Components.Listing
                    pathname={`medicamento/${medicationId}/estoque/${id}/transacoes`}
                    componentDesktopLegend={Legend}
                    componentItem={Item}/>
            </main>
        </>
    );
}