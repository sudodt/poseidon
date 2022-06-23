
import React, { useState, useEffect } from 'react';
import styles from "./User.module.scss";
import { connect } from 'react-redux';
import { Card } from 'primereact/card';
import { getUserAvatar } from '@/utils/user';
import UserPhone from '@/src/components/Shared/UserPhone';

const Left = (props: any) => {
    const user = props.data || {};
    const profile = user.profile || {};
    const userUrl = `/${user.slug}-uid-${user.uuid}`;
    const avatarImage = `url(${getUserAvatar(profile)})`;
    return (
        <Card>
            <div className={`p-grid`}>
                <div className={`p-col-12 p-d-flex p-ai-center p-jc-center`}>
                    <div className={styles.boxAvatar} style={{ backgroundImage: avatarImage }}>
                    </div>
                </div>

                <div className={`p-col-12`}>
                    <div className={`${styles.userNameWrapper} p-d-flex p-ai-center p-jc-center`}>
                        <h1 className={styles.userName}>{user.name}</h1>
                    </div>
                    <div className="p-d-flex p-ai-center p-jc-center">
                        <span>{user.type?.display}</span>
                    </div>
                    <div className="p-d-flex p-ai-center p-jc-center">
                        <span>Đã tham gia {user.created_at}</span>
                    </div>
                </div>

                <div className={`p-col-12`}>
                    <UserPhone data={user} />
                </div>
                <div className="p-col-12">
                    <div className={styles.moreInfo}>
                        <div className="p-grid">
                            <div className="p-sm-6 p-md-6 p-col-12 p-d-block p-text-center">
                                <div>{user.posts_count || 0}</div> 
                                <div>tin đăng</div> 
                            </div>
                            <div className="p-sm-6 p-md-6 p-col-12 p-d-block p-text-center">
                                <div>0</div> 
                                <div>đánh giá</div> 
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-col-12">
                    <div className={styles.description}>
                        <h4>Giới thiệu:</h4>
                        <div dangerouslySetInnerHTML={{ __html: profile.description || 'Người này chưa để lại lời giới thiệu nào' }}></div>
                    </div>
                </div>

            </div>
        </Card>
    );
}
const mapStateToProps = ({ user }: any) => ({
    data: user.data || {},
});
export default connect(mapStateToProps, null)(Left)