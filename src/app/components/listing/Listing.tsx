import React, {useEffect, useState} from "react";
import {Alert, Spinner, Row} from "react-bootstrap";
import axios from "axios";

import Contracts from "../../contracts/Contracts";
import ListingPagination from "./ListingPagination";

import "./listing.scss";
import Memory from "../../Memory";

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
        axios.get<Contracts.PaginetedResponse<Object>>(`${process.env.REACT_APP_API_URL}/${pathname}`, {headers: Memory.headers})
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