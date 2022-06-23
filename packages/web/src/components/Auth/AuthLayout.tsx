import React, { useState } from "react";
import styles from './AuthLayout.module.scss';
import { Card } from 'primereact/card';
import { TabView, TabPanel } from 'primereact/tabview';

import Login from './Login'
import Register from './Register'

type Props = {
    active : number
}

const AuthLayout = (props: Props) => {
    const [activeIndex, setActiveIndex] = useState(props.active);
    const onTabChange = (e : any) => {
        const map = ['/auth/login', '/auth/register'];
        setActiveIndex(e.index);
        history.pushState({}, map[e.index] , map[e.index]);
    };

    return (
        <div className={styles.wrapper}>
            <div className="container">
                <div className="p-grid">
                    <div className="p-col-12 p-md-6 p-md-offset-3">
                        <Card className={"p-mt-3"}>

                            <TabView
                                className={styles.tabView}
                                activeIndex={activeIndex} onTabChange={onTabChange}>
                                <TabPanel header="Đăng nhập">
                                    <Login />
                                </TabPanel>
                                <TabPanel header="Đăng kí">
                                    <Register />
                                </TabPanel>
                            </TabView>
                            
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default AuthLayout;