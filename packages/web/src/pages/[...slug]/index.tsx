import { wrapper } from "@/redux/store";
import { connect } from 'react-redux';
import { fetchCategoriesRequest, fetchAttributesRequest, fetchSpecialtiesRequest } from "@/redux/actions/postsAttributesAction";
import { fetchLocationsRequest } from "@/redux/actions/locationsAction";
import { fetchPostsRequest, 
    updateQuery,
    fetchPostsSeoMetaRequest } from "@/redux/actions/postCollectionAction";
import { fetchPostRequest } from "@/redux/actions/postAction";
import { FETCH_CITIES } from "@/redux/reducers/locationsReducer";

import ListPost from "@/src/components/PostList/Container";
import Post from "@/components/Post/Container";
import {routeToSearchFilter, checkViewType, getCode} from '@/utils/post'
import Error from '../_error';

const View = (props : any) => {
    let view = null;
    switch (props.view) {
        case 'list':
            view = <ListPost/>;
            break;
        case 'page':
            view = <Post/>;
            break;
        case 'map':
            view = <ListPost/>;
            break;
        default:
            view = <Error/>;
            break;
    } 
    return view;
}

export const getServerSideProps = wrapper.getServerSideProps(async (context : any) => {
    const view = checkViewType(context.query.slug, context.query);
    await context.store.dispatch(fetchCategoriesRequest({ isServer: true }));
    await context.store.dispatch(fetchAttributesRequest());
    await context.store.dispatch(fetchLocationsRequest({
        isServer: true,
        type: FETCH_CITIES,
        parent_id : ''
    }));
 
    if (view === 'list') {
        const searchQuery = routeToSearchFilter(
            context.query.slug, 
            Object.assign({}, context.query)
        );

        await context.store.dispatch(updateQuery(searchQuery));

        await context.store.dispatch(fetchPostsRequest({ 
            isServer: true,
            data : searchQuery
        }));

        await context.store.dispatch(fetchPostsSeoMetaRequest({ 
            isServer: true,
            data : searchQuery
        }));
    }

    if (view === 'page') {
        const code = getCode(context.query.slug[0])
        await context.store.dispatch(fetchPostRequest({ 
            isServer: true,
            code : code
        }));
    }

    return {
        props: {
            view: view
        }
    }
})

const mapStateToProps = ({ postCollection }: any) => ({

});

export default connect(mapStateToProps, null)(View)