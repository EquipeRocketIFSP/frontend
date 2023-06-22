import React, {useEffect, useState} from "react";
import {Badge, Button} from "react-bootstrap";

interface Props extends React.PropsWithChildren {
    componentType?: any,
    componentPropsList?: any[]
}

export default function MultiGroups(props: Props) {
    const [childrens, setChildrens] = useState<React.ReactNode[]>([]);

    const addChild = () => setChildrens([
        ...childrens,
        props.componentType ?
            factoryComponentType(props.componentType) :
            props.children
    ]);

    const popChild = (index: number) => {
        const copyChildrens = [...childrens];
        copyChildrens.splice(index, 1);

        setChildrens(copyChildrens);
    }

    useEffect(() => {
        if (!props.componentPropsList?.length)
            addChild();
        else
            setChildrens(props.componentPropsList.map((componentProps) => factoryComponentType(props.componentType, componentProps)));
    }, []);

    return (
        <>
            {
                childrens.map((child, i) => {
                    return (
                        <div key={i}>
                            <span className="badge badge-primary">{i + 1}</span>
                            <div>{child}</div>

                            <div className="d-flex justify-content-lg-center">
                                <button onClick={() => popChild(i)} type="button"
                                        className="btn btn-outline-danger mx-2">
                                    <i className="fa-solid fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    );
                })
            }

            <div className="d-flex justify-content-lg-center">
                <Button onClick={addChild} variant="outline-primary">
                    <i className="fa-solid fa-plus"></i>
                </Button>
            </div>
        </>
    );
}

function factoryComponentType(componentType: React.FunctionComponent, componentProps?: any) {
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);

    const key = array[0];

    return React.createElement(componentType, {...componentProps, key});
}