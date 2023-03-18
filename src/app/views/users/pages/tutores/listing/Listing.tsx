import React from "react";
import {Container} from "react-bootstrap";

import Layouts from "../../../../../layouts/Layouts";
import Components from "../../../../../components/Components";
import Item from "./components/Item";

export default function Listing(): JSX.Element {
    return (
        <Layouts.RestrictedLayout>
            <Container>
                <Components.SearchBar/>
                
                <main>
                    <Components.Listing pathname="tutor" componentType={Item}/>
                </main>
            </Container>
        </Layouts.RestrictedLayout>
    );
}