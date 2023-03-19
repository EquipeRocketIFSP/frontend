import React, {useEffect, useState} from "react";
import {Alert, Spinner} from "react-bootstrap";
import axios, {AxiosHeaders} from "axios";

import Contracts from "../../contracts/Contracts";
import Storages from "../../Storages";
import ListingPagination from "./ListingPagination";

interface Props extends React.PropsWithChildren {
    pathname: string,
    componentType: any
}

export default function Listing(props: Props): JSX.Element {
    const {pathname, componentType} = props;

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
        return <Spinner animation="grow"/>;

    if (!response?.data.length)
        return <Alert variant="info" style={{textAlign: "center"}}>Nenhum item encontrado</Alert>;

    return (
        <>
            <div style={{height: "60vh"}}>
                {
                    response.data.map((data) => factoryComponentType(componentType, data))
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