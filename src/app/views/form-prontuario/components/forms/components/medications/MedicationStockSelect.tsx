import {Form} from "react-bootstrap";
import Select, {SingleValue} from "react-select";
import React, {useEffect, useState} from "react";
import axios from "axios";
import Contracts from "../../../../../../contracts/Contracts";
import Helpers from "../../../../../../helpers/Helpers";
import Memory from "../../../../../../Memory";

interface Props {
    validationErrors: Record<string, string>,
    medication: Contracts.ReactSelectOption,
    setSelectedMesure: (measure: string) => void,
    data?: Contracts.Estoque,
}

export default function MedicationStockSelect(props: Props): JSX.Element {
    const [selectedItem, setSelectedItem] = useState<SingleValue<Contracts.ReactSelectOption>>();
    const [items, setItems] = useState<Contracts.Estoque[]>([]);
    const [search, setSearch] = useState<string>("");
    const [timeoutRef, setTimeoutRef] = useState<NodeJS.Timer | null>(null);
    const [isFirstLoading, setIsFirstLoading] = useState<boolean>(true);

    useEffect(() => {
        const url = `${process.env.REACT_APP_API_URL}/medicamento/${props.medication.value}/estoque?buscar=${search}`;

        axios.get<Contracts.PaginetedResponse<Contracts.Estoque>>(url, {headers: Memory.headers})
            .then(({data: response}) => setItems(response.data))
            .catch(console.error)
            .finally(() => {
                if (props.data && isFirstLoading) {
                    setSelectedItem(Helpers.ReactSelectOptionFactory.factory({
                        id: props.data.id,
                        nome: `Lote: ${props.data.lote} - Validade: ${new Date(props.data.validade).toLocaleDateString('pt-BR')} Quantidade restante: ${props.data.quantidade} ${props.data.medida}`
                    }));
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
        props.setSelectedMesure(items.find((item) => item.id === value?.value)?.medida ?? "");
    }

    const selectOptions = items.map((item) => {
        return Helpers.ReactSelectOptionFactory.factory({
            id: item.id,
            nome: `Lote: ${item.lote} - Validade: ${new Date(item.validade).toLocaleDateString('pt-BR')} Quantidade restante: ${item.quantidade} ${item.medida}`
        });
    });

    return (
        <Form.Group className="mb-3 col-lg-12">
            <Form.Label>Lote*</Form.Label>
            <Select options={selectOptions}
                    value={selectedItem}
                    placeholder="Selecione o lote"
                    onInputChange={(value) => onInputChange(value)}
                    onChange={onChange}
                    closeMenuOnSelect required/>

            <Form.Text className="text-danger">{props.validationErrors["lote"] ?? ""}</Form.Text>

            <input type="hidden" name="lote" value={selectedItem?.value}/>
        </Form.Group>
    );
}