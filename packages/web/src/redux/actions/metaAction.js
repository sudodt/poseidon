import {UPDATE_META} from '../reducers/metaReducer';

export const updateMeta = (meta) => {
    return (dispatch) => {
        dispatch({
            type: UPDATE_META,
            payload : meta
        });
    }
};