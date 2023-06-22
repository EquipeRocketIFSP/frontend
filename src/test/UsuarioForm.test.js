import "@testing-library/react/dont-cleanup-after-each";
import { render, screen, cleanup } from "@testing-library/react";
import Usuario from "../app/forms/components/Usuario";

describe("UsuarioForm", () => {

    afterAll(() => {
        cleanup();
    });

    render(<Usuario validationErrors={{}} />);

    test("Deve ter input de nome", () => {

        const input = screen.getByRole("textbox", { name: /Nome*/i });

        expect(input).toHaveAttribute("name", "nome");
    });

    test("Deve ter input de RG", () => {

        const input = screen.getByRole("textbox", { name: "RG*" });

        expect(input).toHaveAttribute("name", "rg");
    });

    test("Deve ter input de celular", () => {

        const input = screen.getByRole("textbox", { name: /Celular*/i });

        expect(input).toHaveAttribute("name", "celular");
    });

    test("Deve ter input de telefone", () => {

        const input = screen.getByRole("textbox", { name: /Telefone/i });

        expect(input).toHaveAttribute("name", "telefone");
    });

});