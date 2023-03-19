import React from "react";
import {Container} from "react-bootstrap";
import {useSearchParams} from "react-router-dom";

import Layouts from "../../../../../layouts/Layouts";
import Components from "../../../../../components/Components";
import Item from "./components/Item";

export default function Listing(): JSX.Element {
    const [searchParams] = useSearchParams();
    const search = searchParams.get("search");

    return (
        <Layouts.RestrictedLayout>
            <Container>
                <Components.SearchBar/>

                <main>
                    <Components.Listing pathname={`tutor?search=${search}`} componentType={Item}/>
                </main>
            </Container>
        </Layouts.RestrictedLayout>
    );
}