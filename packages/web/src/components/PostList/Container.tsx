
import React, { useEffect, useState } from 'react';
import MasterLayout from "@/src/components/MasterLayout/Master";
import Filter from "@/src/components/PostList/Filter";
import Breadcrumb from "@/src/components/PostList/Breadcrumb";
import Sort from "@/src/components/PostList/Sort";
import Meta from "@/src/components/PostList/Meta";
import Right from "@/src/components/PostList/Right";
import Collection from "@/src/components/PostList/Collection";
import { connect } from 'react-redux';
import { NextSeo } from "next-seo";
import useMobileDetect from "@/utils/hooks/useMobileDetect";
import { useRouter } from 'next/router'

export interface Props {
    search?: any,
    searchQuery?: any,
    seoMeta?: any,
}
const Container = (props: Props) => {
    const data = props.search.data;
    const meta = props.search.meta;
    const seoMeta = props.seoMeta;
    const d = new Date();
    const currentDevice = useMobileDetect();
    const isMobile = currentDevice.isMobile() || false;
    const router = useRouter();
    return (
        <>
            <MasterLayout>
                <NextSeo
                    title={`${seoMeta.title} mới nhất tháng ${d.getMonth() + 1} ${d.getFullYear()}`}
                    description={seoMeta.description}
                    openGraph={{
                        url: 'https://bdstotnhat.com' + router.asPath,
                        title: `${seoMeta.title} mới nhất tháng ${d.getMonth() + 1} ${d.getFullYear()}`,
                        description: seoMeta.description,
                        images: [
                            {
                                url: 'https://bdstotnhat.com/_next/image?url=%2Fimages%2Flogo.svg&w=384&q=100'
                            }
                        ],
                        site_name: 'bdstotnhat.com',
                    }
                    }
                />
                <Filter />
                <Breadcrumb />
                    <div className="container">
                        <div className={"p-grid"}>
                            <div className="p-col-12 p-md-9 p-lg-9">
                                <Meta
                                    meta={meta}
                                    seo={seoMeta} />
                                <Sort />
                                <div className="post--wrapper">
                                    <Collection data={data} />
                                </div>
                            </div>
                            <div className="p-col-12 p-md-3 p-lg-3">
                                <Right />
                            </div>
                        </div>
                    </div>
                {/* {isMobile ? <Bottom /> : ''} */}
            </MasterLayout>
        </>
    );
}
const mapStateToProps = ({ postCollection }: any) => ({
    search: postCollection.search || {},
    searchQuery: postCollection.searchQuery || {},
    seoMeta: postCollection.seo || {},
});
export default connect(mapStateToProps, null)(Container)