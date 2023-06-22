import "@testing-library/react/dont-cleanup-after-each";
import { render, screen, cleanup } from "@testing-library/react";
import Address from "../app/components/address/Address";

describe("Address", () => {

    afterAll(() => {
        cleanup();
    });
    render(<Address />);

    test("Deve ter input de cep", () => {

        const input = screen.getByRole("textbox", { name: /CEP*/i });

        expect(input).toHaveAttribute("name", "cep");
    });

    test("Deve ter input de numero", () => {

        const input = screen.getByRole("textbox", { name: /Número*/i });

        expect(input).toHaveAttribute("name", "numero");
    });

    test("Deve ter input de logradouro", () => {

        const input = screen.getByRole("textbox", { name: /Logradouro*/i });

        expect(input).toHaveAttribute("name", "logradouro");
    });

    test("Deve ter input de bairro", () => {

        const input = screen.getByRole("textbox", { name: /Bairro*/i });

        expect(input).toHaveAttribute("name", "bairro");
    });

    test("Deve ter input de cidade", () => {

        const input = screen.getByRole("textbox", { name: /Cidade*/i });

        expect(input).toHaveAttribute("name", "cidade");
    });

    test("Deve ter input de estado", () => {

        const input = screen.getByRole("combobox", { name: /Estado*/i });

        expect(input).toHaveAttribute("name", "estado");
    });

});