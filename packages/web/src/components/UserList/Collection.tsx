
import React from 'react';
import styles from "./UserList.module.scss";
import { getUserAvatar } from '@/utils/user';
import UserPhone from '@/src/components/Shared/UserPhone';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { getAddressString } from '@/utils/location';
import { classNames } from 'primereact/utils';

type Props = {
    data: []
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
        const userUrl = `/me/${item.slug}-uid-${item.uuid}`;
        return (
                <div className={classNames("p-grid p-p-2", styles.sperate)}>
                    <div className={"p-lg-8 p-col-12"}>
                        <div className={styles.item}>
                            <div className={styles.itemLeft}>
                                <a href={userUrl}>
                                    <div 
                                        className={styles.imageWrapper}
                                    >
                                        <LazyLoadImage
                                            alt={item.title}
                                            className={styles.image}
                                            src={getUserAvatar(item.profile)}
                                            effect="opacity"
                                            width={'96px'}
                                            height={"96px"}
                                        />
                                    </div>
                                </a>
                            </div>
                            <div 
                                className={styles.itemRight}
                            >
                                <div className="p-grid">
                                    <div className="p-col-12">
                                        <a href={userUrl}>
                                            <div className={'p-grid'}>
                                                <div className={`p-col-12 ${styles.child}`}>
                                                    <h2 className={styles.title}>{item.name}</h2>
                                                </div>

                                                <div className={`p-col-12 ${styles.child}`}>
                                                    <div className={styles.address}>
                                                        <i className="pi pi-map-marker p-pr-1"></i>
                                                        {
                                                            item.profile ?
                                                                getAddressString(item.profile, true)
                                                                : "Không xác định"
                                                        }
                                                    </div>
                                                    <div>{item.posts_count || 0} tin đăng</div>
                                                    <div>Tham gia {item.created_at}</div>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={classNames("p-lg-4 p-col-12", styles.rightButton)}>
                        <UserPhone data={item} />
                    </div>
                </div>
        )
    }
    return (
        <>
            {renderCollection(data)}
        </>
    );
}

export default Collection;
