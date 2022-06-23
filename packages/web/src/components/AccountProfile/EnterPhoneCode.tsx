import React, { useState, useEffect, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { useForm, Controller } from 'react-hook-form';
import AccountService from '@/services/Account';
import Cookies from 'universal-cookie';
import { Toast } from 'primereact/toast';
import { useRouter } from 'next/router';

type Props = {
    phoneNumber: string,
    appVerify: any,
    confirmationResult: any,
    account: any,
    type: any
}

const EnterPhoneCode = (props: Props) => {
    const cookie = new Cookies();
    const token = cookie.get('USER_TOKEN');
    const toastRef = useRef(null);
    const account = props.account || {};
    const router = useRouter();
    const { control, formState: { errors }, handleSubmit, reset } = useForm();
    const getFormErrorMessage = (name: string) => {
        return errors[name] && <small className={"p-error"}>{errors[name].message}</small>
    };
    const onSubmit = (data: any) => {
        props.confirmationResult.confirm(data.code).then((result : any) => {
            // User signed in successfully.
            const user = result.user;
            const verify : any = AccountService.verifyFirebaseUser(token, {
                'firebase_uid' : user.uid
            });

            if (!verify.error) {
                AccountService.updateProfile(token, {
                    'phone' : props.phoneNumber,
                    'type_id' : props.type,
                    'name' : account.name,
                    'email' : account.email,
                });
                router.push(router?.query?.countinue + '' || '/accounts');
            } 
          }).catch((error : any) => {
              // @ts-ignore
              toastRef.current.show({ severity: 'error', summary: 'Lỗi', detail: 'Mã xác thực không chính xác' });
          });
    }

    return (
        <React.Fragment>
            <Toast ref={toastRef} />
            <Dialog
                visible={!!props.confirmationResult}
                // visible={true}
                onHide={() => {}}
                position="top"
                showHeader={false}
                breakpoints={{ '960px': '80vw' }}
                style={{ width: '30vw' }}>
                <div className={"p-d-flex p-ai-center p-dir-col p-pt-6"}>
                    <i className="pi pi-check-circle"
                        style={{ fontSize: '5rem', color: 'var(--green-500)' }} />
                    <h5 className={'p-text-center'}>Một tin nhắn chứa mã xác thực bao gồm 6 kí tự vừa được gửi đến số điện thoại bạn vừa đăng kí, nhập mã để tiếp tục</h5>

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
                        <div className="p-field">
                            <a href="#">Tôi không nhận được mã xác thực ? Gửi lại</a>
                        </div>
                        <div className="p-d-flex p-jc-center">
                            <Button type="submit" label="Xác thực" className="p-mt-2 p-ripple" >
                            </Button>
                        </div>

                    </form>

                </div>
            </Dialog>
        </React.Fragment>
    )
}

export default EnterPhoneCode;
