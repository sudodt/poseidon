
import React from 'react';
import styles from "./UserList.module.scss";

type Props = {
    meta : any,
    seo : any
}

const Meta = (props : Props) => {
    const meta = props.meta || {};
    const seo = props.seo || {};
    const d = new Date();
    return (
        <>
            <div className={"p-pt-2 p-pb-2"}>
                <h2 className={styles.metaTitle}>Danh sách môi giới tháng {d.getMonth() + 1} {d.getFullYear()}</h2>
                <span>Tìm thấy {meta.total} môi giới đang hoạt động</span>
            </div>
        </>
    );
}
export default Meta;
