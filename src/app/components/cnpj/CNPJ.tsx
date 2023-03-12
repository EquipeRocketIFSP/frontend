import React, {useState} from "react";
import {Form} from "react-bootstrap";

import Helpers from "../../helpers/Helpers";
import Contracts from "../../contracts/Contracts";

interface Props {
    cnpj?: string,
    validationErrors: Contracts.DynamicObject<string>
}

export default function CNPJ(props: Props): JSX.Element {
    const {cnpj, validationErrors} = props
    const [error, setError] = useState<string | null>(validationErrors["cnpj"] ?? null);

    const onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        if (validationErrors["cnpj"]?.length)
            delete validationErrors["cnpj"];

        if (!Helpers.SpecialValidation.cnpj(evt.currentTarget.value)) {
            validationErrors["cnpj"] = "Insira um CNPJ válido";

            if (evt.currentTarget.value.length === 18)
                setError("Insira um CNPJ válido");
        } else setError(null);
    }

    return (
        <>
            <Form.Label htmlFor="cnpj">CNPJ*</Form.Label>
            <Form.Control name="cnpj" maxLength={18} defaultValue={cnpj} id="cnpj" onInput={Helpers.Masks.cnpj}
                          onChange={onChange}
                          required/>

            <Form.Text style={{color: "red"}}>{error ?? ""}</Form.Text>
        </>
    );
}