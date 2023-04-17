import {useParams, useSearchParams} from "react-router-dom";
import Contracts from "../../../../contracts/Contracts";
import {Container} from "react-bootstrap";
import Components from "../../../../components/Components";
import Legend from "../../../animals/pages/listing/components/Legend";
import Item from "../../../animals/pages/listing/components/Item";
import React from "react";
import Layouts from "../../../../layouts/Layouts";

export default function Listing(): JSX.Element {
    const [searchParams] = useSearchParams();
    const search = searchParams.get("buscar");
    const page = searchParams.get("pagina") ?? "1";
    const urlParams = useParams<Contracts.PathVariables>();

    return (
        <Layouts.RestrictedLayout>
            <Container>
                <Components.SearchBar/>

                <h4>Medicamentos validados no sistema</h4>

                <main>
                    <Components.Listing
                        pathname={!search ? `tutor/${urlParams.id}/animal?pagina=${page}` : `tutor/${urlParams.id}/animal?buscar=${search}&pagina=${page}`}
                        componentDesktopLegend={Legend}
                        componentItem={Item}/>
                </main>
            </Container>
        </Layouts.RestrictedLayout>
    );
}