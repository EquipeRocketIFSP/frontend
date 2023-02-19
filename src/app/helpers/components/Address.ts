import Axios from "axios";

import Contracts from "../../contracts/Contracts";

class Address {
    public static loadAddress = async (cep: string): Promise<Contracts.ViaCEPAddress> => {
        let data: Contracts.ViaCEPAddress = {
            bairro: "",
            cep: "",
            complemento: "",
            ddd: "",
            gia: "",
            ibge: "",
            localidade: "",
            logradouro: "",
            siafi: "",
            uf: ""
        };

        try {
            const response = await Axios.get<Contracts.ViaCEPAddress>(`https://viacep.com.br/ws/${cep.replace(/\D/gmi, "")}/json/`);
            data = response.data;
        } catch (error) {
            console.error(error);
        }

        return data;
    }

    public static loadUfs = async (): Promise<Contracts.IBGEUF[]> => {
        let data: Contracts.IBGEUF[] = [];

        try {
            const response = await Axios.get<Contracts.IBGEUF[]>("https://servicodados.ibge.gov.br/api/v1/localidades/estados");
            data = response.data;
        } catch (error) {
            console.error(error);
        }

        return data;
    }
}

export default Address;