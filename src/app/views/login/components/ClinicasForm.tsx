import React from "react";
import {Button, Row} from "react-bootstrap";
import Contracts from "../../../contracts/Contracts";

interface Props {
    clinicas: Contracts.ClinicaFromDataLogin[],
    setClinica: (clinica: Contracts.ClinicaFromDataLogin) => void
}

export default function ClinicasForm(props: Props): JSX.Element {
    const {clinicas, setClinica} = props;

    return (
        <Row className="d-flex justify-content-center col-12 clinicas-list">
            <p style={{textAlign: "center"}}>Selecione a clínica que deseja entrar:</p>

            {
                clinicas.map((clinica) => {
                    return (
                        <Button className="w-75 mb-3" variant="outline-primary" onClick={() => setClinica(clinica)}>
                            {clinica.nome}
                        </Button>
                    );
                })
            }
        </Row>
    );
}