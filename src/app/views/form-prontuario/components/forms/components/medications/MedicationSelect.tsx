import {Form} from "react-bootstrap";
import Select, {SingleValue} from "react-select";
import React, {useEffect, useState} from "react";
import axios from "axios";
import Contracts from "../../../../../../contracts/Contracts";
import Helpers from "../../../../../../helpers/Helpers";
import Memory from "../../../../../../Memory";

interface Props {
    setSelectedItem: (item: Contracts.ReactSelectOption) => void,
    validationErrors: Record<string, string>,
    data?: Contracts.Medicamento
}

export default function MedicationSelect(props: Props): JSX.Element {
    const [selectedItem, setSelectedItem] = useState<SingleValue<Contracts.ReactSelectOption>>();
    const [items, setItems] = useState<Contracts.Medicamento[]>([]);
    const [search, setSearch] = useState<string>("");
    const [timeoutRef, setTimeoutRef] = useState<NodeJS.Timer | null>(null);
    const [isFirstLoading, setIsFirstLoading] = useState<boolean>(true);

    useEffect(() => {
        const url = `${process.env.REACT_APP_API_URL}/medicamento?buscar=${search}`

        axios.get<Contracts.PaginetedResponse<Contracts.Medicamento>>(url, {headers: Memory.headers})
            .then(({data: response}) => setItems(response.data))
            .catch(console.error)
            .finally(() => {
                if (props.data && isFirstLoading) {
                    const value = Helpers.ReactSelectOptionFactory.factory({
                        id: props.data.id,
                        nome: `${props.data.nome} (${props.data.via_uso}) - ${props.data.fabricante}`
                    });

                    setSelectedItem(value);
                    props.setSelectedItem(value);
                } else
                    setSelectedItem(undefined);

                setIsFirstLoading(false);
            });
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
        setSelectedItem(value);
        props.setSelectedItem(value as Contracts.ReactSelectOption);
    }

    const selectOptions = items.map((item) => {
        return Helpers.ReactSelectOptionFactory.factory({
            id: item.id,
            nome: `${item.nome} (${item.via_uso}) - ${item.fabricante}`
        });
    });

    return (
        <Form.Group className="mb-3 col-lg-12">
            <Form.Label>Medicamento*</Form.Label>
            <Select options={selectOptions}
                    value={selectedItem}
                    placeholder="Selecione o medicamento"
                    onInputChange={onInputChange}
                    onChange={onChange}
                    closeMenuOnSelect required/>

            <Form.Text className="text-danger">{props.validationErrors["medicamento"] ?? ""}</Form.Text>

            <input type="hidden" name="medicamento" value={selectedItem?.value}/>
        </Form.Group>
    );
}