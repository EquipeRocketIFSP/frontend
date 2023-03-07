import SpecialValidation from "../app/helpers/components/SpecialValidation";

describe("Tests CNPJ validator", () => {
    test("CNPJ validation to true", () => {
        expect(SpecialValidation.cnpj("19.024.395/0001-90")).toBeTruthy();
    });

    test("CNPJ validation to false", () => {
        expect(SpecialValidation.cnpj("11.123.123/0001-90")).toBeFalsy();
    });
});