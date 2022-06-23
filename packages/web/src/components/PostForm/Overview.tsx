
import React, { useState, useEffect, useRef } from 'react';
import dynamic from "next/dynamic";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Card } from 'primereact/card';
import { useFormContext, Controller } from 'react-hook-form';
import { classNames } from 'primereact/utils';
import { InputText } from 'primereact/inputtext';
import { RadioButton } from 'primereact/radiobutton';
import { Dropdown } from 'primereact/dropdown';
import { Messages } from 'primereact/messages';

import app from '../../config/app.json';
const MapView = dynamic(() => import("./MapView"), { ssr: false });

import { fetchLocationsRequest } from "@/redux/actions/locationsAction";
import { fetchSpecialtiesRequest } from "@/redux/actions/postsAttributesAction";
import { FETCH_DISTRICTS, FETCH_WARDS, FETCH_STREETS, FETCH_AREAS } from "@/redux/reducers/locationsReducer";

const Overview = (props: any) => {
    const { control, formState: { errors }, handleSubmit, reset, setValue, watch } = useFormContext();
    const watchDemand = watch('demand_id');
    const watchCategory = watch('category_id');
    const city = watch('city_id');
    const district = watch('district_id');
    const locations = props.locations;
    const postsAttributes = props.postsAttributes;
    const specialties = postsAttributes.specialties;
    const messageRef = useRef(null);

    useEffect(() => {
        if (city) {
            props.fetchLocationsRequest({type: FETCH_DISTRICTS, parent_id : city.id})
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [city])

    useEffect(() => {
        if (district) {
            props.fetchLocationsRequest({type: FETCH_WARDS, parent_id : district.id})
            props.fetchLocationsRequest({type: FETCH_STREETS, parent_id : district.id})
            props.fetchLocationsRequest({type: FETCH_AREAS, parent_id : district.id})
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [district])
    useEffect(() => {
        if (watchCategory.id) {
            props.fetchSpecialtiesRequest(watchCategory.id);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [watchCategory])

    const getFormErrorMessage = (name: string) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>
    };
    return (
        <div className={"container"}>
            <Card>
                <h3>1. Vị trí & nhu cầu</h3>

                <div className={"p-grid"}>
                    <div className={"p-md-6 p-lg-6 p-col-12"}>

                        <div className="p-field">
                            <div className="p-grid">
                                <div className="p-md-2 p-lg-2 p-col-12">
                                    <label className={classNames({ 'p-error': !!errors.demand })}>Nhu cầu*</label>
                                </div>
                                <div className="p-md-8 p-lg-8 p-col-12">
                                    <Controller name="demand_id" control={control}
                                        rules={{ required: 'Nhu cầu không thể bỏ trống' }}
                                        render={({ field, fieldState }) => (
                                            <>
                                                {app.demandData.map(opt => {
                                                    return (
                                                        <div className="p-field-radiobutton" key={opt.id}>
                                                            <RadioButton id={`demand-${opt.id}`} {...field}
                                                                value={opt.id}
                                                                checked={watchDemand === opt.id}
                                                                onChange={e => { setValue('demand_id', e.value) }} />
                                                            <label htmlFor={`demand-${opt.id}`}>{opt.label}</label>
                                                        </div>
                                                    )
                                                })}
                                            </>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="p-grid">
                            <div className="p-md-6 p-lg-6 p-col-12">
                                <div className="p-field">
                                    <span className="p-float-label p-input-icon-right">
                                        <Controller name="category_id" control={control}
                                            rules={{ required: 'Loại BĐS không thể bỏ trống' }}
                                            render={({ field, fieldState }) => (
                                                <Dropdown className={classNames({ 'p-invalid': fieldState.invalid })}
                                                    id={field.name} {...field}
                                                    options={postsAttributes.categories}
                                                    optionLabel="name"
                                                    filter
                                                    filterBy="name"
                                                />
                                            )} />
                                        <label htmlFor="category_id" className={classNames({ 'p-error': !!errors.category_id })}>Loại BĐS*</label>
                                    </span>
                                    {getFormErrorMessage('category_id')}
                                </div>
                            </div>
                            <div className="p-md-6 p-lg-6 p-col-12">
                                <div className={`p-field ${!watchCategory && 'p-d-none'}`}>
                                    <span className="p-float-label p-input-icon-right">
                                        <Controller name="specialty_id" control={control}
                                            rules={{ required: `Loại ${watchCategory?.name} không thể bỏ trống` }}
                                            render={({ field, fieldState }) => (
                                                <Dropdown className={classNames({ 'p-invalid': fieldState.invalid })}
                                                    id={field.name} {...field}
                                                    options={specialties}
                                                    optionLabel="name"
                                                    filter
                                                    showClear
                                                    filterBy="name"
                                                />
                                            )} />
                                        <label htmlFor="specialty_id" className={classNames({ 'p-error': !!errors.specialty_id })}>Loại {watchCategory?.name}</label>
                                    </span>
                                    {getFormErrorMessage('specialty_id')}
                                </div>
                            </div>
                        </div>

                        <div className="p-grid">
                            <div className="p-md-6 p-lg-6 p-col-12">
                                <div className="p-field">
                                    <span className="p-float-label p-input-icon-right">
                                        <Controller name="city_id" control={control}
                                            rules={{ required: 'Tỉnh/Thành phố không thể bỏ trống' }}
                                            render={({ field, fieldState }) => (
                                                <Dropdown className={classNames({ 'p-invalid': fieldState.invalid })}
                                                    id={field.name} {...field}
                                                    options={locations.cities}
                                                    optionLabel="full_name"
                                                    filter
                                                    filterBy="name"
                                                />
                                            )} />
                                        <label htmlFor="city_id" className={classNames({ 'p-error': !!errors.city_id })}>Tỉnh/Thành phố*</label>
                                    </span>
                                    {getFormErrorMessage('city_id')}
                                </div>
                            </div>
                            <div className={"p-md-6 p-lg-6 p-col-12"}>
                                <div className="p-field">
                                    <span className="p-float-label p-input-icon-right">
                                        <Controller name="district_id" control={control}
                                            rules={{ required: 'Quận/huyện không thể bỏ trống' }}
                                            render={({ field, fieldState }) => (
                                                <Dropdown className={classNames({ 'p-invalid': fieldState.invalid })}
                                                    id={field.name} {...field}
                                                    options={locations.districts}
                                                    optionLabel="full_name"
                                                    filter
                                                    filterBy="name"
                                                />
                                            )} />
                                        <label htmlFor="district_id" className={classNames({ 'p-error': !!errors.district_id })}>Quận/huyện*</label>
                                    </span>
                                    {getFormErrorMessage('district_id')}
                                </div>
                            </div>
                        </div>

                        <div className="p-grid">
                            <div className="p-md-6 p-lg-6 p-col-12">
                                <div className="p-field">
                                    <span className="p-float-label p-input-icon-right">
                                        <Controller name="ward_id" control={control}
                                            render={({ field, fieldState }) => (
                                                <Dropdown
                                                    id={field.name} {...field}
                                                    options={locations.wards}
                                                    optionLabel="full_name"
                                                    filter
                                                    showClear
                                                    filterBy="name"
                                                />
                                            )} />
                                        <label htmlFor="ward_id" className={classNames({ 'p-error': !!errors.ward_id })}>Phường/xã</label>
                                    </span>
                                    {getFormErrorMessage('ward_id')}
                                </div>
                            </div>
                            <div className={"p-md-6 p-lg-6 p-col-12"}>
                                <div className="p-field">
                                    <span className="p-float-label p-input-icon-right">
                                        <Controller name="street_id" control={control}
                                            render={({ field, fieldState }) => (
                                                <Dropdown className={classNames({ 'p-invalid': fieldState.invalid })}
                                                    id={field.name} {...field}
                                                    options={locations.streets}
                                                    optionLabel="full_name"
                                                    filter
                                                    filterBy="name"
                                                />
                                            )} />
                                        <label htmlFor="street_id" className={classNames({ 'p-error': !!errors.street_id })}>Đường/phố</label>
                                    </span>
                                    {getFormErrorMessage('street_id')}
                                </div>
                            </div>
                        </div>

                        <div className="p-grid">
                            <div className="p-md-6 p-lg-6 p-col-12">
                                <div className="p-field">
                                    <span className="p-float-label p-input-icon-right">
                                        <Controller name="area_id" control={control}
                                            render={({ field, fieldState }) => (
                                                <Dropdown
                                                    id={field.name} {...field}
                                                    options={locations.areas}
                                                    optionLabel="full_name"
                                                    filter
                                                    showClear
                                                    filterBy="name"
                                                />
                                            )} />
                                        <label htmlFor="area_id" className={classNames({ 'p-error': !!errors.area_id })}>Khu vực</label>
                                    </span>
                                    {getFormErrorMessage('area_id')}
                                </div>
                            </div>
                            <div className={"p-md-6 p-lg-6 p-col-12"}>
                                <div className="p-field">
                                    <span className="p-float-label p-input-icon-right">
                                        <Controller name="address" control={control}
                                            render={({ field, fieldState }) => (
                                                <InputText id={field.name} {...field}
                                                    className={classNames({ 'p-invalid': fieldState.invalid })} />
                                            )} />
                                        <label htmlFor="address" className={classNames({ 'p-error': !!errors.address })}>Địa chỉ/số nhà</label>
                                    </span>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className={"p-md-6 p-lg-6 p-col-12"}>
                        <MapView/>
                    </div>
                </div>
            </Card>
        </div>
    );
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        fetchLocationsRequest: bindActionCreators(fetchLocationsRequest, dispatch),
        fetchSpecialtiesRequest: bindActionCreators(fetchSpecialtiesRequest, dispatch),
    }
  }

const mapStateToProps = ({ locations, postsAttributes, postSpecialties }: any) => ({
    locations: locations,
    postsAttributes: postsAttributes,
    postSpecialties: postSpecialties
});

export default connect(mapStateToProps, mapDispatchToProps)(Overview)