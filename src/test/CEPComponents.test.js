
import { render, screen, cleanup } from "@testing-library/react";
import CEP from "../app/components/cep/CEP";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

describe("CEP", () => {

    test("Deve estar na página", () => {
        render(<CEP name="cep" />);

        const cep = screen.getByRole("textbox", { name: /CEP*/i });

        expect(cep).toBeInTheDocument();
    });

    test("Deve adicionar máscara ao digitar CEP", () => {
        render(<CEP name="cep" />);

        const cep = screen.getByRole("textbox", { name: /CEP*/i });

        // eslint-disable-next-line testing-library/no-unnecessary-act
        act(() => {
            userEvent.type(cep, "76900274");
        });

        expect(cep).toHaveValue("76900-274");
    });

    test("Deve mostrar valor padrão caso receba por props", () => {
        render(<CEP name="cep" defaultValue="77020-608" />);

        const cep = screen.getByRole("textbox", { name: /CEP*/i });

        expect(cep).toHaveValue("77020-608");
    });
});