namespace Contracts {
    export interface DynamicObject<I> {
        [key: string]: I
    }

    export interface UserData {
        id: number,
        token: string,
        nome: string | null,
        crmv: string | null,
    }

    export interface Redirect {
        redirect: null | string
    }

    export interface Breadcrumbs {
        name: string,
        pathname: string,
    }

    export interface ViaCEPAddress {
        cep: string,
        logradouro: string,
        complemento: string,
        bairro: string,
        localidade: string,
        uf: string,
        ibge: string,
        gia: string,
        ddd: string,
        siafi: string
    }

    export interface IBGEUF {
        id: number,
        sigla: string,
        nome: string,
        regiao: { id: number, sigla: string, nome: string }
    }

    export interface DadosPessoais {
        id: number,
        nome: string,
        cpf: string,
        rg: string,
        cep: string,
        logradouro: string,
        numero: string,
        bairro: string,
        cidade: string,
        estado: string,
        celular: string,
        telefone: string | null,
        email: string
    }

    export interface Funcionario extends DadosPessoais {
        crmv: string | null
    }

    export interface Tutor extends DadosPessoais {
    }

    export interface Animal {
        id: number,
        nome: string,
        idade: string,
        sexo: "MASCULINO" | "FEMININO",
        raca: string,
        especie: string,
        pelagem: string,
        tutor: string,
        formaIdentificacao: string,
        pai: string | null,
        mae: string | null
    }

    export interface Agendamento {
        id: number,
        animal: string,
        criadoEm: string,
        dataConsulta: string,
        tipoConsulta: string,
    }

    export interface Prontuario {
        id: number,
        veterinario: string,
        diagnostico: string,
        observacoes: string,
        medicamento: string,
        medida: string,
        exames: null,
        procedimento: null,
        prescricoes: string,
        quantidade: number,
        animal: Animal
    }

    export interface ListingData {
        id: number,
        nome: string,
    }

    export interface ListingDataAgendamento {
        id: number,
        tipoConsulta: string,
        dataConsulta: string,
    }

    export interface ListingDataProntuario {
        id: number,
        veterinario: string,
        animal: string
    }

    export interface CloseModal {
        closeModal: Function
    }
}

export default Contracts;