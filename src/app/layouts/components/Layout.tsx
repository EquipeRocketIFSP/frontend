import React from "react";
import Navbar from "../../components/navbar/Navbar";

interface State {
    modals: {
        showLogin: boolean,
        showSignin: boolean
    }
}

class Layout extends React.Component<React.PropsWithChildren, State> {
    constructor(props: React.PropsWithChildren) {
        super(props);

        this.state = {
            modals: {
                showLogin: false,
                showSignin: false
            }
        };
    }

    render(): React.ReactNode {
        return (
            <>
                <Navbar/>

                {this.props.children}
            </>
        );
    }
}

export default Layout;