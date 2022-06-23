
import React, { useState, useEffect, useRef } from 'react';
import styles from "./Container.module.scss";
import Overview from "./Overview";
import Detail from "./Detail";
import Upload from "./Upload";
import Cookies from 'universal-cookie';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import { NextSeo } from "next-seo";
import { Ripple } from 'primereact/ripple';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import app from '../../config/app.json';
import PostsDataService from "@/services/Posts"
import { useRouter } from 'next/router';

const Container = (props: any) => {
    const cookie = new Cookies();
    const router = useRouter();
    const token = cookie.get('USER_TOKEN');
    const methods = useForm({
        defaultValues: {
            "demand_id": app.demandData[0].id,
            "category_id": false
        }
    });
    const toastRef = useRef(null);
    const { control, formState: { errors }, handleSubmit, reset, watch, setError } = methods;
    const [loading, setLoading] = useState(false);
    const category = watch('category_id');

    const onSubmit = async (data: any) => {
        setLoading(true);
        const form = new FormData();

        Object.keys(data).forEach((key: any) => {
            const value = data[key];
            if (value) {
                if (key === 'images' || value instanceof Array) {
                    for (var i = 0; i < value.length; i++) {
                        form.append(`${key}[]`, value[i]);
                    }
                    return;
                }
                if (value instanceof Object) {
                    return form.append(key, value.id);
                }
                return form.append(key, value);
            }
        });

        return await PostsDataService.create(form, token)
            .then(res => {
                setLoading(false);
                if (res.error) {
                    // @ts-ignore
                    toastRef.current.show({ severity: 'error', summary: 'Error', detail: 'Thất bại, vui lòng thử lại sau' });
                }
                else {
                    // @ts-ignore
                    toastRef.current.show({ severity: 'success', summary: 'Đang chuyển hướng', detail: 'Đăng tin thành công, tin đăng của bạn sẽ được kiểm duyệt trong thời gian sớm nhất' });
                    setTimeout(() => {
                        router.push('/accounts');
                    }, 3000);
                }
            });
    };

    return (
        <div className={styles.container}>
            <NextSeo
                title={'Đăng tin nhanh'}
                description={'Đăng tin nhanh'}
            />
            <Toast ref={toastRef} />
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                    <div className="p-pt-2">
                        <Overview />
                    </div>
                    {category
                        ?
                        <>
                            <div className="p-pt-2">
                                <Detail />
                            </div>
                            <div className="p-pt-2">
                                <Upload />
                            </div>
                            <div className="container">
                                <div className="p-col-6 p-offset-3">
                                    <div className="p-d-flex">
                                        <Button type="submit"
                                            loading={loading}
                                            label="Hoàn tất" className="p-mt-2 p-ripple" >
                                            <Ripple />
                                        </Button>
                                        <Button type="button"
                                            loading={loading}
                                            label="Lưu nháp" className="p-mt-2 p-ml-2 p-ripple p-button-outlined p-button-text" >
                                            <Ripple />
                                        </Button>
                                    </div>

                                </div>
                            </div>
                        </>
                        : ""}
                </form>
            </FormProvider>
        </div>
    );
}

export default Container;