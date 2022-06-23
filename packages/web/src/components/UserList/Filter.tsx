import React, {useState, useEffect} from "react";
import styles from './UserList.module.scss';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useRouter } from "next/router";
import { filterToSlug, getUrl } from "@/utils/post"
import { FETCH_DISTRICTS, FETCH_WARDS, FETCH_STREETS, FETCH_AREAS } from "@/redux/reducers/locationsReducer";

import { fetchUsersRequest } from "@/redux/actions/userCollectionAction";
import { fetchLocationsRequest } from "@/redux/actions/locationsAction";

const Filter = (props: any) => {
    const router = useRouter();
    const searchQuery = props.userCollection.query;
    
    const onChangeSelection = (option: any) => {
        const name : string = option.target.name || '';
        const value : any = option.value || {};
        const newSearchQuery = filterToSlug(searchQuery,name, value);
        
        props.updateQuery(newSearchQuery);
        props.fetchPostsRequest({
            isServer : false,
            data : newSearchQuery
        });
        props.fetchPostsSeoMetaRequest({
            isServer : false,
            data : newSearchQuery
        });

        const newUrl = getUrl(newSearchQuery);
        router.push(newUrl, newUrl, { shallow: true })
    }

    useEffect(() => {
        const city = props.cities.find((res : any) => res.slug === searchQuery.city) || {};
        if (city.id) {
            props.fetchLocationsRequest({type: FETCH_DISTRICTS, parent_id : city.id});
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchQuery.city]);

    return (
        <div className={styles.filterWrapper}>
            <div className="container">
                <div className="p-grid">
                    <div className="p-md-4 p-lg-4 p-col-12">
                        <InputText 
                            className={styles.dropdownItem}
                            placeholder="Tìm theo tên, email, số điện thoại..."
                        />
                    </div>
                    <div className="p-md-2 p-lg-2 p-col-12">
                        <Dropdown className={styles.dropdownItem}
                            onChange={onChangeSelection}
                            options={props.cities}
                            value={
                                props.cities.find((city : any) => city.slug === searchQuery.city)
                            }
                            name="city"
                            optionLabel="full_name" 
                            filter 
                            showClear 
                            filterBy="name" 
                            placeholder="Tỉnh/Thành phố"
                        />
                    </div>
                    <div className="p-md-2 p-lg-2 p-col-12">
                        <Dropdown className={styles.dropdownItem}
                            options={props.districts}
                            value={
                                props.districts.find((district : any) => district.slug === searchQuery.district)
                            }
                            onChange={onChangeSelection}
                            name="district"
                            optionLabel="full_name" 
                            filter 
                            showClear 
                            filterBy="name" 
                            placeholder="Quận/Huyện"
                        />
                    </div>
                    
                </div>
            </div>
        </div>
    )
};
const mapStateToProps = ({ locations, postsAttributes, userCollection }: any) => ({
    cities: locations.cities,
    districts: locations.districts,
    userCollection: userCollection,
});

const mapDispatchToProps = (dispatch: any) => {
    return {
        fetchUsersRequest: bindActionCreators(fetchUsersRequest, dispatch),
        fetchLocationsRequest: bindActionCreators(fetchLocationsRequest, dispatch),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Filter)