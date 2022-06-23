import {IS_MOBILE, TOGGLE_MOBILE_MENU} from "@/redux/reducers/miscReducer"

export const mobileDetect = (isMobile) => {
    return (dispatch) => {
        dispatch({
            type: IS_MOBILE,
            payload: {
                isMobile: isMobile,
            }
        });
    }
};

export const toggleMobileMenu = (isOpen) => {
    return (dispatch) => {
        dispatch({
            type: TOGGLE_MOBILE_MENU,
            payload: {
                mobileMenuEnabled: isOpen,
            }
        });
    }
};