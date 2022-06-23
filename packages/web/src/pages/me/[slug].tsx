import { wrapper } from "@/redux/store";
import { connect } from 'react-redux';
import { fetchLocationsRequest } from "@/redux/actions/locationsAction";

import { fetchUserRequest } from "@/redux/actions/userAction";
import { FETCH_CITIES } from "@/redux/reducers/locationsReducer";

import User from "@/components/User/Container";
import {getCode} from '@/utils/user'
import Error from '../_error';

const View = (props : any) => {
    return <User data={props.data}/>;
}

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
    const code = getCode(context?.params?.slug);
    await context.store.dispatch(
        fetchLocationsRequest({ isServer: true, type: FETCH_CITIES, parent_id: null })
    );
    const userData = await context.store.dispatch(
        fetchUserRequest({ 
            isServer: true, 
            type: 'agents', 
            code: code
        })
    );

    return {
        props: {
            data : userData || {}
        }
    }
})


export default View;