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

const ForgotPassword = (props : any) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const defaultValues = {
        email: '',
    }

    const { control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues });

    const onSubmit = async (data: any) => {
        setLoading(true);
        const result = await AuthDataService.forgotPassword(data);
        setLoading(false);
        if (!result.data.error) {
            router.push('/auth/login');
        }
        else {
            const errors = result.data.error.errors;
            console.log(errors);
        }
    }

    return (
        <div className={styles.wrapper}>
            <div className="container">
                <div className="p-grid">
                    <div className="p-col-12 p-md-6 p-md-offset-3">
                        <Card className={"p-mt-3"}>
                            <TabView
                                className={styles.tabView}
                                activeIndex={0}>
                                <TabPanel header="Quên mật khẩu">
                                    <div className="card">
                                        <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                                            <div className="p-field">
                                                <span className="p-float-label">
                                                    <Controller name="email" control={control}
                                                        rules={{ required: 'Email không thể bỏ trống.', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: 'Invalid email address. E.g. example@email.com' } }} render={({ field, fieldState }) => (
                                                            <InputText id={field.name} {...field}
                                                                autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                                        )} />
                                                    <label htmlFor="email" className={classNames({ 'p-error': errors.email })}>Email*</label>
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

export default ForgotPassword;