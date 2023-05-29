
import { render, screen, cleanup } from "@testing-library/react";
import CNPJ from "../app/components/cnpj/CNPJ";
import userEvent from "@testing-library/user-event";

describe("CNPJ", () => {

    test("Deve estar na página", () => {
        render(<CNPJ validationErrors={[]} />);

        const cnpj = screen.getByRole("textbox", { name: /cnpj/i });

        expect(cnpj).toBeInTheDocument();
    });

    test("Deve ter valor default caso seja especificado", () => {
        render(<CNPJ validationErrors={{}} cnpj="43.480.509/0001-91" />);

        const cnpj = screen.getByRole("textbox", { name: /cnpj/i });

        expect(cnpj).toHaveValue("43.480.509/0001-91");
    });

    test("Deve ter mostrar mensagem de erro caso a receba por props", () => {
        render(<CNPJ validationErrors={{ cnpj: "teste erro" }} />);

        const error = screen.getByText("teste erro");

        expect(error).toBeInTheDocument();
    });

    test("Deve mostrar mensagem de erro caso seja digitado um CNPJ inválido", () => {
        render(<CNPJ validationErrors={{}} />);

        const cnpj = screen.getByRole("textbox", { name: /cnpj/i });
        userEvent.type(cnpj, "43480509000193");

        const error = screen.getByText("Insira um CNPJ válido")
        expect(error).toBeInTheDocument();
    });

    test("Deve remover mensagem de erro caso seja digitado u, CNPJ válido", () => {
        render(<CNPJ validationErrors={{ cnpj: "teste erro" }} />);

        const cnpj = screen.getByRole("textbox", { name: /cnpj/i });
        userEvent.type(cnpj, "43480509000191");

        expect(screen.queryByText("teste erro")).not.toBeInTheDocument();
    });

    test("Não deve mostrar mensagem de erro caso seja digitado um CNPJ válido", () => {
        render(<CNPJ validationErrors={{}} />);

        const cnpj = screen.getByRole("textbox", { name: /cnpj/i });
        userEvent.type(cnpj, "43480509000191");

        expect(screen.queryByText("Insira um CNPJ válido")).not.toBeInTheDocument();
    });
});