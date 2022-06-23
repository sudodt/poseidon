import React, { useState, useEffect } from "react";
import { Dialog } from 'primereact/dialog';

const EditPost = (props: any) => {
    const [visible, setVisible] = useState(props.visible);

    return (
        <>
            <Dialog 
                header="Header" 
                visible={props.visible} 
                maximizable={true} 
                modal
                onHide={() => setVisible(!visible)}
                style={{ width: '100vw', height: '100vh'}}
            >
                <p className="m-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                    laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </Dialog>
        </>
    )
}

export default EditPost;