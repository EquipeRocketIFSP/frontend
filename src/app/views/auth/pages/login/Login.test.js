import { render, screen } from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom';
import Login from "./Login";

describe("Formulário de login de acordo com DTO", () => {

    render(<Login />, { wrapper: MemoryRouter });

    test("Campo do código da clínica", () => {
        const clinica = screen.getByPlaceholderText('Código da Clínica');
        expect(clinica).toHaveAttribute("name", "clinica");
    });
});