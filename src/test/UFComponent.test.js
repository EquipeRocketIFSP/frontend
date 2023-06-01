import { render, screen } from "@testing-library/react";
import UF from "../app/components/uf/UF";

describe("UF", () => {

    test("Deve estar na página", () => {
        render(<UF name="uf" />);

        const cep = screen.getByRole("combobox", { name: /Estado*/i });

        expect(cep).toBeInTheDocument();
    });
});