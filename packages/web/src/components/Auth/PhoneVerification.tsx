import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { useRouter } from 'next/router'
import { useForm, Controller } from 'react-hook-form';
import { classNames } from 'primereact/utils';
import { InputText } from 'primereact/inputtext';
import { Ripple } from 'primereact/ripple';
import AuthDataService from '@/services/Auth';

type Props = {
    showVerify: any,
    setVerify: any,
    account: any
}
const PhoneVerification = (props: Props) => {
    const router = useRouter();
    const { control, formState: { errors }, handleSubmit, reset } = useForm();
    const getFormErrorMessage = (name: string) => {
        return errors[name] && <small className={"p-error"}>{errors[name].message}</small>
    };

    const onSubmit = (data: any) => {
        props.showVerify.confirm(data.code).then((result : any) => {
            const user = result.user;
            AuthDataService.phoneVerification(Object.assign({uid : user.localId}, props.account));
            router.push('/accounts');
          }).catch((error : any) => {
            // User couldn't sign in (bad verification code?)
            // ...
          });
    }

    return (
        <Dialog
            visible={props.showVerify}
            onHide={() => props.setVerify(false)}
            position="top"
            showHeader={false}
            breakpoints={{ '960px': '80vw' }}
            style={{ width: '30vw' }}>
            <div className={"p-d-flex p-ai-center p-dir-col p-pt-6"}>
                <i className="pi pi-check-circle"
                    style={{ fontSize: '5rem', color: 'var(--green-500)' }} />
                <h5 className={'p-text-center'}>Một tin nhắn chứa mã xác thực vừa gửi đến số điện thoại bạn vừa đăng kí, nhập mã để tiếp tục</h5>

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
                        {getFormErrorMessage('code')}
                    </div>

                    <div className="p-d-flex p-jc-center">
                        <Button type="submit" label="Tiếp tục" className="p-mt-2 p-ripple" >
                            <Ripple />
                        </Button>
                    </div>

                </form>

            </div>
        </Dialog>
    );
}

export default PhoneVerification;