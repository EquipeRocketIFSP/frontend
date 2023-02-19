import React from "react";
import Container from "react-bootstrap/Container";
import BootstrapNavbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {Link} from "react-router-dom";

export default function Navbar() {
    return (
        <BootstrapNavbar collapseOnSelect expand="lg" className="bg-light shadow sticky-top">
            <Container>

                <Link className="navbar-brand" to="/">CertVet</Link>

                <BootstrapNavbar.Toggle aria-controls="responsive-navbar-nav"/>

                <BootstrapNavbar.Collapse>

                    <Nav>
                        <Link to="/painel/funcionarios" className="nav-link">Funcionarios</Link>
                        <Link to="/painel/agenda" className="nav-link">Agenda</Link>
                        <Link to="/painel/tutores" className="nav-link">Tutores</Link>
                        <Link to="/painel/animais" className="nav-link">Animais</Link>

                    </Nav>

                </BootstrapNavbar.Collapse>

                <BootstrapNavbar.Collapse className="justify-content-end">

                    <Nav>
                        <Nav.Link >Sair</Nav.Link>
                    </Nav>

                </BootstrapNavbar.Collapse>
            </Container>
        </BootstrapNavbar>
    );
}