import React, {useState} from "react";
import {Form} from "react-bootstrap";

import Helpers from "../../helpers/Helpers";
import Contracts from "../../contracts/Contracts";

interface Props {
    cpf?: string,
    name?: string,
    validationErrors: Contracts.DynamicObject<string>
}

export default function CPF(props: Props): JSX.Element {
    const {cpf, name, validationErrors} = props;
    const fieldName = name ?? "cpf";

    const [error, setError] = useState<string | null>(validationErrors[fieldName] ?? null);

    const onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        if (validationErrors[fieldName]?.length)
            delete validationErrors[fieldName];

        if (!Helpers.SpecialValidation.cpf(evt.currentTarget.value)) {
            validationErrors[fieldName] = "Insira um CPF válido";

            if (evt.currentTarget.value.length === 14)
                setError("Insira um CPF válido");
        } else setError(null);
    }

    return (
        <>
            <Form.Label htmlFor={fieldName}>CPF*</Form.Label>
            <Form.Control name={fieldName} maxLength={14} defaultValue={cpf} id={fieldName} onInput={Helpers.Masks.cpf}
                          onChange={onChange}
                          required/>

            <Form.Text style={{color: "red"}}>{error ?? ""}</Form.Text>
        </>
    );
}