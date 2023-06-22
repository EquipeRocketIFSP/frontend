import React, {useState} from "react";
import Container from "react-bootstrap/Container";
import BootstrapNavbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {Link, Navigate} from "react-router-dom";

// @ts-ignore
import Logo from "../../resources/logo.png";
import Storages from "../../Storages";
import {Dropdown} from "react-bootstrap";

import "./navbar.scss";
import Memory from "../../Memory";

export default function Navbar() {
    const storedData = Storages.userStorage.get();
    const logged = !!storedData;
    const firstNameLetter = storedData?.nome?.at(0);

    const [navigateToLogin, setNavigateToLogin] = useState<boolean>(false);

    const logout = () => {
        Storages.userStorage.truncate();

        for (let i = 0; i < Memory.authorites.length; i++)
            Memory.authorites = [];

        setNavigateToLogin(true);
    }

    if (navigateToLogin)
        return <Navigate to="/login"/>;

    return (
        <BootstrapNavbar collapseOnSelect expand="lg" className="bg-light shadow sticky-top">
            <Container>

                <Link className="navbar-brand" to={logged ? "/painel" : "/"}>
                    <img src={Logo} title="Logo" alt="Logo" style={{maxWidth: "80px"}}/>
                </Link>

                <BootstrapNavbar.Toggle aria-controls="responsive-navbar-nav"/>

                <BootstrapNavbar.Collapse>

                    {
                        logged ?
                            (
                                <Nav>

                                    {
                                        Memory.authorites.find((value) => value === "ADMIN") ?
                                            <Link to="/painel/funcionarios" className="nav-link">Funcionarios</Link> :
                                            <></>
                                    }

                                    <Link to="/painel/agenda" className="nav-link">Agenda</Link>
                                    <Link to="/painel/tutores" className="nav-link">Tutores</Link>

                                    {
                                        Memory.authorites.find((value) => value === "VETERINARIO") ?
                                            <Link to="/painel/medicamentos" className="nav-link">Medicamentos</Link> :
                                            <></>
                                    }
                                </Nav>
                            ) :
                            <></>
                    }

                </BootstrapNavbar.Collapse>

                <BootstrapNavbar.Collapse className="justify-content-end">

                    {
                        logged ?
                            <Dropdown>
                                <Dropdown.Toggle variant="secondary"
                                                 className="d-flex justify-content-center align-items-center rounded-circle profile-dropdown">
                                    {firstNameLetter}
                                </Dropdown.Toggle>

                                <Dropdown.Menu className="dropdown-menu-right">
                                    <Link to="/painel/usuario/editar" className="dropdown-item">Meus dados</Link>

                                    {
                                        Memory.authorites.find((value) => value === "ADMIN") ?
                                            <Link to="/painel/clinica/editar" className="dropdown-item">
                                                Dados da clínica
                                            </Link> : <></>
                                    }

                                    <Dropdown.Item onClick={logout}>Sair</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown> : <></>
                    }

                </BootstrapNavbar.Collapse>
            </Container>
        </BootstrapNavbar>
    );
}