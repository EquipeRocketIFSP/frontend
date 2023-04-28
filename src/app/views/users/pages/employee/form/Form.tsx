import Users from "../../../Users";
import {Link} from "react-router-dom";
import Components from "../../../../../components/Components";
import React from "react";

export default function Form(): JSX.Element {
    return <Users.DefaultForm title="Dados do tutor" clientPathname="tutores" apiPathname="tutor"
                              breadcrumbs={<FormBreadcrumbs/>}/>;
}

function FormBreadcrumbs(): JSX.Element {
    return (
        <Components.Breadcrumbs>
            <li className="breadcrumb-item"><Link to="/painel">Painel</Link></li>
            <li className="breadcrumb-item"><Link to="/painel/tutores">Detalhes do tutor</Link></li>
            <li className="breadcrumb-item active">Dados do Tutor</li>
        </Components.Breadcrumbs>
    );
}