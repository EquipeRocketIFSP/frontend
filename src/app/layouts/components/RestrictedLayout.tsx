import React from "react";
import {Navigate} from "react-router-dom";

import Layout from "./Layout";
import Storages from "../../Storages";

class RestrictedLayout extends React.Component<React.PropsWithChildren> {
    render(): React.ReactNode {
        const userData = Storages.userStorage.get();

        if (!userData?.token.length)
            return <Navigate to="/"/>;

        return (
            <Layout>
                {this.props.children}
            </Layout>
        );
    }
}

export default RestrictedLayout;