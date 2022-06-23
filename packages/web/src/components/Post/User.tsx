
import React from 'react';
import styles from "./Post.module.scss";
import { Avatar } from 'primereact/avatar';
import { getUserAvatar } from '@/utils/user';
import UserPhone from '@/src/components/Shared/UserPhone';
import FastMessage from './FastMessage';
import Link from "next/link";

type Props = {
    data: any
}
const User = (props: Props) => {
    const data = props.data || {};
    const profile = data.profile || {};
    const userUrl = `/me/${data.slug}-uid-${data.uuid}`;
    return (
        <div className={styles.leftStickWrapper}>
            <div className="card">
                <div className={`p-shadow-2 ${styles.userContainer}`}>
                    <div className={styles.userContent}>
                        <div className={`p-grid`}>
                            <div className={`p-md-3 ${styles.userWrapper}`}>
                                <a href={userUrl}>
                                    <Avatar image={getUserAvatar(profile)} shape="circle" size="xlarge" />
                                </a>
                            </div>
                            <div className={'p-md-9'}>
                                <a href={userUrl}>
                                    <div className={styles.userName}>
                                        {data.name}
                                        {profile.is_verified && <i className={`pi pi-check-circle p-ml-2 ${styles.hasValidated}`} />}
                                    </div>
                                </a>
                                <div>{data?.type?.display}</div>
                                <div>Tham gia từ {data.created_at}</div>
                                <div>Hoạt động {data.last_connection_at}</div>
                            </div>

                            <div className={'p-col-12'}>
                                <UserPhone data={data} />
                            </div>
                            <div className={'p-col-12'}>
                                <FastMessage data={data} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default User