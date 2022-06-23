import React, { useState, useEffect, useMemo } from 'react';
import { Card } from 'primereact/card';
import Avatar from './Avatar';
import Email from './Email';
import Phone from './Phone';
import { Button } from 'primereact/button';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Dropdown } from 'primereact/dropdown';
import { fetchLocationsRequest } from "@/redux/actions/locationsAction";
import { fetchAccountRequest } from "@/redux/actions/accountsAction";
import { FETCH_DISTRICTS, FETCH_CITIES } from "@/redux/reducers/locationsReducer";
import AccountDataService from '@/services/Account';
import Cookies from 'universal-cookie';

const mapStateToProps = ({ accounts, locations }: any) => ({
    account: accounts?.account || {},
    locations: locations || {},
});

const mapDispatchToProps = (dispatch: any) => {
    return {
        fetchLocationsRequest: bindActionCreators(fetchLocationsRequest, dispatch),
        fetchAccountRequest: bindActionCreators(fetchAccountRequest, dispatch),
    }
}

const Profile = (props: any) => {
    const account = props.account;
    const cookie = new Cookies();
    const token = cookie.get('USER_TOKEN');
    const [editMode, setEditMode] = useState(false);
    const methods = useForm({
        defaultValues: useMemo(() => {
            return account;
        }, [account])
    });
    const { control, formState: { errors }, handleSubmit, reset, setError, watch, setValue } = methods;
    const city = watch('city');
    const onSubmit = async (data: any) => {
        const form = new FormData();
        form.append("name", data.name);
        form.append("email", data.email);
        form.append("phone", data.phone);
        form.append("type_id", data.type.id);
        form.append("city_id", data.city?.id);
        form.append("district_id", data.district?.id);
        if (data.avatar instanceof Object) {
            form.append("avatar", data.avatar);
        }

        await AccountDataService.updateProfile(token, form);
        props.fetchAccountRequest({ token: token, isServer: false });
        setEditMode(false);
    }
    useEffect(() => {
        props.fetchLocationsRequest({
            type: FETCH_CITIES
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (city) {
            props.fetchLocationsRequest({ type: FETCH_DISTRICTS, parent_id: city?.id })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [city]);

    useEffect(() => {
        reset(props.account);
    }, [props.account, reset])

    return (
        <React.Fragment>
            <Card>
                <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                    <div className="p-grid">
                        <div className="p-col-12 p-d-flex p-jc-end">
                            <div>
                                {!editMode &&
                                    <Button label="Chỉnh sửa"
                                        onClick={(e: any) => setEditMode(!editMode)}
                                        icon="pi pi-pencil"
                                        className="p-button-text" />
                                }
                            </div>
                        </div>
                        <div className="p-col-12">
                            <Avatar 
                                editMode={editMode}
                                account={props.account}
                                setValue={setValue}
                            />
                        </div>
                        <div className="p-col-12">
                            <div className="p-field">
                                <label htmlFor="name" className="p-d-block">Họ tên</label>
                                <Controller name="name" control={control}
                                    rules={{ required: 'Họ tên không thể bỏ trống' }}
                                    render={({ field, fieldState }) => (
                                        <InputText id={field.name}
                                            readOnly={!editMode}
                                            {...field}
                                            onChange={(e: any) => field.onChange(e)} />
                                    )} />
                            </div>
                        </div>

                        <div className="p-col-6">
                            <div className="p-field">
                                <label htmlFor="city" className="p-d-block">Tỉnh/Thành phố</label>
                                <Controller name="city" control={control}
                                    render={({ field, fieldState }) => (
                                        <Dropdown
                                            {...field}
                                            value={field.value}
                                            options={props.locations.cities}
                                            onChange={(e: any) => field.onChange(e.value)}
                                            disabled={!editMode}
                                            optionLabel="full_name" placeholder="Chọn Tỉnh/Thành phố" />
                                    )} />
                            </div>
                        </div>

                        <div className="p-col-6">
                            <div className="p-field">
                                <label htmlFor="district" className="p-d-block">Quận/Huyện</label>
                                <Controller name="district" control={control}
                                    render={({ field, fieldState }) => (
                                        <Dropdown
                                            {...field}
                                            value={field.value}
                                            options={props.locations.districts}
                                            onChange={(e: any) => field.onChange(e.value)}
                                            disabled={!editMode}
                                            optionLabel="full_name" placeholder="Chọn Quận/Huyện" />
                                    )} />
                            </div>
                        </div>

                        {!editMode &&
                            <div className="p-col-12">
                                <Email 
                                    editMode={editMode} 
                                    account={props.account} 
                                />
                            </div>
                        }
                        {!editMode &&
                            <div className="p-col-12">
                                <Phone 
                                    editMode={editMode} 
                                    account={props.account} 
                                />
                            </div>
                        }

                        {editMode &&
                            <div className="p-col-12">
                                <div className="p-d-flex">
                                    <Button label="Lưu"
                                        type="submit" />
                                    <Button label="Huỷ"
                                        onClick={(e: any) => {
                                            setEditMode(false)
                                            reset()
                                        }}
                                        className="p-button-text" />
                                </div>
                            </div>
                        }
                    </div>
                </form>
            </Card>
        </React.Fragment>
    )
}



export default connect(mapStateToProps, mapDispatchToProps)(Profile)
