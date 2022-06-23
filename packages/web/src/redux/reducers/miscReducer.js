export const IS_MOBILE = 'IS_MOBILE';
export const TOGGLE_MOBILE_MENU = 'TOGGLE_MOBILE_MENU';

const initialState = {
    isMobile: false,
    mobileMenuEnabled: false,
};

const childrenReducer = (state = initialState, action) => {
    const payload  = action.payload || {};
    switch (action.type) {
        case IS_MOBILE:
            return {
                ...state,
                isMobile: payload.isMobile,
            };
        case TOGGLE_MOBILE_MENU:
            return {
                ...state,
                mobileMenuEnabled: payload.mobileMenuEnabled,
            };
        default: return { ...state };
    }
};

export default childrenReducer;