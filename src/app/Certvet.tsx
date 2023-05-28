import React, {useEffect, useState} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import axios from "axios";

import "./certvet.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/fontawesome.min.css";
import "@fortawesome/fontawesome-free/css/solid.min.css";

import FormProntuario from "./views/form-prontuario/FormProntuario";
import Agenda from "./views/agenda/Agenda";
import Painel from "./views/painel/Painel";
import RedefinePassword from "./views/redefine-password/RedefinePassword";
import Home from "./views/home/Home";
import FormEditClinica from "./views/form-edit-clinica/FormEditClinica";
import Storages from "./Storages";
import Memory from "./Memory";
import FormEditUsuario from "./views/form-edit-usuario/FormEditUsuario";
import Users from "./views/users/Users";
import Animals from "./views/animals/Animals";
import SignIn from "./views/sign-in/SignIn";
import NotFound from "./views/not-found/NotFound";
import Medication from "./views/medication/Medication";
import Auth from "./views/auth/Auth";
import Stock from "./views/stock/Stock";

export default function Certvet() {
    const [authoritesLoaded, setAuthoritesLoaded] = useState<boolean>(false);

    useEffect(() => {
        const userData = Storages.userStorage.get();

        if (!userData) {
            setAuthoritesLoaded(true);
            return;
        }

        Memory.headers.setAuthorization(`${userData.type} ${userData.token}`);

        axios.get<string[]>(`${process.env.REACT_APP_API_URL}/usuario/autoridades`, {headers: Memory.headers})
            .then(({data}) => Memory.authorites.push(...data))
            .finally(() => setAuthoritesLoaded(true));
    }, []);

    if (!authoritesLoaded)
        return <></>;

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Auth.Login/>}/>
                <Route path="/login/redefinir" element={<Auth.ForgotPassword/>}/>
                <Route path="/redefinir-senha" element={<RedefinePassword/>}/>
                <Route path="/cadastro" element={<SignIn.Clinica/>}/>
                <Route path="/cadastro/dono" element={<SignIn.Owner/>}/>

                <Route path="painel">
                    <Route path="" element={<Painel/>}/>

                    {
                        Memory.authorites.find((value) => value === "ADMIN") ?
                            <Route path="clinica/editar" element={<FormEditClinica/>}/> : <></>
                    }

                    <Route path="usuario/editar" element={<FormEditUsuario/>}/>

                    <Route path="tutores">
                        <Route path="" element={<Users.Tutores.Listing/>}/>
                        <Route path=":id" element={<Users.Tutores.Details/>}/>
                        <Route path="adicionar" element={<Users.Tutores.Form/>}/>
                        <Route path=":id/editar" element={<Users.Tutores.Form/>}/>

                        <Route path=":tutorId/animais">
                            <Route path=":id" element={<Animals.Details/>}/>
                            <Route path="adicionar" element={<Animals.Form/>}/>
                            <Route path=":id/editar" element={<Animals.Form/>}/>

                            {
                                Memory.authorites.find((value) => value === "VETERINARIO") ?
                                    <Route path=":animalId/prontuario">
                                        <Route path=":id" element={<FormProntuario/>}/>
                                        <Route path="cadastrar" element={<FormProntuario/>}/>
                                    </Route> : <></>
                            }
                        </Route>
                    </Route>

                    {
                        Memory.authorites.find((value) => value === "VETERINARIO") ?
                            <Route path="medicamentos">
                                <Route path="" element={<Medication.Listing/>}/>
                                <Route path=":id" element={<Medication.Details/>}/>
                                <Route path="adicionar" element={<Medication.Create/>}/>
                                <Route path=":id/editar" element={<Medication.Edit/>}/>

                                <Route path=":medicationId/estoques/:id" element={<Stock.Details/>}/>
                                <Route path=":medicationId/estoques/adicionar" element={<Stock.Create/>}/>
                                <Route path=":medicationId/estoques/:id/editar" element={<Stock.Edit/>}/>
                            </Route> :
                            <></>
                    }

                    {
                        Memory.authorites.find((value) => value === "ADMIN") ?
                            <Route path="funcionarios">
                                <Route path="" element={<Users.Employees.Listing/>}/>
                                <Route path=":id" element={<Users.Employees.Details/>}/>
                                <Route path="adicionar" element={<Users.Employees.Create/>}/>
                                <Route path=":id/editar" element={<Users.Employees.Edit/>}/>
                            </Route> : <></>
                    }

                    <Route path="agenda">
                        <Route path="" element={<Agenda.Calendar/>}/>
                        <Route path="adicionar" element={<Agenda.Create/>}/>
                        <Route path=":id/editar" element={<Agenda.Edit/>}/>
                    </Route>
                </Route>

                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </BrowserRouter>
    );
}