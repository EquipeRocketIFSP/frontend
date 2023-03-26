import {Form} from "react-bootstrap";
import Select, {SingleValue} from "react-select";
import React, {useEffect, useState} from "react";
import Contracts from "../../../../../contracts/Contracts";
import axios, {AxiosHeaders} from "axios";
import Helpers from "../../../../../helpers/Helpers";
import Storages from "../../../../../Storages";

interface Props {
    setSelectedItem: (item: Contracts.ReactSelectOption) => void,
    validationErrors: Contracts.DynamicObject<string>
}

export default function VeterinarioSelect(props: Props): JSX.Element {
    const [items, setItems] = useState<Contracts.PersonalData[]>([]);
    const [search, setSearch] = useState<string>("");
    const [timeoutRef, setTimeoutRef] = useState<NodeJS.Timer | null>(null);

    const userData = Storages.userStorage.get();
    const headers = new AxiosHeaders().setAuthorization(`${userData?.type} ${userData?.token}`);

    useEffect(() => {
        axios.get<Contracts.PaginetedResponse<Contracts.PersonalData>>(`${process.env.REACT_APP_API_URL}/veterinario?buscar=${search}`, {headers})
            .then(({data: response}) => setItems(response.data))
            .catch(console.error);
    }, [search]);

    const onInputChange = (value: string) => {
        if (timeoutRef) {
            clearTimeout(timeoutRef);
            setTimeoutRef(null);
        }

        const timer = setTimeout(() => setSearch(value), 1000);
        setTimeoutRef(timer);
    }

    const onChange = (value: SingleValue<Contracts.ReactSelectOption>) => {
        props.setSelectedItem(value as Contracts.ReactSelectOption);
    }

    const selectOptions = items.map((item) => Helpers.ReactSelectOptionFactory.factory(item));

    return (
        <Form.Group className="mb-3 col-lg-12">
            <Form.Label>Veterinário*</Form.Label>
            <Select options={selectOptions}
                    placeholder="Selecione o veterinário"
                    onInputChange={(value) => onInputChange(value)}
                    onChange={onChange}
                    closeMenuOnSelect required/>

            <Form.Text>{props.validationErrors["veterinario"] ?? ""}</Form.Text>
        </Form.Group>
    );
}