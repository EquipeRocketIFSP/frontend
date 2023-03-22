import React from "react";
import Components from "../../components/Components";

export default function Layout(props: React.PropsWithChildren): JSX.Element {
    return (
        <>
            <Components.Navbar/>

            {props.children}
        </>
    );
}