
import React from 'react';
import styles from "./Post.module.scss";
import { Button } from 'primereact/button';

type Props = {
    data: any
}
const FastMessage = (props: Props) => {
    const data = props.data || {};
    return (
        <Button label={`Gửi tin nhắn`}
            icon={'pi pi-comment'}
            className={`p-button-outlined ${styles.button}`} />
    );
}

export default FastMessage