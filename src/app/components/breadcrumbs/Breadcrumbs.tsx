import React from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";

import "./breadcrumbs.scss";

export default function Breadcrumbs(props: React.PropsWithChildren): JSX.Element {
    return (
        <Breadcrumb className="breadcrumbs">
            {props.children}
        </Breadcrumb>
    );
}