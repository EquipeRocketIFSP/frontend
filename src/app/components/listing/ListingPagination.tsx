import {Pagination} from "react-bootstrap";
import React from "react";
import Contracts from "../../contracts/Contracts";
import {Link} from "react-router-dom";

export default function ListingPagination(props: Contracts.MetaData): JSX.Element {
    const {first, last, next, prev, page, pages} = props;

    let paginationItems: JSX.Element[] = [];

    if (pages < 5) {
        for (let i = 1; i <= pages; i++) {
            paginationItems.push(
                <div className={`page-item ${i === page ? "active" : ""}`}>
                    <Link className="page-link" to={parseAPIURL(first, i)}>
                        <span aria-hidden="true">{i}</span>
                    </Link>
                </div>
            );
        }
    } else {
        const firstHalfActive = (
            page <= (pages / 2) && page > 2 ?
                <div className="page-item active">
                    <Link className="page-link" to={parseAPIURL(first, page)}>
                        <span aria-hidden="true">{page}</span>
                    </Link>
                </div>
                : <></>
        );

        const lastHalfActive = (
            page > (pages / 2) && page < (pages - 1) ?
                <div className="page-item active">
                    <Link className="page-link" to={parseAPIURL(first, page)}>
                        <span aria-hidden="true">{page}</span>
                    </Link>
                </div> : <></>
        );

        paginationItems = [
            <div className={`page-item ${1 === page ? "active" : ""}`}>
                <Link className="page-link" to={parseAPIURL(first, 1)}>
                    <span aria-hidden="true">1</span>
                </Link>
            </div>,

            <div className={`page-item ${2 === page ? "active" : ""}`}>
                <Link className="page-link" to={parseAPIURL(first, 2)}>
                    <span aria-hidden="true">2</span>
                </Link>
            </div>,

            firstHalfActive,

            <Pagination.Ellipsis/>,

            lastHalfActive,

            <div className={`page-item ${(pages - 1) === page ? "active" : ""}`}>
                <Link className="page-link" to={parseAPIURL(first, (pages - 1))}>
                    <span aria-hidden="true">{pages - 1}</span>
                </Link>
            </div>,

            <div className={`page-item ${pages === page ? "active" : ""}`}>
                <Link className="page-link" to={parseAPIURL(first, pages)}>
                    <span aria-hidden="true">{pages}</span>
                </Link>
            </div>
        ];
    }

    return (
        <Pagination className="justify-content-center">
            <div className="page-item">
                <Link className="page-link" to={parseAPIURL(first)}>
                    <span aria-hidden="true">«</span>
                </Link>
            </div>

            <div className="page-item">
                <Link className="page-link" to={parseAPIURL(prev)}>
                    <span aria-hidden="true">‹</span>
                </Link>
            </div>

            {paginationItems}

            <div className="page-item">
                <Link className="page-link" to={parseAPIURL(next)}>
                    <span aria-hidden="true">›</span>
                </Link>
            </div>

            <div className="page-item">
                <Link className="page-link" to={parseAPIURL(last)}>
                    <span aria-hidden="true">»</span>
                </Link>
            </div>
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