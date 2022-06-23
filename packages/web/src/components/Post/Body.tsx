
import React from 'react';
import styles from "./Post.module.scss";
import { priceText } from '@/utils/price';
import { getAddressString } from '@/utils/location';
import { Button } from 'primereact/button';
import { BsDot } from 'react-icons/bs';

import Report from './Report';
import InternalLink from './InternalLink';

type Props = {
    data: any
}
const Body = (props: Props) => {
    const data = props.data || {};
    const demand = data.demand || {};
    const category = data.category || {};

    const getPriceString = (item : any):string  => {
        if (!item) {
            return ''
        }
        if (item?.demand?.slug == 'cho-thue') {
            return `${priceText(item.price)}/${item.price_unit}`;
        }
        return priceText(item.price);
    }
    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <h1 className={styles.title}>{data.title}</h1>

                <div className={styles.subDesc}>
                    <div className={'p-grid'}>
                        <div className={'p-md-8 p-d-flex p-ai-center'}>
                            <span className={`${styles.price} p-mr-2`}>
                                {getPriceString(data)}
                            </span> - 
                            <span className={`${styles.acreage} p-ml-2`}>
                                {data.acreage} m2
                            </span>
                        </div>
                        <div className={`p-md-4 ${styles.actionTop}`}>
                            <Button
                                label="Lưu tin"
                                icon={'pi pi-heart'}
                                className="p-button-danger p-button-outlined" />
                        </div>
                        <div className={'p-md-12'}>
                            <div className={styles.address}>
                                <i className="pi pi-map-marker p-pr-1"></i>{getAddressString(data)}
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.htmlDescription}>
                    <div dangerouslySetInnerHTML={{ __html: (data.description ? data.description.replace(/\n/g, '<br />') : '') }}></div>
                </div>

                <div className={styles.detailDescription}>
                    <div className={styles.detailDescriptionHeader}>
                        <span>Thông tin chi tiết</span>
                    </div>
                    <div className={'p-grid'}>
                        <div className={'p-md-6 p-col-12 p-d-flex p-ai-center'}>
                            <BsDot size={20} />Loại hình: {demand.name} {category.name}
                        </div>
                        <div className={'p-md-6 p-col-12 p-d-flex p-ai-center'}>
                            <BsDot size={20} />Diện tích: {data.acreage} m2
                        </div>
                        {data.acreage_used ?
                            <div className={'p-md-6 p-col-12 p-d-flex p-ai-center'}>
                                <BsDot size={20} />Diện tích sử dụng: {data.acreage_used} m2
                            </div>
                            : ''}
                        {data.bedroom ?
                            <div className={'p-md-6 p-col-12 p-d-flex p-ai-center'}>
                                <BsDot size={20} />Số phòng ngủ: {data.bedroom} phòng
                            </div>
                            : ''}
                        {data.bathroom ?
                            <div className={'p-md-6 p-col-12 p-d-flex p-ai-center'}>
                                <BsDot size={20} />Số phòng tắm: {data.bathroom} phòng
                            </div>
                            : ''}
                        {data.floor ?
                            <div className={'p-md-6 p-col-12 p-d-flex p-ai-center'}>Số tầng: {data.floor}</div>
                            : ''}
                        {data.direction ? 
                            <div className={'p-md-6 p-col-12 p-d-flex p-ai-center'}>
                                <BsDot size={20} />Hướng cửa chính: {data.direction}
                            </div>
                        : ''}

                        {data.juridical ? 
                            <div className={'p-md-6 p-col-12 p-d-flex p-ai-center'}>
                                <BsDot size={20} />Pháp lý: {data.juridical}
                            </div>
                        : ''}

                        {data.front ? 
                            <div className={'p-md-6 p-col-12 p-d-flex p-ai-center'}>
                                <BsDot size={20} />Mặt tiền: {data.front} m
                            </div>
                        : ''}
                        
                        {data.footage ? 
                            <div className={'p-md-6 p-col-12 p-d-flex p-ai-center'}>
                                <BsDot size={20} />Chiều sâu: {data.footage} m
                            </div>
                        : ''}
                        
                    </div>
                </div>
            
                <div className={styles.report}>
                    <Report/>
                </div>

                <div>
                    <InternalLink/>
                </div>

            </div>
        </div>

    );
}

export default Body