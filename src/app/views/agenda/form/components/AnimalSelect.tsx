import {Form} from "react-bootstrap";
import Select, {SingleValue} from "react-select";
import React, {useEffect, useState} from "react";
import Contracts from "../../../../contracts/Contracts";
import axios, {AxiosHeaders} from "axios";
import Helpers from "../../../../helpers/Helpers";
import Storages from "../../../../Storages";

interface Props {
    setSelectedItem: (item: Contracts.ReactSelectOption) => void,
    tutorId: number,
    validationErrors: Contracts.DynamicObject<string>,
    animal?: Contracts.Animal
}

export default function AnimalSelect(props: Props): JSX.Element {
    const [selectedItem, setSelectedItem] = useState<Contracts.ReactSelectOption | null>(props.animal ? Helpers.ReactSelectOptionFactory.factory(props.animal) : null);
    const [items, setItems] = useState<Contracts.Animal[]>([]);
    const [search, setSearch] = useState<string>("");
    const [timeoutRef, setTimeoutRef] = useState<NodeJS.Timer | null>(null);
    const [isFirstLoading, setIsFirstLoading] = useState<boolean>(true);

    const userData = Storages.userStorage.get();
    const headers = new AxiosHeaders().setAuthorization(`${userData?.type} ${userData?.token}`);

    useEffect(() => {
        axios.get<Contracts.PaginetedResponse<Contracts.Animal>>(`${process.env.REACT_APP_API_URL}/tutor/${props.tutorId}/animal?buscar=${search}`, {headers})
            .then(({data: response}) => setItems(response.data))
            .catch(console.error)
            .finally(() => {
                if (props.animal && isFirstLoading)
                    setSelectedItem(Helpers.ReactSelectOptionFactory.factory(props.animal));
                else
                    setSelectedItem(null);

                setIsFirstLoading(false);
            });
    }, [search, props.tutorId]);

    const onInputChange = (value: string) => {
        if (timeoutRef) {
            clearTimeout(timeoutRef);
            setTimeoutRef(null);
        }

        const timer = setTimeout(() => setSearch(value), 1000);
        setTimeoutRef(timer);
    }

    const onChange = (value: SingleValue<Contracts.ReactSelectOption>) => {
        setSelectedItem(value);
        props.setSelectedItem(value as Contracts.ReactSelectOption);
    }

    const selectOptions = items.map((item) => Helpers.ReactSelectOptionFactory.factory(item));

    return (
        <Form.Group className="mb-3 col-lg-12">
            <Form.Label>Animal*</Form.Label>
            <Select options={selectOptions}
                    value={selectedItem}
                    placeholder="Selecione o animal"
                    onInputChange={(value) => onInputChange(value)}
                    onChange={onChange}
                    closeMenuOnSelect required/>

            <Form.Text>{props.validationErrors["animal"] ?? ""}</Form.Text>
        </Form.Group>
    );
}