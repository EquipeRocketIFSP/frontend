import {Form, Row} from "react-bootstrap";
import React, {useContext, useState} from "react";

import Components from "../../../../../../components/Components";
import Contracts from "../../../../../../contracts/Contracts";
import MedicationStockSelect from "./MedicationStockSelect";
import MedicationSelect from "./MedicationSelect";

export default function Medications(props: Contracts.Procedimento) {
    const [selectedMedication, setSelectedMedication] = useState<Contracts.ReactSelectOption>();
    const [selectedMeasure, setSelectedMeasure] = useState<string>(props.lote?.medida ?? "");

    const {validationErrors} = useContext(Components.FormSubmitContext);

    return (
        <Row>
            <MedicationSelect validationErrors={validationErrors} setSelectedItem={setSelectedMedication}
                              data={props.medicamento ?? undefined}/>

            {
                selectedMedication ?
                    <MedicationStockSelect
                        validationErrors={validationErrors}
                        medication={selectedMedication}
                        setSelectedMesure={setSelectedMeasure}
                        data={props.lote ?? undefined}/> : <></>
            }

            {
                selectedMeasure.length ?
                    <Form.Group className="mb-3 col-lg-12">
                        <Form.Label>Dose*</Form.Label>

                        <div className="d-flex justify-content-between">
                            <Form.Control className="me-2" type="number" step="0.1" min="0" name="dose"
                                          defaultValue={props.dose ?? undefined} required/>
                            <Form.Text><b>{selectedMeasure}</b></Form.Text>
                        </div>
                    </Form.Group> : <></>
            }
        </Row>
    );
}