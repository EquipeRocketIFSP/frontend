import React from "react";
import {Navigate} from "react-router-dom";

import Layout from "./Layout";
import Storages from "../../Storages";

export default function RestrictedLayout(props: React.PropsWithChildren): JSX.Element {
    const userData = Storages.userStorage.get();

    if (!userData?.token.length)
        return <Navigate to="/"/>;

    return (
        <Layout>
            {props.children}
        </Layout>
    );
}