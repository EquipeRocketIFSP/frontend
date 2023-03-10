import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";

import "./certvet.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/fontawesome.min.css";
import "@fortawesome/fontawesome-free/css/solid.min.css";

import Animais from "./views/animais/Animais";
import FormProntuario from "./views/form-prontuario/FormProntuario";
import FormHistoricoClinico from "./views/form-historico-clinico/FormHistoricoClinico";
import Agenda from "./views/agenda/Agenda";
import FormAnimal from "./views/form-animal/FormAnimal";
import Animal from "./views/animal/Animal";
import CadastroClinica from "./views/cadastro-clinica/CadastroClinica";
import CadastroClinicaDono from "./views/cadastro-clinica-dono/CadastroClinicaDono";
import Login from "./views/login/Login";
import Painel from "./views/painel/Painel";
import RedefinePassword from "./views/redefine-password/RedefinePassword";
import Home from "./views/home/Home";
import Clinica from "./views/clinica/Clinica";

export default function Certvet() {
    return (
        <BrowserRouter>
            <Routes>
                
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/redefinir-senha" element={<RedefinePassword/>}/>
                <Route path="/cadastro" element={<CadastroClinica/>}/>
                <Route path="/cadastro/dono" element={<CadastroClinicaDono/>}/>

                <Route path="/painel" element={<Painel/>}/>
                <Route path="/painel/animais" element={<Animais/>}/>
                <Route path="/painel/animais/1" element={<Animal/>}/>
                <Route path="/painel/animais/adicionar" element={<FormAnimal/>}/>
                <Route path="/painel/prontuario/cadastrar" element={<FormProntuario/>}/>
                <Route path="/painel/prontuario/historico-clinico/cadastrar" element={<FormHistoricoClinico/>}/>
                <Route path="/painel/clinica/editar" element={<Clinica />} />
                <Route path="/painel/agenda" element={<Agenda />} />
            </Routes>
        </BrowserRouter>
    );
}