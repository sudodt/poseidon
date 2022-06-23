import React, { useState, useEffect, useMemo } from 'react';
import { Card } from 'primereact/card';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import {Password} from 'primereact/password';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchAccountRequest } from "@/redux/actions/accountsAction";
import AccountDataService from '@/services/Account';
import Cookies from 'universal-cookie';
import { Button } from 'primereact/button';

const mapStateToProps = ({ accounts, locations }: any) => ({
    locations: locations || {},
});

const mapDispatchToProps = (dispatch: any) => {
    return {
        fetchAccountRequest: bindActionCreators(fetchAccountRequest, dispatch),
    }
}

const ChangePassword = (props: any) => {
    const account = props.account;
    const cookie = new Cookies();
    const token = cookie.get('USER_TOKEN');
    const [loading, setLoading] = useState(false);
    const methods = useForm();
    const { control, formState: { errors }, handleSubmit, reset, setError, watch } = methods;
    const onSubmit = async (data: any) => {
        console.log(data);
        // await AccountDataService.updateProfile(token, {
        //     'name' : data.name,
        //     'email' : data.email,
        //     'phone' : data.phone,
        //     'type_id' : data.type?.id,
        //     'city_id' : data.profile?.city?.id,
        //     'district_id' : data.profile?.district?.id,
        // });
        props.fetchAccountRequest({ token: token, isServer: false });
    }

    useEffect(() => {
        reset(props.account);
    }, [props.account, reset])

    return (
        <React.Fragment>
            <Card>
                <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                    <div className="p-grid">
                        <div className="p-col-12">
                            <div className="p-field">
                                <label htmlFor="name" className="p-d-block">Mật khẩu cũ*</label>
                                <Controller name="password" control={control}
                                    rules={{ required: 'Họ tên không thể bỏ trống' }}
                                    render={({ field, fieldState }) => (
                                        <Password id="password"
                                            {...field}
                                            feedback={false}
                                            toggleMask
                                            onChange={(e: any) => field.onChange(e)} />
                                    )} />
                            </div>
                        </div>

                        <div className="p-col-12">
                            <div className="p-field">
                                <label htmlFor="profile.city" className="p-d-block">Mật khẩu mới*</label>
                                <Controller name="new_password" control={control}
                                    rules={{ required: 'Họ tên không thể bỏ trống' }}
                                    render={({ field, fieldState }) => (
                                        <Password id="new_password"
                                            {...field}
                                            feedback={false}
                                            toggleMask
                                            onChange={(e: any) => field.onChange(e)} />
                                    )} />
                            </div>
                        </div>

                        <div className="p-col-12">
                            <div className="p-field">
                                <label htmlFor="profile.district" className="p-d-block">Nhập lại mật khẩu mới*</label>
                                <Controller name="new_password_confirmation" control={control}
                                    rules={{ required: 'Họ tên không thể bỏ trống' }}
                                    render={({ field, fieldState }) => (
                                        <Password id="new_password_confirmation"
                                            {...field}
                                            feedback={false}
                                            toggleMask
                                            onChange={(e: any) => field.onChange(e)} />
                                    )} />
                            </div>
                        </div>

                        <div className="p-col-12">
                                <div className="p-d-flex">
                                    <Button label="Cập nhật"
                                        type="submit" />
                                </div>
                            </div>
                    </div>
                </form>
            </Card>
        </React.Fragment>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword)
