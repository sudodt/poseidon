export const FETCH_ACCOUNT = 'FETCH_ACCOUNT';
export const FETCH_ACCOUNT_POSTS = 'FETCH_ACCOUNT_POSTS';

const initialState = {
    account: {},
    posts: [],
};

const childrenReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ACCOUNT:
            return {
                ...state,
                account: action.payload
            };
        case FETCH_ACCOUNT_POSTS:
            return {
                ...state,
                posts: action.payload
            };
        default: return { ...state };
    }
};

export default childrenReducer;