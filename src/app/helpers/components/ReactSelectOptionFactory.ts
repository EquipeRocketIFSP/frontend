import Contracts from "../../contracts/Contracts";

interface Data {
    id: number,
    nome: string
}

export default class ReactSelectOptionFactory {
    public static factory(data: Data, isFixed = false): Contracts.ReactSelectOption {
        return {
            value: data.id,
            label: data.nome,
            isFixed
        }
    }
}