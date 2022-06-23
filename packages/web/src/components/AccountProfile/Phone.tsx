import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import styles from './AccountProfile.module.scss';
import { Button } from 'primereact/button';
import { useRouter } from 'next/router';

type Props = {
    editMode: any,
    account: any | null,
}

const Phone = (props: Props) => {
    const account = props.account;
    const router = useRouter();

    const onRedirect = () => {
        router.push('/accounts/onboarding?countinue=/accounts');
    }

    return (
        <React.Fragment>
            <div className={`p-field ${styles.field}`}>
                <label htmlFor="name" className="p-d-block">Số điện thoại</label>
                <InputText
                    readOnly={!props.editMode ? true : false}
                    value={account.phone} />
                <Button label="Cập nhật"
                    onClick={onRedirect}
                    icon="pi pi-pencil"
                    className={`p-button-text ${styles.rightButton}`} />
            </div>
        </React.Fragment>
    )
}

export default connect(null, null)(Phone)
