import React from "react";
import {Container} from "react-bootstrap";

import Layouts from "../../layouts/Layouts";
import SearchBar from "../../components/search-bar/SearchBar";
import Listing from "../../components/listing/Listing";
import Item from "./components/Item";

export default function Tutores(): JSX.Element {
    return (
        <Layouts.RestrictedLayout>
            <Container>
                <SearchBar/>
                <main>
                    <Listing pathname="tutor" componentType={Item}/>
                </main>
            </Container>
        </Layouts.RestrictedLayout>
    );
}