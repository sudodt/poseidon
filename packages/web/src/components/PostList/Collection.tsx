
import React, { useEffect, useState } from 'react';
import styles from "./PostList.module.scss";
import { getAddressString } from '@/utils/location';
import { BiShapeSquare, BiDollarCircle, BiBed, BiBath } from 'react-icons/bi'
import {CgArrowsHAlt, CgArrowsVAlt} from 'react-icons/cg'
import { priceText } from '@/utils/price';
import { getUserAvatar } from '@/utils/user';
import { getThumbImageSrc } from '@/utils/post';
import { Avatar } from 'primereact/avatar';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { connect } from 'react-redux';
import { classNames } from 'primereact/utils';
interface Props {
    data: [],
    isMobile?: boolean
}
const Collection = (props: Props) => {
    const data = props.data;

    const renderCollection = (data: any) => {
        const items: JSX.Element[] = [];

        data.forEach((element: any) => {
            items.push(itemTemplate(element));
        });
        return items;
    }

    const itemTemplate = (item: any) => {
        const user = (user: any) => {
            return (
                <span className={styles.user}>
                    <Avatar image={getUserAvatar(item.user.profile)} shape="circle" className="p-mr-2" />
                    <span>
                        {item.user.name}
                    </span>
                </span>
            )
        }
        const getPriceString = (item: any): string => {
            if (!item) {
                return ''
            }
            if (item?.demand?.slug == 'cho-thue') {
                return `${priceText(item.price)}/${item.price_unit}`;
            }
            return priceText(item.price);
        }

        const renderAttributes = () => {
            return (
                <>
                    {
                        !props.isMobile ?
                            <>
                                <div className="p-mr-3">
                                    {
                                        item.category.slug == "dat" 
                                        ? <><CgArrowsHAlt size={16} /> <span className={"p-pl-2"}>{item.front || 0}m</span></>
                                        : <><BiBed size={20} /> <span className={"p-pl-2"}>{item.bedroom || 0}</span></>
                                    }
                                </div>
                                <div className="p-mr-3">
                                    {
                                        item.category.slug == "dat" 
                                        ? <><CgArrowsVAlt size={16} /> <span className={"p-pl-2"}>{item.footage || 0}m</span></>
                                        : <><BiBath size={20} /> <span className={"p-pl-2"}>{item.bathroom || 0}</span></>
                                    }
                                </div>
                            </> : ""
                    }</>
            )
        }
        return (
            <div className={styles.wrapper}>
                <div className={styles.item}>
                    <div className={styles.itemLeft}>
                        <div className={styles.imageWrapper}>
                            <a href={`/${item.slug}-pid-${item.uuid}`}>
                                <LazyLoadImage
                                    alt={item.title}
                                    className={styles.image}
                                    src={getThumbImageSrc(item.images)}
                                    effect="opacity"
                                    width={'100%'}
                                    height={"auto"}
                                />
                            </a>
                            <span className={styles.imageCounter}>
                                <i className="pi pi-images" />
                                <span>{item.images.length}</span>
                            </span>
                        </div>
                    </div>
                    <div className={styles.itemRight}>
                        <div className={styles.contentWrapper}>
                            <a href={`/${item.slug}-pid-${item.uuid}`}>
                                <div className={'p-grid'}>
                                    <div className={'p-col-12'}>
                                        <h2 className={styles.title}>{item.title}</h2>
                                    </div>
                                    <div className={'p-col-12'}>
                                        <div className={styles.address}>
                                            <i className="pi pi-map-marker p-pr-1"></i>{getAddressString(item, true, props.isMobile)}
                                        </div>
                                    </div>
                                    <div className={'p-col-12'}>
                                        <div className={`p-d-flex ${styles.itemList}`}>
                                            <div className={
                                                classNames({
                                                    "p-mr-3": !props.isMobile,
                                                })}
                                            >
                                                <BiShapeSquare size={20} /> <span className={"p-pl-2"}>{item.acreage} m2</span>
                                            </div>
                                            {renderAttributes()}
                                            {
                                                props.isMobile ?
                                                    <>
                                                        <div className={'p-md-4'}>
                                                            <span>
                                                                {item.created_at}
                                                            </span>
                                                        </div>
                                                    </> : ""
                                            }

                                        </div>
                                    </div>

                                    <div className={'p-col-12'}>
                                        <div className={`p-grid ${styles.itemList}`}>
                                            <div className={`p-md-4 ${styles.price}`}>
                                                <span className={'p-pl-2'}>{getPriceString(item)}</span>
                                            </div>
                                            <div className={'p-md-4'}>
                                                {user(item.user)}
                                            </div>
                                            {
                                                !props.isMobile ?
                                                    <>
                                                        <div className={'p-md-4'}>
                                                            <span>
                                                                {item.created_at}
                                                            </span>
                                                        </div>
                                                    </> : ""
                                            }

                                        </div>
                                    </div>

                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.postCollectionWrapper}>
            {renderCollection(data)}
        </div>
    );
}

const mapStateToProps = ({ config }: any) => ({
    isMobile: config.isMobile || false,
});

export default connect(mapStateToProps, null)(Collection);
