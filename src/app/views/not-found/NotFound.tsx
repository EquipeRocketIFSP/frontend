import {Link} from "react-router-dom";
import Storages from "../../Storages";

export default function NotFound(): JSX.Element {
    const userData = Storages.userStorage.get();

    return (
        <div className="d-flex align-items-center justify-content-center vh-100">
            <div className="text-center">
                <h1 className="display-1 fw-bold">404</h1>
                <p className="fs-3"><span className="text-danger">Ops!</span> Página não encontrada</p>

                <Link to={userData ? "/painel" : "/"} className="btn btn-primary">Ir à página inicial</Link>
            </div>
        </div>
    );
}