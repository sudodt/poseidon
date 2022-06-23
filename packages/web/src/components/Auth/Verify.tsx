import React, { useState, useEffect } from "react";
import styles from './AuthLayout.module.scss';
import { Card } from 'primereact/card';
import { TabView, TabPanel } from 'primereact/tabview';
import { useRouter } from 'next/router'
import { useForm, Controller } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { Button } from 'primereact/button';
import { Ripple } from 'primereact/ripple';
import AuthDataService from '@/services/Auth';

const Verify = (props : any) => {
    const router = useRouter();
    const email = router.query?.email || false;
    const uuid = router.query?.uuid || false;
    const [loading, setLoading] = useState(false);

    const { control, formState: { errors }, handleSubmit, reset } = useForm();

    const onSubmit = async (data : any) => {
        data.email = email;
        data.uuid = uuid;
        setLoading(true);
        const result = await AuthDataService.verify(data);
        setLoading(false);
        if (!result.data.error) {
            router.push('/accounts');
        }
        else {
            const errors = result.data.error.errors;
        }
    }

    useEffect(() => {
        // const result = await AuthDataService.checkNeedVerification(data);
    }, [email, uuid]);

    return (
        <div className={styles.wrapper}>
            <div className="container">
                <div className="p-grid">
                    <div className="p-col-12 p-md-6 p-md-offset-3">
                        <Card className={"p-mt-3"}>
                            <TabView
                                className={styles.tabView}
                                activeIndex={0}>
                                <TabPanel header="Xác nhận tài khoản">
                                    <div className="card">
                                        <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                                            <div className="p-field">
                                                <span className="p-float-label">
                                                    <Controller name="code" control={control}
                                                        rules={{ required: 'Mã xác thực không thể bỏ trống.' }} render={({ field, fieldState }) => (
                                                            <InputText id={field.name} {...field}
                                                                autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                                        )} />
                                                    <label htmlFor="code" className={classNames({ 'p-error': errors.code })}>Mã xác thực*</label>
                                                </span>
                                            </div>
                                            <Button type="submit"
                                                loading={loading}
                                                label="Tiếp tục" className="p-mt-2 p-ripple" >
                                                <Ripple />
                                            </Button>
                                        </form>
                                    </div>
                                </TabPanel>
                            </TabView>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Verify;