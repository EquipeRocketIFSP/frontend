namespace Contracts {
    export type AnimalSex = "MACHO" | "FEMEA";

    export type FormStatus = "idle" | "created" | "updated";

    export type Authority = "ADMIN" | "FUNCIONARIO" | "VETERINARIO" | "TUTOR";

    export interface ReactSelectOption {
        value: number,
        label: string,
        isFixed: boolean
    }

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

    export interface PathVariables extends Record<string, string | undefined> {
        id?: string
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
        email: string,
        authorities: Authority[]
    }

    export interface Funcionario extends PersonalData {
        crmv?: string
    }

    export interface Animal {
        id: number,
        nome: string,
        especie: string,
        ano_nascimento: number,
        tutores: PersonalData[],
        pelagem: string,
        raca: string,
        peso: string,
        sexo: AnimalSex
    }

    export interface Agendamento {
        id: number,
        data_consulta: string,
        observacoes: string,
        animal: string,
        tutor: string,
        veterinario: string
    }

    export interface AgendamentoComplete {
        id: number,
        data_consulta: string,
        observacoes: string,
        animal: Animal,
        tutor: PersonalData,
        veterinario: Funcionario
    }

    export interface Medicamento {
        id: number,
        nome: string,
        codigo_registro: string,
        principio_ativo: string,
        via_uso: string,
        concentracao: string,
        fabricante: string,
        nome_referencia: string,
        vencimento_registro: string
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