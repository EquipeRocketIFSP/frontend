namespace Contracts {
    export interface DynamicObject<I> {
        [key: string]: I
    }

    export interface UserData {
        token: string,
        type: string,
        nome: string | null
    }

    export interface MetaData {
        total: number,
        limit: number,
        page: number,
        pages: number,
        first: string,
        last: string,
        prev: string | null,
        next: string | null
    }

    export interface PaginetedResponse<I> {
        meta: MetaData,
        data: I[]
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

    export interface PersonalData {
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
        telefone?: string,
        email: string
    }

    export interface Funcionario extends PersonalData {
        crmv?: string
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

    export interface SignInClinicFormData {
        clinica_nome_fantasia: string
        clinica_razao_social: string
        clinica_cnpj: string
        clinica_cnae: string
        clinica_cep: string
        clinica_numero: string,
        clinica_logradouro: string
        clinica_bairro: string
        clinica_cidade: string
        clinica_estado: string
        clinica_email: string
        clinica_celular: string
        clinica_telefone: string | null
    }

    export interface ClinicaFromDataLogin {
        id: number,
        nome: string
    }

    export interface Clinica {
        nome_fantasia: string,
        razao_social: string,
        cnpj: string,
        cnae: string,
        cep: string,
        logradouro: string,
        numero: string,
        bairro: string,
        cidade: string,
        estado: string,
        celular: string,
        telefone: string,
        email: string,
    }
}

export default Contracts;