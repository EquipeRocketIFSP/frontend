import {Link, useSearchParams} from "react-router-dom";
import {Container} from "react-bootstrap";
import Components from "../../../../components/Components";
import React from "react";
import Layouts from "../../../../layouts/Layouts";
import Legend from "./components/Legend";
import Item from "./components/Item";

export default function Listing(): JSX.Element {
    const [searchParams] = useSearchParams();
    const search = searchParams.get("buscar");
    const page = searchParams.get("pagina") ?? "1";

    return (
        <Layouts.RestrictedLayout>
            <Container>
                <Components.Breadcrumbs>
                    <li className="breadcrumb-item"><Link to="/painel">Painel</Link></li>
                    <li className="breadcrumb-item active">Medicamentos</li>
                </Components.Breadcrumbs>

                <Components.SearchBar/>

                <h4>Medicamentos validos pela Anvisa</h4>

                <main>
                    <Components.Listing
                        pathname={!search ? `medicamento?pagina=${page}` : `medicamento?buscar=${search}&pagina=${page}`}
                        componentDesktopLegend={Legend}
                        componentItem={Item}/>
                </main>
            </Container>
        </Layouts.RestrictedLayout>
    );
}