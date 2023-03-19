import React, {useState} from "react";
import {Link, useSearchParams} from "react-router-dom";
import {Button, Form, Row} from "react-bootstrap";

interface Props {
    btnAdd?: {
        label: string,
        href: string,
    }
}

export default function SearchBar(props: Props) {
    const {btnAdd} = props;
    const [searchParams, setSearchParams] = useSearchParams();
    const [search, setSearch] = useState<string>(searchParams.get("search") ?? "");

    const onSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();

        const url = new URL(window.location.href);
        url.searchParams.set("search", search ?? "");

        setSearchParams(url.searchParams);
    }

    const clearForm = () => {
        const url = new URL(window.location.href);
        url.searchParams.set("search", "");

        setSearch("");
        setSearchParams(url.searchParams);
    }

    return (
        <div className="bg-light search-bar my-5 px-3">
            <Row>
                <Form className="col-8 col-md-6" onSubmit={onSubmit}>
                    <Form.Group className="d-flex align-items-center h-100">
                        <Form.Control className="w-50 me-2" type="text" name="buscar" placeholder="Buscar"
                                      value={search}
                                      onInput={({currentTarget}) => setSearch(currentTarget.value)}/>

                        <Button variant="outline-secondary me-1" type="submit">
                            <i className="fa fa-solid fa-magnifying-glass"> </i>
                        </Button>

                        {
                            search.length ?
                                <Button variant="outline-danger" onClick={clearForm}>
                                    {
                                        window.innerWidth > 767 ? "Limpar Busca" :
                                            <i className="fa fa-solid fa-xmark"> </i>
                                    }
                                </Button> :
                                <></>
                        }
                    </Form.Group>
                </Form>

                <div className="col-4 col-md-6 d-flex justify-content-end">
                    <Link className="btn d-flex flex-column align-items-center justify-content-center"
                          to={btnAdd?.href ?? "adicionar"}>
                        <i className="fa-solid fa-plus"> </i>

                        {window.innerWidth > 767 ? (btnAdd?.label ?? "Adicionar") : ""}
                    </Link>

                    {/*{
                        this.state.listTrash ?
                            (
                                <button className="btn d-flex flex-column align-items-center"
                                        onClick={this.onClickBtnTrash}>
                                    <i className="fa-solid fa-arrow-left"> </i>
                                    {
                                        window.innerWidth > 767 ? "Voltar" : ""
                                    }
                                </button>
                            ) :
                            (
                                <button className="btn d-flex flex-column align-items-center"
                                        onClick={this.onClickBtnTrash}>
                                    <i className="fa-solid fa-trash-can"> </i>
                                    {
                                        window.innerWidth > 767 ? "Lixeira" : ""
                                    }
                                </button>
                            )
                    }*/}
                </div>
            </Row>
        </div>
    );
}