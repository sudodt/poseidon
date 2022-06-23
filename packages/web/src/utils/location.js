'use strict';

import axios from "axios";

export const getAddressString = (data, sortString = false, isMobile = false) => {
    const city = data.city || {};
    const district = data.district || {};
    const ward = data.ward || {};
    const street = data.street || {};
    const area = data.area || {};
    let arr = [];
    if (sortString && isMobile) {
        arr = [city.name]
    }
    else if (sortString) {
        arr = [
            district.name,
            city.name
        ]
    }
    else arr = [
        data.address_number,
        area.name,
        street.name,
        ward.name,
        district.name,
        city.name,
    ]
    
    let text = arr.filter(e => e).map(res => {return res} ).join(', ');

    return text ? text : 'Không xác định';
};


export const addressToGeoJSON = async (city, district, ward) => {
    const computeFullAddress = ({...props}) => {
        let string = '';
        string += props.ward ? `${props.ward.full_name}, ` : "";
        string += props.district ? `${props.district.full_name}, ` : "";
        string += props.city ? `${props.city.full_name}, ` : "";
        return string.slice(0, -1) + ` Viet Nam`;
    };
    const string = computeFullAddress({city, district, ward});
    const url = 'https://nominatim.openstreetmap.org/search?countrycodes=VN&accept-language=vi&format=json&q=' + encodeURI(string);
    axios.defaults.withCredentials = false;
    return await axios.get(url).then((response) => {
        return response && response.data ? response.data[0] : {};
    });
};