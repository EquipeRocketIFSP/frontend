import {Pagination} from "react-bootstrap";
import React, {useState} from "react";
import Contracts from "../../contracts/Contracts";
import {Link, Navigate} from "react-router-dom";

export default function ListingPagination(props: Contracts.MetaData): JSX.Element {
    const {first, last, next, prev, page, pages} = props;
    const [navigateTo, setNavigateTo] = useState<string | null>(null);

    let paginationItems: JSX.Element[] = [];

    if (pages < 5) {
        for (let i = 1; i <= pages; i++) {
            paginationItems.push(
                <Link to={parseAPIURL(first, i)}>
                    <Pagination.Item active={i === page}>{i}</Pagination.Item>
                </Link>
            );
        }
    } else {
        paginationItems = [
            <Link to={parseAPIURL(first, 1)}><Pagination.Item active={1 === page}>1</Pagination.Item></Link>,
            <Link to={parseAPIURL(first, 2)}><Pagination.Item active={2 === page}>2</Pagination.Item></Link>,
            <Pagination.Ellipsis/>,
            <Link to={parseAPIURL(first, (pages - 1))}><Pagination.Item
                active={(pages - 1) === page}>{pages - 1}</Pagination.Item></Link>,
            <Link to={parseAPIURL(first, pages)}><Pagination.Item
                active={pages === page}>{pages}</Pagination.Item></Link>,
        ];
    }

    if (navigateTo) {
        const href = navigateTo;
        setNavigateTo(null);
        return <Navigate to={href}/>;
    }

    return (
        <Pagination className="justify-content-center">
            <Link to={parseAPIURL(first)}><Pagination.First/></Link>
            <Link to={parseAPIURL(prev)}><Pagination.Prev/></Link>

            {paginationItems}

            <Link to={parseAPIURL(next)}> <Pagination.Next/></Link>
            <Link to={parseAPIURL(last)}><Pagination.Last/></Link>
        </Pagination>
    );
}

function parseAPIURL(apiURL: string | null, page?: number): string {
    if (!apiURL)
        return "#";

    const front = new URL(window.location.href);
    const api = new URL(apiURL);

    if (page)
        api.searchParams.set("pagina", page.toString());

    api.searchParams.forEach((value, name) => front.searchParams.set(name, value));

    return front.href.replace(front.origin, "");
}