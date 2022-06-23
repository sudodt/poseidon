
import React, { useState, useEffect } from 'react';
import dynamic from "next/dynamic";
import MasterLayout from "@/src/components/MasterLayout/Master";
import styles from "./Post.module.scss";
import { connect } from 'react-redux';
import Breadcrumb from './Breadcrumb';
import Gallery from './Gallery';
import Body from './Body';
import User from './User';
const MapView = dynamic(() => import("./MapView"), { ssr: false });
import PostCarousel from "@/src/components/PostCarousel/PostCarousel";
import {useRouter} from 'next/router'
import PostsDataService from "@/services/Posts"
import { NextSeo } from "next-seo";

type Props = {
    data ?: any
}
const Container = (props: Props) => {
    const data = props.data;
    const router = useRouter();
    const [postCollection, setPostCollection] = useState<any>([]);
    const metaImage = data.images ? data.images[0] : '';
    useEffect(() => {
        const fetchData = async () => {
            const postCollection = await PostsDataService.getSuggested(data.uuid);
            if (postCollection.data.length) {
                setPostCollection(postCollection.data);
            }
        };
        fetchData();
    }, [data.demand, data.category, data?.city, data.uuid]);

    return (
        <MasterLayout>
            <NextSeo
                title={data.title}
                description={data.title}
                openGraph = {{
                    url : 'https://bdstotnhat.com' + router.asPath,
                    title: `${data.title}`,
                    description: data.description,
                    images: [
                      { 
                        url: process.env.STATIC + '/' + metaImage
                    }
                    ],
                    site_name: 'bdstotnhat.com',
                    }
                }
            />
            <div className={styles.postWrapper}>
                <Breadcrumb data={props.data} />
                <div className={'post--content'}>
                    <div className={'container'}>
                        <div className={'p-grid'}>
                            <div className={'p-col-12 p-lg-8'}>
                                <Gallery 
                                    data={data.images} 
                                    title={data.title}
                                    user={data.user}
                                />
                                <Body data={data} />
                                <div className={"p-col-12"}>
                                    <MapView latitude={data.latitude} longitude={data.longitude} />
                                </div>
                            </div>
                            <div className={'p-col-12 p-lg-4'}>
                                <User data={data.user} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                {postCollection.length ?
                    <PostCarousel
                        header={`Bất động sản tương tự`}
                        data={postCollection} />
                    : ''}

            </div>
        </MasterLayout>
    );
}
const mapStateToProps = ({ post }: any) => ({
    data: post.data || {},
});
export default connect(mapStateToProps, null)(Container)