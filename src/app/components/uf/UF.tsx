import {Form} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import Helpers from "../../helpers/Helpers";
import Contracts from "../../contracts/Contracts";

interface Props {
    name: string,
    defaultValue?: string | number | readonly string[]
}

export default function UF(props: Props): JSX.Element {
    const {name, defaultValue} = props;
    const [ufs, setUfs] = useState<Contracts.IBGEUF[]>([]);

    useEffect(() => {
        Helpers.Address.loadUfs().then(setUfs);
    }, []);

    return (
        <>
            <Form.Label htmlFor={name}>Estado*</Form.Label>
            <Form.Select name={name} id={name} required>
                <option value="">- Selecione</option>

                {
                    ufs.map(({sigla}) => <option value={sigla} key={sigla}
                                                 selected={defaultValue === sigla}>{sigla}</option>)
                }
            </Form.Select>
        </>
    );
}