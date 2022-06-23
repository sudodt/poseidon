
import React from 'react';
import styles from "./PostList.module.scss";

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
                <h2 className={styles.metaTitle}>{seo.title} mới nhất tháng {d.getMonth()+1} {d.getFullYear()}</h2>
                <span>Tìm thấy {meta.total} nhà đất đang mua bán</span>
            </div>
        </>
    );
}
export default Meta;
