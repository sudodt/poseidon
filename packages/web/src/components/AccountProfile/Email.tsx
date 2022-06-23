import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { InputText } from 'primereact/inputtext';
import styles from './AccountProfile.module.scss';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { classNames } from 'primereact/utils';
import { useForm, Controller } from 'react-hook-form';

type Props = {
    account: any | null,
    editMode: boolean,
}

const Email = (props: Props) => {
    const account = props.account;
    const [visible, setVisible] = useState(false);
    const { control, formState: { errors }, handleSubmit, reset } = useForm();
    const getFormErrorMessage = (name: string) => {
        return errors[name] && <small className={"p-error"}>{errors[name].message}</small>
    };

    const onSubmit = (data: any) => {
        console.log(data)
    }

    return (
        <React.Fragment>
            <div className={`p-field ${styles.field}`}>
                <label htmlFor="name" className="p-d-block">Email</label>
                <InputText
                    readOnly={!props.editMode  ? true : false}
                    value={account.email}/>
                <Button label="Cập nhật"
                    icon="pi pi-pencil"
                    onClick={(e : any) => {setVisible(!visible)}}
                    className={`p-button-text ${styles.rightButton}`}/>
            </div>
            <Dialog
                visible={visible}
                onHide={() => {}}
                position="top"
                showHeader={false}
                breakpoints={{ '960px': '80vw' }}
                style={{ width: '30vw' }}>
                <div className={"p-d-flex p-ai-center p-dir-col p-pt-6"}>
                    <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                        <div className="p-field w-100">
                            <span className="p-float-label">
                                <Controller name="code" control={control}
                                    rules={{ required: 'Mã xác thực không thể bỏ trống.' }} render={({ field, fieldState }) => (
                                        <InputText id={field.name} {...field}
                                            autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                    )} />
                                <label htmlFor="code" className={classNames({ 'p-error': errors.code })}>Email mới *</label>
                            </span>
                            {getFormErrorMessage('code')}
                        </div>
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
                            <Button type="submit" label="Cập nhật" className="p-mt-2 p-ripple" >
                            </Button>
                        </div>

                    </form>

                </div>
            </Dialog>
        </React.Fragment>
    )
}

export default connect(null, null)(Email)
