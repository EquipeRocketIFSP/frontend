import React, {useState} from "react";
import Container from "react-bootstrap/Container";
import BootstrapNavbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {Link, Navigate} from "react-router-dom";
import Image from "react-bootstrap/Image";

// @ts-ignore
import Logo from "../../resources/logo.png";
import Storages from "../../Storages";

export default function Navbar() {
    const logged = Storages.userStorage.get() == null;

    const [navigateToLogin, setNavigateToLogin] = useState<boolean>(false);

    const logout = () => {
        Storages.userStorage.truncate();
        setNavigateToLogin(true);
    }

    if (navigateToLogin)
        return <Navigate to="/login"/>;

    return (
        <BootstrapNavbar collapseOnSelect expand="lg" className="bg-light shadow sticky-top">
            <Container>

                <Link className="navbar-brand" to="/">
                    <img src={Logo} title="Logo" alt="Logo" style={{maxWidth: "150px"}}/>
                </Link>

                <BootstrapNavbar.Toggle aria-controls="responsive-navbar-nav"/>

                <BootstrapNavbar.Collapse>

                    {
                        logged ?
                            (
                                <Nav>
                                    <Link to="/painel/clinica/editar" className="nav-link">Editar dados da clínica</Link>
                                    
                                    <Link to="/painel/funcionarios" className="nav-link">Funcionarios</Link>
                                    <Link to="/painel/agenda" className="nav-link">Agenda</Link>
                                    <Link to="/painel/tutores" className="nav-link">Tutores</Link>
                                    <Link to="/painel/animais" className="nav-link">Animais</Link>
                                </Nav>
                            ) :
                            <></>
                    }

                </BootstrapNavbar.Collapse>

                <BootstrapNavbar.Collapse className="justify-content-end">

                    {
                        logged ?
                            <Nav>
                                <Nav.Link onClick={logout}>Sair</Nav.Link>
                            </Nav> :
                            <></>
                    }

                </BootstrapNavbar.Collapse>
            </Container>
        </BootstrapNavbar>
    );
}