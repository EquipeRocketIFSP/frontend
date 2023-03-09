import React, {useEffect, useState} from "react";
import {Form} from "react-bootstrap";
import Contracts from "../../contracts/Contracts";
import Helpers from "../../helpers/Helpers";

interface Props {
    name: string,
    defaultValue?: string | number | readonly string[],
    setAddressDetails: (addressDetails: Contracts.ViaCEPAddress) => void
}

export default function CEP(props: Props): JSX.Element {
    const {name, defaultValue, setAddressDetails} = props;
    const [cep, setCep] = useState<string>("");

    const value = defaultValue?.toString().length && !cep.length ? defaultValue.toString() : cep;

    useEffect(() => {
        if (value.length < 9)
            return;

        Helpers.Address.loadAddress(value).then(setAddressDetails);
    }, [cep]);

    return (
        <>
            <Form.Label htmlFor={name}>CEP*</Form.Label>
            <Form.Control name={name} maxLength={9} id={name} value={value}
                          onInput={(evt) => {
                              Helpers.Masks.cep(evt);
                              setCep(evt.currentTarget.value);
                          }} required/>
        </>
    );
}