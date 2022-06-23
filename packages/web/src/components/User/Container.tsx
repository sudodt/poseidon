
import React, { useState, useEffect } from 'react';
import MasterLayout from "@/src/components/MasterLayout/Master";
import styles from "./User.module.scss";
import { connect } from 'react-redux';
import Left from "./Left";
import Content from "./Content";
import { NextSeo } from "next-seo";

type Props = {
    data: any
}
const Container = (props: Props) => {
    const data = props.data;
    return (
        <MasterLayout>
            <NextSeo
                title={`${data.name} | ${data?.type?.display} | ${process.env.APP_NAME}`}
                description={`${data.name} | ${data?.type?.display} | ${process.env.APP_NAME}`}
            />
            <div className={styles.userWrapper}>
                <div className={`container`}>
                    <div className={"p-grid"}>
                        <div className={`p-sm-4 p-md-4 p-col-12`}>
                            <Left />
                        </div>
                        <div className={`p-sm-8 p-md-8 p-col-12`}>
                            <Content />
                        </div>
                    </div>
                </div>
            </div>
        </MasterLayout>
    );
}
const mapStateToProps = ({ user }: any) => ({
    data: user.data || {},
});
export default connect(mapStateToProps, null)(Container)