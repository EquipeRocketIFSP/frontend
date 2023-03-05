import React, {useEffect, useState} from "react";
import {Form} from "react-bootstrap";
import Contracts from "../../contracts/Contracts";
import Helpers from "../../helpers/Helpers";

interface Props {
    name: string,
    setAddressDetails: (addressDetails: Contracts.ViaCEPAddress) => void
}

export default function CEP(props: Props): JSX.Element {
    const {name, setAddressDetails} = props;
    const [cep, setCep] = useState<string>("");

    useEffect(() => {
        if (cep.length < 9)
            return;

        Helpers.Address.loadAddress(cep).then(setAddressDetails);
    }, [cep]);

    return (
        <>
            <Form.Label htmlFor={name}>CEP*</Form.Label>
            <Form.Control name={name} maxLength={9} id={name} value={cep}
                          onInput={({currentTarget}) => setCep(currentTarget.value)} required/>
        </>
    );
}