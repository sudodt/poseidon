export const FETCH_USER = 'FETCH_USER';
export const FETCH_POSTS_BUYSOILD = 'FETCH_POSTS_BUYSOILD';
export const FETCH_POSTS_RENT = 'FETCH_POSTS_RENT';

const initialState = {
    data: {},
    buysoild: {
        data : [],
        meta : {}
    },
    rent: {
        data : [],
        meta : {}
    }
};

const childrenReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USER:
            return {
                ...state,
                data: action.payload
            };
        case FETCH_POSTS_BUYSOILD:
            return {
                ...state,
                buysoild: action.payload
            };
        case FETCH_POSTS_RENT:
            return {
                ...state,
                rent: action.payload
            };
        default: return { ...state };
    }
};

export default childrenReducer;