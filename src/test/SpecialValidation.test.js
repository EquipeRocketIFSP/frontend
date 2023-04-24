import SpecialValidation from "../app/helpers/components/SpecialValidation";

describe("Tests CNPJ validator", () => {
    test("CNPJ validation to true", () => {
        expect(SpecialValidation.cnpj("19.024.395/0001-90")).toBeTruthy();
    });

    test("CNPJ validation to false", () => {
        expect(SpecialValidation.cnpj("11.123.123/0001-90")).toBeFalsy();
    });
});

describe("Tests CPF validator", () => {
    test("CPF validation to true", () => {
        expect(SpecialValidation.cpf("209.758.530-23")).toBeTruthy();
    });

    test("CPF validation to false", () => {
        expect(SpecialValidation.cpf("209.758.111-23")).toBeFalsy();
        expect(SpecialValidation.cpf("209.758.11-23")).toBeFalsy();
        expect(SpecialValidation.cpf("111.111.111-11")).toBeFalsy();
    });
});