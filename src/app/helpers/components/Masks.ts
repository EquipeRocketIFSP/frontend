import React from "react";

class Masks {
    static phone = (evt: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, usesCelphone: boolean = false) => {
        let {value} = evt.currentTarget;

        value = value.replace(/\D/g, "")
            .replace(/(\d{2})(\d)/, "($1) $2")
            .replace(/(\d{4})(\d)/, "$1-$2");

        if (usesCelphone)
            value = value.replace(/(\d{4})-(\d)(\d{4})/, "$1$2-$3");

        value = value.replace(/(-\d{4})\d+?$/, "$1");

        evt.currentTarget.value = value;
    }

    static onBlurPhone = (evt: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (evt.currentTarget.value.length != 14)
            evt.currentTarget.value = "";
    }

    static celphone = (evt: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        evt.currentTarget.value = evt.currentTarget.value.replace(/\D/g, "")
            .replace(/(\d{2})(\d)/, "($1) $2")
            .replace(/(\d{5})(\d)/, "$1-$2")
            .replace(/(-\d{4})\d+?$/, "$1");
    }

    static onBlurCelphone = (evt: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (evt.currentTarget.value.length != 15)
            evt.currentTarget.value = "";
    }

    static cep = (evt: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        evt.currentTarget.value = evt.currentTarget.value
            .replace(/\D/g, "")
            .replace(/(\d{5})(\d)/, "$1-$2")
            .replace(/(-\d{3})\d+?$/, "$1");
    }

    static onBlurCep = (evt: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (evt.currentTarget.value.length != 9)
            evt.currentTarget.value = "";
    }

    static number = (evt: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        evt.currentTarget.value = evt.currentTarget.value.replace(/\D/gmi, "");
    }

    static price = (evt: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        evt.currentTarget.value = evt.currentTarget.value.replace(/\D/g, "")
            .replace(/(\d+)(\d{2})/, "$1,$2")
            .replace(/(\d+)(\d{3})/gmi, "$1.$2")
            .replace(/(\d+)(\d{3})/gmi, "$1.$2")
            .replace(/(\d+)(\d{3})/gmi, "$1.$2")
            .replace(/(\d+)(\d{3})/gmi, "$1.$2");
    }

    static cpf = (evt: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        evt.currentTarget.value = evt.currentTarget.value.replace(/\D/g, "")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d)/, "$1-$2")
            .replace(/(-\d{2})\d+?$/, "$1");
    }

    static onBlurCpf = (evt: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (evt.currentTarget.value.length < 14)
            evt.currentTarget.value = "";
    }

    static cnpj = (evt: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        evt.currentTarget.value = evt.currentTarget.value.replace(/\D/g, "")
            .replace(/(\d{2})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d)/, "$1/$2")
            .replace(/(\d{4})(\d)/, "$1-$2")
            .replace(/(-\d{2})\d+?$/, "$1");
    }

    static onBlurCnpj = (evt: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (evt.currentTarget.value.length != 18)
            evt.currentTarget.value = "";
    }

    static crmv = (evt: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        evt.currentTarget.value = evt.currentTarget.value
            .replace(/[^a-z0-9\-]+/gmi, "")
            .replace(/(\D{2})(\D)/, "$1")
            .replace(/(\D{2})(\d)/, "$1-$2")
            .replace(/([a-z0-9\-]{8})([a-z0-9\-])/, "$1")
            .toUpperCase();
    }

    static cnae = (evt: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        evt.currentTarget.value = evt.currentTarget.value
            .replace(/\D/g, "")
            .replace(/(\d{4})(\d)/, "$1-$2")
            .replace(/(-\d)(\d)/, "$1/$2")
            .replace(/(\/\d{2})(\d)/, "$1");
    }
}

export default Masks;