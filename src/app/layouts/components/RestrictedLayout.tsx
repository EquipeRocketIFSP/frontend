import React, {useLayoutEffect} from "react";
import {Navigate, useLocation} from "react-router-dom";

import Layout from "./Layout";
import Storages from "../../Storages";
import Memory from "../../Memory";

export default function RestrictedLayout(props: React.PropsWithChildren): JSX.Element {
    const location = useLocation();
    const userData = Storages.userStorage.get();

    useLayoutEffect(() => {
        Memory.headers.setAuthorization(`${userData?.type} ${userData?.token}`);
    }, [location]);

    if (!userData?.token.length) {
        Memory.headers.setAuthorization(null);
        
        return <Navigate to="/login"/>;
    }

    return (
        <Layout>
            {props.children}
        </Layout>
    );
}