import React from "react";
import {BrowserRouter} from "react-router-dom";
import Web from "./routes/Web";

import "./certvet.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/fontawesome.min.css";
import "@fortawesome/fontawesome-free/css/solid.min.css";

export default function Certvet() {
    return (
        <BrowserRouter>
            <Web/>
        </BrowserRouter>
    );
}