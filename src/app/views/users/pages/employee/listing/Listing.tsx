import React from "react";
import {Container} from "react-bootstrap";
import {Link, useSearchParams} from "react-router-dom";

import Layouts from "../../../../../layouts/Layouts";
import Components from "../../../../../components/Components";
import Item from "./components/Item";
import Legend from "./components/Legend";

export default function Listing(): JSX.Element {
    const [searchParams] = useSearchParams();
    const search = searchParams.get("buscar");
    const page = searchParams.get("pagina") ?? "1";

    return (
        <Layouts.RestrictedLayout>
            <Container>
                <Components.Breadcrumbs>
                    <li className="breadcrumb-item"><Link to="/painel">Painel</Link></li>
                    <li className="breadcrumb-item active">Funcionários</li>
                </Components.Breadcrumbs>

                <Components.SearchBar/>

                <h4>Funcionários</h4>

                <main>
                    <Components.Listing
                        pathname={!search ? `funcionario?pagina=${page}` : `funcionario?buscar=${search}&pagina=${page}`}
                        componentDesktopLegend={Legend}
                        componentItem={Item}/>
                </main>
            </Container>
        </Layouts.RestrictedLayout>
    );
}