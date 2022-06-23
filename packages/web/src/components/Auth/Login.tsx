import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router'
import { useForm, Controller } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { Checkbox } from 'primereact/checkbox';
import { Dialog } from 'primereact/dialog';
import { classNames } from 'primereact/utils';
import { Ripple } from 'primereact/ripple';
import { Messages } from 'primereact/messages';
import Link from 'next/link';
import styles from "./AuthLayout.module.scss"

import Cookies from 'universal-cookie';
import AuthDataService from '@/services/Auth';

const Login = () => {
    const cookie = new Cookies();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const message = useRef(null);

    const { control, formState: { errors }, handleSubmit, reset } = useForm();

    const onSubmit = async (data: any) => {
        // @ts-ignore: Object is possibly 'null'.
        message.current.clear();
        setLoading(true);
        const response = await AuthDataService.login(data);
        if (response.status === 423) {
            const data = response.data;
            return router.push(`/auth/verify?email=${data.data?.email}&uuid=${data.data?.uuid}`);
        }
        if (response.error) {
            // @ts-ignore: Object is possibly 'null'.
            message.current.show([
                { severity: 'error', summary: 'Tài khoản hoặc mật khẩu không đúng' },
            ])
        }
        else {
            let next = String(router?.query?.countinue || '/accounts');
            cookie.set('USER_TOKEN', response?.data?.access_token, { path: '/' });
            const account = await AuthDataService.getAccount(response?.data?.access_token);
            cookie.set('USER_PROFILE', JSON.stringify(account?.data), { path: '/' });
            router.push(next);
        }
        setLoading(false);
    };

    const getFormErrorMessage = (name: any) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>
    };

    return (
        <div className="form-login p-mt-3">
            <div className="card">
                <div className="p-pb-2">
                    <Messages ref={message} />
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                    <div className="p-col-12">
                        <div className="p-field">
                            <span className="p-float-label p-input-icon-right">
                                <i className="pi pi-phone" />
                                <Controller name="email" control={control}
                                    rules={{ required: 'Số điện thoại không thể bỏ trống.' }}
                                    render={({ field, fieldState }) => (
                                        <InputText id={field.name} {...field}
                                            className={classNames({ 'p-invalid': fieldState.invalid })} />
                                    )} />
                                <label htmlFor="email" className={classNames({ 'p-error': !!errors.email })}>Email*</label>
                            </span>
                            {getFormErrorMessage('account')}
                        </div>
                    </div>
                    <div className="p-col-12">
                        <div className="p-field">
                            <span className="p-float-label">
                                <Controller name="password" control={control} rules={{ required: 'Mật khẩu không thể bỏ trống.' }} render={({ field, fieldState }) => (
                                    <Password id={field.name} {...field} toggleMask
                                        feedback={false}
                                        className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                                <label htmlFor="password" className={classNames({ 'p-error': errors.password })}>Mật khẩu*</label>
                            </span>
                            {getFormErrorMessage('password')}
                        </div>
                    </div>


                    <div className={'p-grid p-mt-2'}>
                        <div className={'p-md-6'}>
                            <div className="p-field-checkbox">
                                <Controller name="remember" control={control} rules={{ required: false }} render={({ field, fieldState }) => (
                                    <Checkbox inputId={field.name} onChange={(e) => field.onChange(e.checked)} checked={field.value} className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                                <label htmlFor="remember" className={classNames({ 'p-error': errors.remember })}>Ghi nhớ</label>
                            </div>
                        </div>
                        <div className="p-md-6 p-d-flex p-jc-end">
                            <Link href="/auth/forgot-password">
                                <a>Quên mật khẩu ?</a>
                            </Link>
                        </div>
                    </div>

                    <Button type="submit"
                        loading={loading}
                        label="Đăng nhập" className="p-mt-2 p-ripple" >
                        <Ripple />
                    </Button>

                    <div className={'p-grid p-mt-2'}>
                        <div className={'p-md-6'}>
                            <Button className={`${styles.google} p-ripple`} type="button">
                                <i className="pi pi-google p-px-2"></i>
                                <span className="p-px-3">Google</span>
                                <Ripple />
                            </Button>
                        </div>
                        <div className={'p-md-6'}>
                            <Button className={`${styles.facebook} p-ripple`} type="button">
                                <i className="pi pi-facebook p-px-2"></i>
                                <span className="p-px-3">Facebook</span>
                                <Ripple />
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;