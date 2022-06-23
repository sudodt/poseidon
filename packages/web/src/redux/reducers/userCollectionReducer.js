export const FETCH_COLLECTION_USER = 'FETCH_COLLECTION_USER';
export const FETCH_SUGGESTED_USER = 'FETCH_SUGGESTED_USER';

const initialState = {
    outstanding: [],
    search: {
        data: [],
        meta: {},
        additional: {}
    },
    suggested: [],
    query : {},
};

const childrenReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_COLLECTION_USER:
            return {
                ...state,
                search: action.payload
            };
        case FETCH_SUGGESTED_USER:
            return {
                ...state,
                suggested: action.payload
            };
        default: return { ...state };
    }
};

export default childrenReducer;