
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { Card } from 'primereact/card';
import { TabView, TabPanel } from 'primereact/tabview';
import UserDataService from '@/services/User'
import PostsCollection from "@/src/components/PostList/Collection"; 
import {
    FETCH_POSTS_BUYSOILD,
    FETCH_POSTS_RENT
} from '@/redux/reducers/userReducer';
import {fetchAgentPostsRequest} from "@/redux/actions/userAction"

const Content = (props: any) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const userUuid = props.data?.uuid;
    const buySoldData = props.buySold;
    const rentData = props.rent;

    useEffect(() => {
        props.fetchAgentPostsRequest({
            isServer: false,
            type: FETCH_POSTS_BUYSOILD,
            userId: userUuid,
            query: {
                demand: "mua-ban"
            }
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!rentData?.meta?.current_page) {
            props.fetchAgentPostsRequest({
                isServer: false,
                type: FETCH_POSTS_RENT,
                userId: userUuid,
                query: {
                    demand: "cho-thue"
                }
            })   
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rentData]);

    return (
        <Card>
            <TabView activeIndex={activeIndex} onTabChange={(e : any) => setActiveIndex(e.index)}>
                <TabPanel header="Mua bán">
                    <PostsCollection data={buySoldData.data}/>
                </TabPanel>
                <TabPanel header="Cho thuê">
                    <PostsCollection data={rentData.data}/>
                </TabPanel>
            </TabView>
        </Card>
    );
}
const mapStateToProps = ({ user }: any) => ({
    data: user.data || {},
    buySold: user.buysoild || {},
    rent: user.rent || {},
});
const mapDispatchToProps = (dispatch: any) => {
    return {
        fetchAgentPostsRequest: bindActionCreators(fetchAgentPostsRequest, dispatch),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Content)