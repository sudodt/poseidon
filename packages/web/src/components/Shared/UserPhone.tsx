
import React, { useState, useEffect, useCallback, useRef } from 'react';
import styles from "./Misc.module.scss";
import { Button } from 'primereact/button';
import { Ripple } from 'primereact/ripple';
import UserDataService from '@/services/User';

type Props = {
    data: any
}
const UserPhone = (props: Props) => {
    const data = props.data || {};
    const [phone, setPhone] = useState<any>(data.phone);
    const [string, setString] = useState<string>('nhấn để xem số');
    const [hasPhone, setHasPhone] = useState<boolean>(false);


    const fetchUserPhoneData = async () => {
        const usersCollection = await UserDataService.getUser('agents', data.uuid, { "_phone": 1 });
        setPhone(usersCollection?.data?.phone);
        setString('nhấn để gọi');
        setHasPhone(true);
    }
    const onClickButton = (e: any) => {
        if (hasPhone) {
            return window.open(`tel:${phone}`);
        }
        fetchUserPhoneData();
    }

    return (
        <Button label={`${phone} ${string}`}
            onClick={onClickButton}
            className={`${styles.button} p-ripple`}>
            <Ripple />
        </Button>
    );
}

export default UserPhone