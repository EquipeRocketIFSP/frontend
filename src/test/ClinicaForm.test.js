import "@testing-library/react/dont-cleanup-after-each";
import { render, screen, cleanup } from "@testing-library/react";
import Clinica from "../app/forms/components/Clinica";

describe("ClinicaForm", () => {

    afterAll(() => {
        cleanup();
    });

    render(<Clinica validationErrors={{}} />);

    test("Deve ter input de nome fantasia", () => {

        const input = screen.getByRole("textbox", { name: /Nome Fantasia*/i });

        expect(input).toHaveAttribute("name", "nome_fantasia");
    });

    test("Deve ter input de razão social", () => {

        const input = screen.getByRole("textbox", { name: /Razão Social*/i });

        expect(input).toHaveAttribute("name", "razao_social");
    });

    test("Deve ter input de CNAE", () => {

        const input = screen.getByRole("textbox", { name: /CNAE*/i });

        expect(input).toHaveAttribute("name", "cnae");
    });

});