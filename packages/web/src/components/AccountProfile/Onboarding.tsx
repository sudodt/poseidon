import React, { useState, useEffect, useRef } from "react";
import styles from '../Auth/AuthLayout.module.scss';
import { Card } from 'primereact/card';
import { TabView, TabPanel } from 'primereact/tabview';
import { useRouter } from 'next/router'
import { useForm, Controller } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { Button } from 'primereact/button';
import { Ripple } from 'primereact/ripple';
import { RadioButton } from 'primereact/radiobutton';
import AccountService from '@/services/Account';
import users from '@/config/user.json'
import { connect } from 'react-redux';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import firebase from "@/utils/firebase";
import Cookies from 'universal-cookie';
import EnterPhoneCode from './EnterPhoneCode';
import { Toast } from 'primereact/toast';

const userTypes = users.types;
type Props = {
    account?: any
}
const Onboarding = (props: Props) => {
    const router = useRouter();
    const account = props.account;
    const cookie = new Cookies();
    const toastRef = useRef(null);
    const labelString = 'Tiếp tục đăng tin'
    const [appVerify, setAppVerify] = useState<any>(null);
    const [comfirmation, setConfirmation] = useState<any>(null);
    const [phone, setPhone] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const defaultValues = {
        type: userTypes[0].id + '',
        phone: account.phone
    }
    const { control, formState: { errors }, handleSubmit, reset, watch, setValue } = useForm({ defaultValues });
    const watchType: number = parseInt(watch('type'));
    const auth = getAuth(firebase);
    const onSubmit = async (data: any) => {
        setLoading(true);
        const token = cookie.get('USER_TOKEN');
        const result = await AccountService.validateUnique(token, {
            'phone': data.phone,
        });
        if (!result.error) {
            setPhone(data.phone);
            submitPhoneNumberAuth(data.phone);
        }
        setLoading(false);
    }

    useEffect(() => {
        if (typeof window !== 'undefined' && auth) {
            let recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
                'size': 'normal',
                'callback': (response: any) => {
                    setAppVerify(recaptchaVerifier)
                },
                'expired-callback': (error: any) => {
                    window.alert(`${error.code}, ${error.message}`);
                }
            }, auth);
            recaptchaVerifier.render();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const submitPhoneNumberAuth = (phoneNumber: string) => {
        return signInWithPhoneNumber(auth, `+84${phoneNumber}`, appVerify)
            .then((confirmationResult) => {
                setConfirmation(confirmationResult);
            }).catch((error) => {
                console.log(error)
            });
    };

    return (
        <div className={styles.wrapper}>
            <div className="container">
                <div className="p-grid">
                    <div className="p-col-12 p-md-6 p-md-offset-3">
                        <Toast ref={toastRef} />
                        <Card className={"p-mt-3"}>
                            <TabView
                                className={styles.tabView}
                                activeIndex={0}>
                                <TabPanel header={labelString}>
                                    <div className="card">
                                        <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                                            <div className="p-field">
                                                <label htmlFor="code" className={classNames({ 'p-error': errors.type })}>Tôi là *</label>
                                                <Controller name="type" control={control}
                                                    rules={{ required: 'Loại tài khoản không thể bỏ trống' }}
                                                    render={({ field, fieldState }) => (
                                                        <>
                                                            {userTypes.map((opt: { id: number, string: string }) => {
                                                                return (
                                                                    <div className="p-field-radiobutton" key={opt.id}>
                                                                        <RadioButton id={`type-${opt.id}`} {...field}
                                                                            value={opt.id}
                                                                            checked={watchType === opt.id}
                                                                            onChange={e => { setValue('type', e.value) }} />
                                                                        <label htmlFor={`type-${opt.id}`}>{opt.string} đăng tin</label>
                                                                    </div>
                                                                )
                                                            })}
                                                        </>
                                                    )}
                                                />
                                            </div>
                                            
                                            <div className="p-field">
                                                <label htmlFor="phone" className={classNames({ 'p-error': errors.phone })}>Số điện thoại*</label>
                                                <Controller name="phone" control={control}
                                                    rules={{ required: 'Số điện thoại không thể bỏ trống.' }} render={({ field, fieldState }) => (
                                                        <InputText id={field.name} {...field}
                                                            autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                                    )} />
                                            </div>
                                            <div className="p-field">
                                                <div id="recaptcha-container"></div>
                                            </div>
                                            <Button type="submit"
                                                loading={loading}
                                                label="Tiếp tục" className="p-mt-2 p-ripple" >
                                                <Ripple />
                                            </Button>
                                        </form>
                                        <EnterPhoneCode
                                            phoneNumber={phone}
                                            appVerify={appVerify}
                                            confirmationResult={comfirmation}
                                            account={account}
                                            type={watchType}
                                        />
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
const mapStateToProps = ({ accounts }: any) => ({
    account: accounts?.account || {},
});
export default connect(mapStateToProps, null)(Onboarding)