import {cpf, cnpj} from "cpf-cnpj-validator";

export default class SpecialValidation {
    public static cnpj(value: string): boolean {
        value = value.replace(/\D/gmi, "");
        return cnpj.isValid(value);
    }

    public static cpf(value: string): boolean {
        value = value.replace(/\D/gmi, "");
        return cpf.isValid(value);
    }
}