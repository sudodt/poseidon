import React, { useEffect, useState, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';

import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { Checkbox } from 'primereact/checkbox';
import { classNames } from 'primereact/utils';
import AuthDataService from '@/services/Auth';
import { useRouter } from 'next/router';

const Register = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const { control, setError, formState: { errors }, handleSubmit, reset } = useForm();

    const onSubmit = async (data : any) => {
        setLoading(true);
        const register = await AuthDataService.register(data);
        if (!register.data.error) {
            router.push(`/auth/verify?email=${register.data.email}&uuid=${register.data.uuid}`);
        }
        else {
            const errorMessages = register.data?.error?.errors || [];
            for (var key in errorMessages) {
                setError(key, { type : "manual", message : errorMessages[key]})
            }
        }
        setLoading(false);
    };

    const getFormErrorMessage = (name : any) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>
    };

    return (
        <div className="form-register">
            <div className="card">
                <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                <div className="p-col-12">
                    <div className="p-field">
                        <span className="p-float-label">
                            <Controller name="name" control={control}
                                rules={{ required: 'Họ tên không thể bỏ trống.' }} render={({ field, fieldState }) => (
                                    <InputText id={field.name} {...field}
                                        autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                            <label htmlFor="name" className={classNames({ 'p-error': errors.name })}>Họ tên*</label>
                        </span>
                        {getFormErrorMessage('name')}
                    </div>
                    </div>
                    <div className="p-col-12">
                    <div className="p-field">
                        <span className="p-float-label p-input-icon-right">
                            <i className="pi pi-phone" />
                            <Controller name="phone" control={control}
                                rules={{ required: 'Số điện thoại không thể bỏ trống.' }}
                                render={({ field, fieldState }) => (
                                    <InputText id={field.name} {...field}
                                        className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                            <label htmlFor="phone" className={classNames({ 'p-error': !!errors.phone })}>Số điện thoại*</label>
                        </span>
                        {getFormErrorMessage('phone')}
                    </div>
                    </div>
                    <div className="p-col-12">
                    <div className="p-field">
                        <span className="p-float-label p-input-icon-right">
                            <i className="pi pi-envelope" />
                            <Controller name="email" control={control}
                                rules={{ required: 'Email không thể bỏ trống.', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: 'Invalid email address. E.g. example@email.com' } }}
                                render={({ field, fieldState }) => (
                                    <InputText id={field.name} {...field}
                                        className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                            <label htmlFor="email" className={classNames({ 'p-error': !!errors.email })}>Email*</label>
                        </span>
                        {getFormErrorMessage('email')}
                    </div>
                    </div>
                    <div className="p-col-12">
                    <div className="p-field">
                        <span className="p-float-label">
                            <Controller name="password" control={control} rules={{ required: 'Mật khẩu không thể bỏ trống.' }} render={({ field, fieldState }) => (
                                <Password id={field.name} {...field} toggleMask
                                    className={classNames({ 'p-invalid': fieldState.invalid })}/>
                            )} />
                            <label htmlFor="password" className={classNames({ 'p-error': errors.password })}>Mật khẩu*</label>
                        </span>
                        {getFormErrorMessage('password')}
                    </div>
                    </div>
                    <div className="p-col-12">
                    <div className="p-field">
                        <span className="p-float-label">
                            <Controller name="password_confirmation" control={control} rules={{ required: 'Nhập lại khẩu không thể bỏ trống.' }} render={({ field, fieldState }) => (
                                <InputText id={field.name} {...field}
                                    type="password"
                                    className={classNames({ 'p-invalid': fieldState.invalid })} />
                            )} />
                            <label htmlFor="password_confirmation" className={classNames({ 'p-error': errors.password_confirmation })}>
                                Nhập lại mật khẩu*
                            </label>
                        </span>
                        {getFormErrorMessage('password_confirmation')}
                    </div>
                    </div>
                    <div className="p-col-12">
                    <div className="p-field-checkbox">
                        <Controller name="accept" control={control} rules={{ required: true }} render={({ field, fieldState }) => (
                            <Checkbox inputId={field.name} onChange={(e) => field.onChange(e.checked)} checked={field.value} className={classNames({ 'p-invalid': fieldState.invalid })} />
                        )} />
                        <label htmlFor="accept" className={classNames({ 'p-error': errors.accept })}>Tôi đồng ý với các chính sách và điều khoản thành viên của Bdstotnhat.com*</label>
                    </div>
                    </div>

                    <Button type="submit" label="Đăng kí" className="p-mt-2 p-ripple" 
                        loading={loading}/>
                </form>
            </div>
        </div>
    );
}

export default Register;