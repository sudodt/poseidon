import React, { useRef, useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import styles from "./Filters.module.scss";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FETCH_DISTRICTS, FETCH_WARDS } from "@/redux/reducers/locationsReducer";
import {
    fetchPostsRequest,
    updateQuery,
    fetchPostsSeoMetaRequest
} from "@/redux/actions/postCollectionAction";
import { fetchLocationsRequest, clearLocations } from "@/redux/actions/locationsAction";
import { Skeleton } from 'primereact/skeleton';

interface locationItem {
    id: string;
    name: string;
    full_name: string;
    parent_id: string | null;
}

interface LocationFilter {
    cities: any,
    districts: any,
    wards: any,
    postCollection: any,
    updateQuery: any,
    fetchLocationsRequest: any,
    fetchPostsSeoMetaRequest: any,
    fetchPostsRequest: any,
    search: any,
    clearLocations: any,
    maxWidth?: boolean,
}

const LocationFilter = (props: LocationFilter) => {
    const cities = props.cities;
    const districts = props.districts;
    const wards = props.wards;
    const [show, setShow] = useState(false);
    const [label, setLabel] = useState('Toàn quốc');
    const [items, setItems] = useState([]);
    const searchQuery = props.postCollection.query;

    // fetch districts
    useEffect(() => {
        const city = props.cities.find((res: any) => res.slug === searchQuery.city) || {};
        if (city.id) {
            props.clearLocations(FETCH_DISTRICTS);
            props.fetchLocationsRequest({ type: FETCH_DISTRICTS, parent_id: city.id });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchQuery.city]);
    // fetch wards
    useEffect(() => {
        const district = props.districts.find((res: any) => res.slug === searchQuery.district) || {};
        if (district.id) {
            props.clearLocations(FETCH_WARDS)
            props.fetchLocationsRequest({ type: FETCH_WARDS, parent_id: district.id });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchQuery.district]);

    useEffect(() => {
        if (searchQuery.city) {
            const city = props.cities.find((res: any) => res.slug === searchQuery.city) || {};
            setLabel(city.full_name)
        }
        if (searchQuery.district) {
            const district = props.districts.find((res: any) => res.slug === searchQuery.district) || {};
            setLabel(district.full_name)
            return setItems(wards);
        }
        if (searchQuery.city) {
            const district = props.districts.find((res: any) => res.slug === searchQuery.district) || {};
            setLabel(district.full_name)
            return setItems(districts);
        }
        else return setItems(cities);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchQuery.city, searchQuery.district, cities, districts, wards])

    useEffect(() => {
        if (searchQuery.ward) {
            const ward = props.wards.find((res: any) => res.slug === searchQuery.ward) || {};
            return setLabel(ward.full_name)
        }
        if (searchQuery.district) {
            const district = props.districts.find((res: any) => res.slug === searchQuery.district) || {};
            return setLabel(district.full_name)
        }
        if (searchQuery.city) {
            const city = props.cities.find((res: any) => res.slug === searchQuery.city) || {};
            return setLabel(city.full_name);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchQuery.city, searchQuery.district, searchQuery.ward, cities, districts, wards])

    const onChangeItem = (item: any) => {
        props.search({
            key: item.type_enum,
            value: item.slug,
        });
    }

    const renderFooter = () => {
        return <React.Fragment></React.Fragment>
    }

    const renderBackItem = () => {
        let item: any = {};
        if (searchQuery.district) {
            item = props.districts.find((res: any) => res.slug === searchQuery.district) || {};
        } else {
            item = props.cities.find((res: any) => res.slug === searchQuery.city) || {};
        }
        return (
            <>
                <li className={`${styles.item} ${styles.itemBack}`}>
                    <i className='pi pi-angle-left'></i>
                    <span className={styles.tagLink} onClick={e => onChangeItem({
                        type_enum: item.type_enum,
                        slug: ""
                    })}>
                        {item.full_name ?? "Toàn quốc"}
                    </span>
                </li>
            </>
        )
    }

    const renderHeadItem = () => {
        let head: any = {};
        if (searchQuery.city) {
            head = props.cities.find((res: any) => res.slug === searchQuery.city) || {};
        }
        if (searchQuery.district) {
            head = props.districts.find((res: any) => res.slug === searchQuery.district) || {};
        }
        if (searchQuery.ward) {
            head = {
                type_enum: "ward",
                slug: ""
            };
        }
        return (
            <>
                <li className={`${styles.item} ${items.length == 0 && styles.skeletonItem}`}>
                    <span className={styles.tagLink} onClick={e => onChangeItem(head)}>
                        Tất cả
                    </span>
                </li>
            </>
        )
    }
    const renderItems = (data: locationItem[]) => {
        const items: JSX.Element[] = [];

        data.forEach((element: locationItem) => {
            items.push(itemTemplate(element));
        });

        return items;
    }
    const renderSkeletons = () => {
        const items: JSX.Element[] = [];
        const skeleton = () => {
            return (
                <>
                    <li className={`${styles.item} ${styles.skeletonItem}`}>
                        <span>
                            <Skeleton width="100%" height="2rem" />
                        </span>
                    </li>
                </>
            )
        }
        for (let i = 0; i < 4; i++) {
            items.push(skeleton());
        }

        return items;
    }
    const itemTemplate = (item: locationItem): React.ReactElement<any> => {
        const ward = props.wards.find((res: any) => res.slug === searchQuery.ward) || {};
        const active = ward.id === item.id;
        return (
            <>
                <li className={`${styles.item} ${active ? styles.itemActive : ""}`}>
                    <span className={styles.tagLink} onClick={e => onChangeItem(item)}>
                        {item.full_name}
                    </span>
                    {active ? <i className="pi pi-chevron-circle-down" /> : <i className='pi pi-angle-right'></i>}
                </li>
            </>
        )
    }
    return (
        <div className={styles.fragment}>
            <Dialog header={'Lọc theo địa điểm'}
                footer={renderFooter()}
                visible={show}
                dismissableMask={true}
                position='top'
                onHide={() => setShow(false)}
                breakpoints={{ '960px': '75vw' }}
                style={{ width: '25vw' }}>
                <ul className={styles.list} key={"ul-location-filter"}>
                    {renderBackItem()}
                    {searchQuery.city ? renderHeadItem() : ""}
                    {items.length > 0 ? renderItems(items) : renderSkeletons()}
                </ul>
            </Dialog>
            <Button
                type="button"
                icon="pi pi-map-marker"
                className={`${styles.button} p-button-outlined ${props.maxWidth ? "w-100" : ""}`}
                label={label}
                onClick={(e: any) => { return setShow(true) }}>
                <span className='pi pi-angle-down'></span>
            </Button>
        </div>
    );
}

const mapStateToProps = ({ locations, postCollection }: any) => ({
    cities: locations.cities,
    districts: locations.districts,
    wards: locations.wards,
    postCollection: postCollection,
});

const mapDispatchToProps = (dispatch: any) => {
    return {
        updateQuery: bindActionCreators(updateQuery, dispatch),
        fetchPostsRequest: bindActionCreators(fetchPostsRequest, dispatch),
        fetchPostsSeoMetaRequest: bindActionCreators(fetchPostsSeoMetaRequest, dispatch),
        fetchLocationsRequest: bindActionCreators(fetchLocationsRequest, dispatch),
        clearLocations: bindActionCreators(clearLocations, dispatch),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LocationFilter)