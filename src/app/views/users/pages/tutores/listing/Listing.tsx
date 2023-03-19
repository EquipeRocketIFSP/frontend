import React from "react";
import {Container} from "react-bootstrap";
import {useSearchParams} from "react-router-dom";

import Layouts from "../../../../../layouts/Layouts";
import Components from "../../../../../components/Components";
import Item from "./components/Item";

export default function Listing(): JSX.Element {
    const [searchParams] = useSearchParams();
    const search = searchParams.get("buscar");
    const page = searchParams.get("pagina") ?? "1";
    console.log(page);

    return (
        <Layouts.RestrictedLayout>
            <Container>
                <Components.SearchBar/>

                <main>
                    <Components.Listing
                        pathname={!search ? `tutor?pagina=${page}` : `tutor?buscar=${search}&pagina=${page}`}
                        componentType={Item}/>
                </main>
            </Container>
        </Layouts.RestrictedLayout>
    );
}