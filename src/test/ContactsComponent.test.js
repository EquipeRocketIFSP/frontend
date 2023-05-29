import "@testing-library/react/dont-cleanup-after-each";
import { render, screen, cleanup } from "@testing-library/react";
import Contacts from "../app/components/contacts/Contacts";
import userEvent from "@testing-library/user-event";

describe("Contacts", () => {

    afterAll(() => {
        cleanup();
    });
    render(<Contacts />);

    describe("Email", () => {
        const email = screen.getByRole("textbox", {name: /E-mail*/i});

        test("Deve estar na página", () => {
            expect(email).toBeInTheDocument();
        });

        test("Deve ser do tipo Email", () => {
            expect(email).toHaveProperty("type", "email");
        });

        test("Deve ter tamanho máximo de 255 caracteres", () => {
            expect(email).toHaveProperty("maxLength", 255);
        });

        test("Deve ser obrigatório", () => {
            expect(email).toHaveProperty("required", true);
        });
    });

    describe("Celular", () => {
        const celular = screen.getByRole("textbox", {name: /Celular*/i});

        test("Deve estar na página", () => {
            expect(celular).toBeInTheDocument();
        });

        test("Deve ter tamanho máximo de 15 caracteres", () => {
            expect(celular).toHaveProperty("maxLength", 15);
        });

        test("Deve ser obrigatório", () => {
            expect(celular).toHaveProperty("required", true);
        });

        test("Deve mostrar máscara de celular", () => {
            userEvent.clear(celular);
            userEvent.type(celular, "11963203035");
            expect(celular).toHaveValue("(11) 96320-3035");
        });

        test("Não Deve aceitar letras", () => {
            userEvent.clear(celular);
            userEvent.type(celular, "e+.,-");
            expect(celular).toHaveValue("");
        });
    });

    describe("Telefone", () => {
        const telefone = screen.getByRole("textbox", {name: /Telefone/i});

        test("Deve estar na página", () => {
            expect(telefone).toBeInTheDocument();
        });

        test("Deve ter tamanho máximo de 14 caracteres", () => {
            expect(telefone).toHaveProperty("maxLength", 14);
        });

        test("Não deve ser obrigatório", () => {
            expect(telefone).toHaveProperty("required", false);
        });

        test("Deve mostrar máscara de telefone", () => {
            userEvent.clear(telefone);
            userEvent.type(telefone, "1140028922");
            expect(telefone).toHaveValue("(11) 4002-8922");
        });

        test("Não Deve aceitar letras", () => {
            userEvent.clear(telefone);
            userEvent.type(telefone, "e+.,-");
            expect(telefone).toHaveValue("");
        });
    });
});