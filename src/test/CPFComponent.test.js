
import { render, screen, cleanup } from "@testing-library/react";
import CPF from "../app/components/cpf/CPF";
import userEvent from "@testing-library/user-event";

describe("CPF", () => {

    test("Deve estar na página", () => {
        render(<CPF validationErrors={[]} />);

        const cpf = screen.getByRole("textbox", { name: /CPF*/i });

        expect(cpf).toBeInTheDocument();
    });

    test("Deve ter valor default caso seja especificado", () => {
        render(<CPF validationErrors={{}} cpf="685.721.720-33" />);

        const cpf = screen.getByRole("textbox", { name: /CPF*/i });

        expect(cpf).toHaveValue("685.721.720-33");
    });

    test("Deve ter mostrar mensagem de erro caso a receba por props", () => {
        render(<CPF validationErrors={{ cpf: "teste erro" }} />);

        const error = screen.getByText("teste erro");

        expect(error).toBeInTheDocument();
    });

    test("Deve mostrar mensagem de erro caso seja digitado um CPF inválido", () => {
        render(<CPF validationErrors={{}} />);

        const cpf = screen.getByRole("textbox", { name: /CPF*/i });
        userEvent.type(cpf, "44333444343");

        const error = screen.getByText("Insira um CPF válido")
        expect(error).toBeInTheDocument();
    });

    test("Deve remover mensagem de erro caso existente seja digitado um CPF válido", () => {
        render(<CPF validationErrors={{ cpf: "teste erro" }} />);

        const cpf = screen.getByRole("textbox", { name: /CPF*/i });
        userEvent.type(cpf, "46125092852");

        expect(screen.queryByText("teste erro")).not.toBeInTheDocument();
    });

    test("Não deve mostrar mensagem de erro caso seja digitado um CPF válido", () => {
        render(<CPF validationErrors={{}} />);

        const cpf = screen.getByRole("textbox", { name: /CPF*/i });
        userEvent.type(cpf, "46125092852");

        expect(screen.queryByText("Insira um CPF válido")).not.toBeInTheDocument();
    });

    test("Deve ter name no input de acordo com o props", () => {
        render(<CPF validationErrors={{}} name="nometeste"/>);

        const cpf = screen.getByRole("textbox", { name: /CPF*/i });

        expect(cpf).toHaveAttribute("name", "nometeste");
    })
});