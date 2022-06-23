import LocationDataService from "@/services/Location"

import { FETCH_CITIES, FETCH_DISTRICTS, FETCH_STREETS, FETCH_WARDS, FETCH_AREAS } from "@/redux/reducers/locationsReducer";

export const fetchLocationsRequest = ({ isServer, type, parent_id }) => {
    return (dispatch) => {
        return LocationDataService.fetch({
            isServer,
            data: { type, parent_id }
        }).then(response => {
            if (response) {
                dispatch({
                    type: type,
                    payload: response.data
                });
            }
        }).catch(error => {
            console.log(error)
            // dispatch(fetchAccount(false));
        });
    }
};

export const clearLocations = (type) => {
    return (dispatch) => {
        dispatch({
            type: type,
            payload: []
        });
    }
}