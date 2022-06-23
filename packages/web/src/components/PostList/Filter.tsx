import React, {useState, useEffect} from "react";
import styles from './PostList.module.scss';
import { Dropdown } from 'primereact/dropdown';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useRouter } from "next/router";
import { filterToSlug, getUrl } from "@/utils/post"
import { fetchPostsRequest, 
    updateQuery,
    fetchPostsSeoMetaRequest } from "@/redux/actions/postCollectionAction";
import { fetchLocationsRequest } from "@/redux/actions/locationsAction";
import LocationFilter from "./Filters/LocationFilter";
import CategoryFilter from "./Filters/CategoryFilter";
import PriceFilter from "./Filters/PriceFilter";
import AcreageFilter from "./Filters/AcreageFilter";
import AdvancedFilter from "./Filters/AdvancedFilter";
import { classNames } from 'primereact/utils';

const Filter = (props: any) => {
    const router = useRouter();
    const searchQuery = props.postCollection.query;

    const search = (query : any, refresh = false) => {
        const newSearchQuery = !refresh 
            ? filterToSlug(searchQuery, query.key, query) 
            : filterToSlug(searchQuery, query.key, '');
        props.updateQuery(newSearchQuery);
        props.fetchPostsRequest({
            isServer: false,
            data: newSearchQuery
        });
        props.fetchPostsSeoMetaRequest({
            isServer: false,
            data: newSearchQuery
        });
        const newUrl = getUrl(newSearchQuery);
        router.push(newUrl, newUrl, { shallow: true })
    }

    return (
        <div className={classNames(styles.filterWrapper
        )}>
            <div className="container">
                <div className={styles.filterDynamic}>
                    <AdvancedFilter search={search}/>
                    <LocationFilter search={search}/>
                    <CategoryFilter search={search}/>
                    <PriceFilter search={search}/>
                    <AcreageFilter search={search}/>
                </div>
            </div>
        </div>
    )
};
const mapStateToProps = ({ locations, postsAttributes, postCollection }: any) => ({
    cities: locations.cities,
    districts: locations.districts,
    categories: postsAttributes.categories,
    postCollection: postCollection,
});

const mapDispatchToProps = (dispatch: any) => {
    return {
        updateQuery: bindActionCreators(updateQuery, dispatch),
        fetchPostsRequest: bindActionCreators(fetchPostsRequest, dispatch),
        fetchPostsSeoMetaRequest: bindActionCreators(fetchPostsSeoMetaRequest, dispatch),
        fetchLocationsRequest: bindActionCreators(fetchLocationsRequest, dispatch),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Filter)