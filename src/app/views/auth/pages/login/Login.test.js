import "@testing-library/react/dont-cleanup-after-each";
import { render, screen, cleanup } from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom';
import Login from "./Login";

describe("Login", () => {

    afterAll(() => {
        cleanup();
    });
    render(<Login />, { wrapper: MemoryRouter });

    test("Deve conter o campo do código da clínica", () => {
        const clinica = screen.getByPlaceholderText('Código da Clínica');
        expect(clinica).toHaveAttribute("name", "clinica");
    });

    test("Deve conter o campo E-mail", () => {
        const clinica = screen.getByPlaceholderText('E-mail');
        expect(clinica).toHaveAttribute("name", "email");
    });

    test("Deve conter o campo Senha", () => {
        const clinica = screen.getByPlaceholderText('Senha');
        expect(clinica).toHaveAttribute("name", "senha");
    });

    test("Deve conter botão de enviar", () => {
        const btn = screen.getByRole('button', { type: /submit/i });
        expect(btn).toBeInTheDocument();

    });

});