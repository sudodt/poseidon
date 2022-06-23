import React, { useRef, useState, useEffect } from 'react';
import styles from "@/components/Layout/Mobile/Bottom.module.scss";
import AdvancedFilter from "./Filters/AdvancedFilter"

const Bottom = (props: any) => {
    const search = () => {
        return true;
    }
    return (
        <React.Fragment>
            <div className={styles.listWrraper}>
                <ul className={styles.list}>
                    <li className={styles.itemWrapper}>
                        <div className={styles.item}>
                            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                            <a className={styles.link} href="/">
                                <div className="pi pi-home"/>
                                <div className={styles.linkText}>Trang chủ</div>
                            </a>
                        </div>
                    </li>
                    <li className={styles.itemWrapper}>
                        <AdvancedFilter search={search}/>
                    </li>
                    <li className={styles.itemWrapper}>
                        <div className={styles.item}>
                            <a className={styles.link}>
                            <div className="pi pi-sort-alt"/>
                                <div className={styles.linkText}>Sắp xếp</div>
                            </a>
                        </div>
                    </li>
                    <li className={styles.itemWrapper}>
                        <div className={styles.item}>
                            <a className={styles.link}>
                            <div className="pi pi-ellipsis-h"/>
                                <div className={styles.linkText}>Thêm</div>
                            </a>
                        </div>
                    </li>
                </ul>
            </div>
        </React.Fragment>
    )
};

export default Bottom;