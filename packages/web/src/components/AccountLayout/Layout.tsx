import React, { useState, useEffect } from 'react';
import styles from './AccountLayout.module.scss';
import Menu from './Menu';
import { useRouter } from 'next/router';

const AccountLayout = (props : any) => {
    const router = useRouter();
    return (
        <React.Fragment>
            <div className={styles.wrapper}>
                <div className="container">
                    <div className="p-grid">
                        <div className="p-col-12 p-md-3 p-lg-3">
                            <Menu/>
                        </div>
                        <div className={props.contentClass}>
                            {props.children}    
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default AccountLayout;