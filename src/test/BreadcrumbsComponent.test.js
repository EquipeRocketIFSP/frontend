import { render, screen } from "@testing-library/react";
import Breadcrumbs from "../app/components/breadcrumbs/Breadcrumbs";

describe("Breadcrumbs", () => {

    render(<Breadcrumbs >
        <li className="breadcrumb-item">Teste1</li>
        <li className="breadcrumb-item">Teste2</li>
    </Breadcrumbs>);

    test("Deve renderizar os itens corretamente", () => {

        const items = screen.getAllByRole("listitem")
        const itemNames = items.map(item => item.textContent)
        expect(itemNames).toEqual(["Teste1", "Teste2"])
    });

});