import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";

import "./certvet.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/fontawesome.min.css";
import "@fortawesome/fontawesome-free/css/solid.min.css";

import Animais from "./views/animais/Animais";
import FormProntuario from "./views/form-prontuario/FormProntuario";
import FormHistoricoClinico from "./views/form-historico-clinico/FormHistoricoClinico";
import FormAnimal from "./views/form-animal/FormAnimal";
import Animal from "./views/animal/Animal";
import CadastroClinica from "./views/cadastro-clinica/CadastroClinica";
import CadastroClinicaDono from "./views/cadastro-clinica-dono/CadastroClinicaDono";

export default function Certvet() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/cadastro" element={<CadastroClinica/>}/>
                <Route path="/cadastro/dono" element={<CadastroClinicaDono/>}/>

                <Route path="/painel/animais" element={<Animais/>}/>
                <Route path="/painel/animais/1" element={<Animal/>}/>
                <Route path="/painel/animais/adicionar" element={<FormAnimal/>}/>
                <Route path="/painel/prontuario/cadastrar" element={<FormProntuario/>}/>
                <Route path="/painel/prontuario/historico-clinico/cadastrar" element={<FormHistoricoClinico/>}/>
            </Routes>
        </BrowserRouter>
    );
}