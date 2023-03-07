import React from "react";
import Navbar from "../../components/navbar/Navbar";

export default function Layout(props: React.PropsWithChildren): JSX.Element {
    return (
        <>
            <Navbar/>

            {props.children}
        </>
    );
}