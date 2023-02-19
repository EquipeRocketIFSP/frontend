import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";

import FormProntuario from "./views/form-prontuario/FormProntuario";

import "./certvet.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/fontawesome.min.css";
import "@fortawesome/fontawesome-free/css/solid.min.css";

export default function Certvet() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/painel/prontuario/cadastrar" element={<FormProntuario/>}/>
            </Routes>
        </BrowserRouter>
    );
}