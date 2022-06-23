import React from "react";
import styles from "./Post.module.scss";
import SimpleReactLightbox from 'simple-react-lightbox';
import { SRLWrapper, useLightbox } from "simple-react-lightbox";

import { Pagination, Navigation, Scrollbar, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
interface Props {
    data: object,
    title: string,
    user: any
};

const Slider = (props: Props) => {
    const { openLightbox, closeLightbox } = useLightbox();
    const user = props.user || {};
    const options = {
        settings: {
        },
        buttons: {
            showDownloadButton: false,
        }
    }
    const itemTemplate = (item: any, index: number) => {
        return (
            <SwiperSlide className={styles.item}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    alt={props.title}
                    src={process.env.STATIC + '/' + item}
                    width={100}
                    onClick={() => { openLightbox(index) }}
                />
            </SwiperSlide>
        )
    };

    const renderItems = (data: any) => {
        const items: JSX.Element[] = [];

        data.forEach((element: any, index: number) => {
            items.push(itemTemplate(element, index));
        });
        return items;
    }

    return (
        <React.Fragment>
            <SimpleReactLightbox>
                <SRLWrapper options={options}>
                    <Swiper
                        className={styles.swiper}
                        modules={[Pagination, Scrollbar, A11y, Navigation]}
                        spaceBetween={0}
                        navigation
                        pagination={{ clickable: true }}
                    >
                        {renderItems(props.data)}
                    </Swiper>
                    <div className={styles.labelMoreInfo}>
                        <span>Tin {user?.type?.display} đăng {user?.created_at}</span>
                    </div>
                </SRLWrapper>
            </SimpleReactLightbox>
        </React.Fragment>

    );
};

export default Slider;
