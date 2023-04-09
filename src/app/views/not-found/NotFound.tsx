import Layouts from "../../layouts/Layouts";
import {Container} from "react-bootstrap";

export default function NotFound():JSX.Element{
    return (
        <Layouts.Layout>
            <Container>
                <h1>Página não encontrada</h1>
            </Container>
        </Layouts.Layout>
    );
}