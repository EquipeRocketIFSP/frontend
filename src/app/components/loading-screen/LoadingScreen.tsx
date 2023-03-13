import React from "react";
import {Container, Spinner} from "react-bootstrap";

import Layouts from "../../layouts/Layouts";

import "./loading-screen.scss";

export default function LoadingScreen(): JSX.Element {
    return (
        <Layouts.RestrictedLayout>
            <Container>
                <main>
                    <div className="loading-form d-flex justify-content-center align-items-center">
                        <Spinner/>
                    </div>
                </main>
            </Container>
        </Layouts.RestrictedLayout>
    );
}