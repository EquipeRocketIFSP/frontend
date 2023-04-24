import React, {useEffect, useState} from "react";
import {Alert, Spinner, Row} from "react-bootstrap";
import axios, {AxiosHeaders} from "axios";

import Contracts from "../../contracts/Contracts";
import Storages from "../../Storages";
import ListingPagination from "./ListingPagination";

import "./listing.scss";

interface Props extends React.PropsWithChildren {
    pathname: string,
    componentDesktopLegend: any,
    componentItem: any

}

export default function Listing(props: Props): JSX.Element {
    const {pathname, componentItem, componentDesktopLegend} = props;

    const [loading, setLoading] = useState<boolean>(true);
    const [response, setResponse] = useState<Contracts.PaginetedResponse<Object> | null>(null);

    useEffect(() => {
        const userData = Storages.userStorage.get();

        if (!userData)
            return;

        const headers = new AxiosHeaders().setAuthorization(`${userData.type} ${userData.token}`);

        axios.get<Contracts.PaginetedResponse<Object>>(`${process.env.REACT_APP_API_URL}/${pathname}`, {headers})
            .then(({data}) => setResponse(data))
            .finally(() => setLoading(false));
    }, [pathname]);

    if (loading)
        return <Row className="justify-content-center"><Spinner animation="grow"/></Row>;

    if (!response?.data.length)
        return <Alert variant="info" style={{textAlign: "center"}}>Nenhum item encontrado</Alert>;

    return (
        <>
            <div className="listing">
                <div className="d-none d-md-block">{factoryComponentType(componentDesktopLegend, {})}</div>

                {
                    response.data.map((data) => factoryComponentType(componentItem, data))
                }
            </div>

            <ListingPagination {...response.meta}/>
        </>
    );
}

function factoryComponentType(componentType: React.FunctionComponent, props: Object) {
    const key = crypto.randomUUID();

    return React.createElement(componentType, {key, ...props});
}