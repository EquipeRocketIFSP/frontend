import React, {useState} from "react";
import {Button} from "react-bootstrap";

export default function MultiGroups(props: React.PropsWithChildren) {
    const [childrens, setChildrens] = useState<React.ReactNode[]>([props.children]);

    const addChild = () => setChildrens([...childrens, props.children]);
    const popChild = () => {
        const copyChildrens = [...childrens];
        copyChildrens.pop();

        setChildrens(copyChildrens);
    }

    return (
        <>
            {
                childrens.map((child,i)=>{
                    return(
                        <div>
                            <div>{i+1}</div>
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