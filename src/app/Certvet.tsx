import React, {useEffect, useState} from "react";
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
import FormEditClinica from "./views/form-edit-clinica/FormEditClinica";
import axios, {AxiosHeaders} from "axios";
import Storages from "./Storages";
import Memory from "./Memory";
import FormEditUsuario from "./views/form-edit-usuario/FormEditUsuario";
import Tutores from "./views/tutores/Tutores";

export default function Certvet() {
    const [authoritesLoaded, setAuthoritesLoaded] = useState<boolean>(false);

    useEffect(() => {
        const userData = Storages.userStorage.get();

        if (!userData) {
            setAuthoritesLoaded(true);
            return;
        }

        const headers = new AxiosHeaders().setAuthorization(`${userData.type} ${userData.token}`);

        axios.get<string[]>(`${process.env.REACT_APP_API_URL}/usuario/autoridades`, {headers})
            .then(({data}) => Memory.authorites.push(...data))
            .finally(() => setAuthoritesLoaded(true));
    }, []);

    if (!authoritesLoaded)
        return <></>;

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/redefinir-senha" element={<RedefinePassword/>}/>
                <Route path="/cadastro" element={<CadastroClinica/>}/>
                <Route path="/cadastro/dono" element={<CadastroClinicaDono/>}/>

                <Route path="/painel" element={<Painel/>}/>
                <Route path="/painel/clinica/editar" element={<FormEditClinica/>}/>
                <Route path="/painel/usuario/editar" element={<FormEditUsuario/>}/>
                <Route path="/painel/tutores" element={<Tutores/>}/>

                <Route path="/painel/animais" element={<Animais/>}/>
                <Route path="/painel/animais/1" element={<Animal/>}/>
                <Route path="/painel/animais/adicionar" element={<FormAnimal/>}/>
                <Route path="/painel/prontuario/cadastrar" element={<FormProntuario/>}/>
                <Route path="/painel/prontuario/historico-clinico/cadastrar" element={<FormHistoricoClinico/>}/>
                <Route path="/painel/agenda" element={<Agenda/>}/>
            </Routes>
        </BrowserRouter>
    );
}