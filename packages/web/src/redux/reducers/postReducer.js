export const FETCH_POST = 'FETCH_POST';

const initialState = {
    data: {},
};

const childrenReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_POST:
            return {
                ...state,
                data: action.payload
            };
        default: return { ...state };
    }
};

export default childrenReducer;