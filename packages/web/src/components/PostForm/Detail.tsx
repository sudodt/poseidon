
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Card } from 'primereact/card';
import { useFormContext, Controller } from 'react-hook-form';
import { classNames } from 'primereact/utils';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import styles from "./Detail.module.scss";

import MiscCheckbox from '../Shared/Checkbox';
import * as opts from '../../config/selectOptions';

import { fetchLocationsRequest } from "@/redux/actions/locationsAction";

const Detail = (props: any) => {
    const { control, formState: { errors }, handleSubmit, reset, setValue, watch } = useFormContext();
    const attributes = props.postsAttributes?.attributes || [];

    const getFormErrorMessage = (name: string) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>
    };

    return (
        <div className={`${styles.wrapper} container`}>
            <Card>
                <h3>2. Thông tin chi tiết</h3>
                <div className={"p-grid"}>
                    <div className="p-col-12">
                        <div className="p-field">
                            <span className="p-float-label p-input-icon-right">
                                <Controller name="title" control={control}
                                    rules={{ required: 'Tiêu đề không thể bỏ trống' }}
                                    render={({ field, fieldState }) => (
                                        <InputText id={field.name} {...field}
                                            className={classNames({ 'p-invalid': fieldState.invalid })} />
                                    )} />
                                <label htmlFor="title" className={classNames({ 'p-error': !!errors.title })}>Tiêu đề*</label>
                            </span>
                            {getFormErrorMessage('title')}
                        </div>
                    </div>

                    <div className="p-md-3 p-lg-3 p-col-12">
                        <div className="p-field">
                            <span className="p-float-label p-input-icon-right">
                                <Controller name="price" control={control}
                                    rules={{ required: 'Giá không thể bỏ trống' }}
                                    render={({ field, fieldState }) => (
                                        <InputNumber id={field.name}
                                            mode="currency" currency="VND" locale="vi-VN"
                                            {...field}
                                            onChange={(e) => field.onChange(e.value)}
                                            className={classNames({ 'p-invalid': fieldState.invalid })}
                                        />
                                    )} />
                                <label htmlFor="price" className={classNames({ 'p-error': !!errors.price })}>Giá (VNĐ)*</label>
                            </span>
                            {getFormErrorMessage('price')}
                        </div>
                    </div>

                    <div className="p-md-3 p-lg-3 p-col-12">
                        <div className="p-field">
                            <span className="p-float-label p-input-icon-right">
                                <Controller name="acreage" control={control}
                                    rules={{ required: 'Diện tích không thể bỏ trống' }}
                                    render={({ field, fieldState }) => (
                                        <InputNumber id={field.name} {...field}
                                            onChange={(e) => field.onChange(e.value)}
                                            suffix=" m2"
                                            className={classNames({ 'p-invalid': fieldState.invalid })} />
                                    )} />
                                <label htmlFor="acreage" className={classNames({ 'p-error': !!errors.acreage })}>Diện tích (m2) *</label>
                            </span>
                            {getFormErrorMessage('acreage')}
                        </div>
                    </div>

                    <div className="p-md-2 p-lg-2 p-col-12">
                        <div className="p-field">
                            <span className="p-float-label p-input-icon-right">
                                <Controller name="acreage_used" control={control}
                                    render={({ field, fieldState }) => (
                                        <InputNumber id={field.name} {...field}
                                            onChange={(e) => field.onChange(e.value)}
                                            suffix=" m2"
                                            className={classNames({ 'p-invalid': fieldState.invalid })} />
                                    )} />
                                <label htmlFor="acreage_used" className={classNames({ 'p-error': !!errors.acreage_used })}>Diện tích sử dụng (m2)</label>
                            </span>
                            {getFormErrorMessage('acreage_used')}
                        </div>
                    </div>

                    <div className="p-md-2 p-lg-2 p-col-12">
                        <div className="p-field">
                            <span className="p-float-label p-input-icon-right">
                                <Controller name="front" control={control}
                                    render={({ field, fieldState }) => (
                                        <InputNumber id={field.name} {...field}
                                            onChange={(e) => field.onChange(e.value)}
                                            suffix=" m"
                                            className={classNames({ 'p-invalid': fieldState.invalid })} />
                                    )} />
                                <label htmlFor="front" className={classNames({ 'p-error': !!errors.front })}>Mặt tiền (m)</label>
                            </span>
                            {getFormErrorMessage('front')}
                        </div>
                    </div>

                    <div className="p-md-2 p-lg-2 p-col-12">
                        <div className="p-field">
                            <span className="p-float-label p-input-icon-right">
                                <Controller name="footage" control={control}
                                    render={({ field, fieldState }) => (
                                        <InputNumber id={field.name} {...field}
                                            onChange={(e) => field.onChange(e.value)}
                                            suffix=" m"
                                            className={classNames({ 'p-invalid': fieldState.invalid })} />
                                    )} />
                                <label htmlFor="footage" className={classNames({ 'p-error': !!errors.footage })}>Chiều sâu (m)</label>
                            </span>
                            {getFormErrorMessage('footage')}
                        </div>
                    </div>

                    <div className="p-md-3 p-lg-3 p-col-12">
                        <div className="p-field">
                            <span className="p-float-label p-input-icon-right">
                                <Controller name="bedroom" control={control}
                                    render={({ field, fieldState }) => (
                                        <Dropdown className={classNames({ 'p-invalid': fieldState.invalid })}
                                            id={field.name} {...field}
                                            options={opts.bedroomOptions}
                                            optionLabel="label"
                                        />
                                    )} />
                                <label htmlFor="bedroom" className={classNames({ 'p-error': !!errors.bedroom })}>Số phòng ngủ</label>
                            </span>
                            {getFormErrorMessage('bedroom')}
                        </div>
                    </div>

                    <div className="p-md-3 p-lg-3 p-col-12">
                        <div className="p-field">
                            <span className="p-float-label p-input-icon-right">
                                <Controller name="bathroom" control={control}
                                    render={({ field, fieldState }) => (
                                        <Dropdown className={classNames({ 'p-invalid': fieldState.invalid })}
                                            id={field.name} {...field}
                                            options={opts.bathroomOptions}
                                            optionLabel="label"
                                        />
                                    )} />
                                <label htmlFor="bathroom" className={classNames({ 'p-error': !!errors.bathroom })}>Số phòng tắm</label>
                            </span>
                            {getFormErrorMessage('bathroom')}
                        </div>
                    </div>

                    <div className="p-md-3 p-lg-3 p-col-12">
                        <div className="p-field">
                            <span className="p-float-label p-input-icon-right">
                                <Controller name="floor" control={control}
                                    render={({ field, fieldState }) => (
                                        <Dropdown className={classNames({ 'p-invalid': fieldState.invalid })}
                                            id={field.name} {...field}
                                            options={opts.floorOptions}
                                            optionLabel="label"
                                        />
                                    )} />
                                <label htmlFor="floor" className={classNames({ 'p-error': !!errors.floor })}>Số tầng</label>
                            </span>
                            {getFormErrorMessage('floor')}
                        </div>
                    </div>

                    <div className="p-md-3 p-lg-3 p-col-12">
                        <div className="p-field">
                            <span className="p-float-label p-input-icon-right">
                                <Controller name="juridical_id" control={control}
                                    render={({ field, fieldState }) => (
                                        <Dropdown className={classNames({ 'p-invalid': fieldState.invalid })}
                                            id={field.name} {...field}
                                            options={opts.juridicalOptions}
                                            optionLabel="label"
                                        />
                                    )} />
                                <label htmlFor="juridical_id" className={classNames({ 'p-error': !!errors.juridical_id })}>Pháp lý</label>
                            </span>
                            {getFormErrorMessage('juridical_id')}
                        </div>
                    </div>

                    <div className="p-md-3 p-lg-3 p-col-12">
                        <div className="p-field">
                            <span className="p-float-label p-input-icon-right">
                                <Controller name="direction_id" control={control}
                                    render={({ field, fieldState }) => (
                                        <Dropdown className={classNames({ 'p-invalid': fieldState.invalid })}
                                            id={field.name} {...field}
                                            options={opts.directOptions}
                                            optionLabel="label"
                                        />
                                    )} />
                                <label htmlFor="direction_id" className={classNames({ 'p-error': !!errors.direction_id })}>Hướng mặt tiền</label>
                            </span>
                            {getFormErrorMessage('direction_id')}
                        </div>
                    </div>

                    <div className="p-md-3 p-lg-3 p-col-12">
                        <div className="p-field">
                            <span className="p-float-label p-input-icon-right">
                                <Controller name="builder_year" control={control}
                                    render={({ field, fieldState }) => (
                                        <InputText id={field.name} {...field}
                                            className={classNames({ 'p-invalid': fieldState.invalid })} />
                                    )} />
                                <label htmlFor="builder_year" className={classNames({ 'p-error': !!errors.builder_year })}>Năm xây dựng</label>
                            </span>
                            {getFormErrorMessage('builder_year')}
                        </div>
                    </div>

                    <div className="p-md-3 p-lg-3 p-col-12">
                        <div className="p-field">
                            <span className="p-float-label p-input-icon-right">
                                <Controller name="deposit" control={control}
                                    render={({ field, fieldState }) => (
                                        <InputNumber id={field.name}
                                            mode="currency" currency="VND" locale="vi-VN"
                                            {...field}
                                            onChange={(e) => field.onChange(e.value)}
                                            className={classNames({ 'p-invalid': fieldState.invalid })}
                                        />
                                    )} />
                                <label htmlFor="deposit" className={classNames({ 'p-error': !!errors.deposit })}>Đặt cọc trước</label>
                            </span>
                            {getFormErrorMessage('deposit')}
                        </div>
                    </div>

                </div>

                <div className="p-grid">
                    <div className="p-md-6 p-lg-6 p-col-12">
                        <Controller name="property_ids" control={control}
                            render={({ field, fieldState }) => (
                                <MiscCheckbox
                                    {...field}
                                    options={attributes.filter((res: any) => {
                                        return res.type_id === 2
                                    })}
                                    name="property_ids"
                                    title="Tiện ích xung quanh" />
                            )} />
                    </div>

                    <div className="p-md-6 p-lg-6 p-col-12">
                        <Controller name="furniture_ids" control={control}
                            render={({ field, fieldState }) => (
                                <MiscCheckbox
                                    {...field}
                                    options={attributes.filter((res: any) => {
                                        return res.type_id === 1
                                    })}
                                    name="furniture_ids"
                                    title="Tiện ích nội thất" />
                            )} />
                    </div>

                    <div className="p-col-12">
                        <div className="p-field">
                            <span className="p-float-label p-input-icon-right">
                                <Controller name="description" control={control}
                                    rules={{ required: 'Nội dung tin đăng không thể bỏ trống' }}
                                    render={({ field, fieldState }) => (
                                        <InputTextarea id={field.name}
                                            autoResize rows={5} cols={30} 
                                            {...field}
                                            className={classNames({ 'p-invalid': fieldState.invalid })}
                                        />
                                    )} />
                                <label htmlFor="description" className={classNames({ 'p-error': !!errors.description })}>Chi tiết</label>
                            </span>
                            {getFormErrorMessage('description')}
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        fetchLocationsRequest: bindActionCreators(fetchLocationsRequest, dispatch),
    }
}

const mapStateToProps = ({ postsAttributes }: any) => ({
    postsAttributes: postsAttributes
});

export default connect(mapStateToProps, mapDispatchToProps)(Detail)