import React, {useEffect, useState} from "react";
import {Route, Routes, useLocation} from "react-router-dom";
import axios from "axios";

import Home from "../views/home/Home";
import Auth from "../views/auth/Auth";
import RedefinePassword from "../views/redefine-password/RedefinePassword";
import SignIn from "../views/sign-in/SignIn";
import Painel from "../views/painel/Painel";
import FormEditClinica from "../views/form-edit-clinica/FormEditClinica";
import FormEditUsuario from "../views/form-edit-usuario/FormEditUsuario";
import Users from "../views/users/Users";
import Animals from "../views/animals/Animals";
import FormProntuario from "../views/form-prontuario/FormProntuario";
import Medication from "../views/medication/Medication";
import Stock from "../views/stock/Stock";
import Agenda from "../views/agenda/Agenda";
import NotFound from "../views/not-found/NotFound";

import Memory from "../Memory";
import Storages from "../Storages";

export default function Web(): JSX.Element {
    const [authoritesLoaded, setAuthoritesLoaded] = useState<boolean>(false);
    const [tecnicalResponsibleLoaded, setTecnicalResponsibleLoaded] = useState<boolean>(false);

    useLocation(); //Força a atualização das rotas

    useEffect(() => {
        const userData = Storages.userStorage.get();

        if (!userData) {
            setAuthoritesLoaded(true);
            setTecnicalResponsibleLoaded(true);
            return;
        }

        Memory.headers.setAuthorization(`${userData.type} ${userData.token}`);

        axios.get<string[]>(`${process.env.REACT_APP_API_URL}/usuario/autoridades`, {headers: Memory.headers})
            .then(({data}) => Memory.authorites.push(...data))
            .finally(() => setAuthoritesLoaded(true));

        axios.get(`${process.env.REACT_APP_API_URL}/clinica/responsavel-tecnico`, {headers: Memory.headers})
            .then(() => Memory.hasTechnicalResponsible = true)
            .catch(() => Memory.hasTechnicalResponsible = false)
            .finally(() => setTecnicalResponsibleLoaded(true));
    }, []);

    if (!authoritesLoaded || !tecnicalResponsibleLoaded)
        return <></>;

    return (
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
    );
}