import React, {useState} from "react";
import {Badge, Button} from "react-bootstrap";

interface Props extends React.PropsWithChildren {
    componentType?: any
}

export default function MultiGroups(props: Props) {
    const [childrens, setChildrens] = useState<React.ReactNode[]>([
        props.componentType ?
            factoryComponentType(props.componentType) :
            props.children
    ]);

    const addChild = () => setChildrens([
        ...childrens,
        props.componentType ?
            factoryComponentType(props.componentType) :
            props.children
    ]);

    const popChild = () => {
        const copyChildrens = [...childrens];
        copyChildrens.pop();

        setChildrens(copyChildrens);
    }

    return (
        <>
            {
                childrens.map((child, i) => {
                    return (
                        <div key={i}>
                            <Badge bg="primary">{i + 1}</Badge>
                            <div>{child}</div>
                        </div>
                    );
                })
            }

            <div className="d-flex justify-content-lg-center">
                <Button onClick={addChild} variant="outline-primary">
                    <i className="fa-solid fa-plus"></i>
                </Button>

                {
                    childrens.length > 1 ?
                        (
                            <Button onClick={popChild} variant="outline-danger" className="mx-2">
                                <i className="fa-solid fa-trash"></i>
                            </Button>
                        ) :
                        <></>
                }
            </div>
        </>
    );
}

function factoryComponentType(componentType: React.FunctionComponent) {
    const key = crypto.randomUUID();

    return React.createElement(componentType, {key});
}