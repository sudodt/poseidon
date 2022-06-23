import React, { useRef, useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import styles from "./Filters.module.scss";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    fetchPostsRequest,
    updateQuery,
    fetchPostsSeoMetaRequest
} from "@/redux/actions/postCollectionAction";
import { fetchSpecialtiesRequest } from "@/redux/actions/postsAttributesAction";
import { Skeleton } from 'primereact/skeleton';

interface categoryItem {
    id: string;
    name: string;
    slug: string;
    category_id: string;
}

interface CategoryFilter {
    postsAttributes: any,
    postCollection: any,
    updateQuery: any,
    fetchSpecialtiesRequest: any,
    fetchPostsSeoMetaRequest: any,
    fetchPostsRequest: any,
    search: any,
    maxWidth ?: boolean
}
const ALL_STRING = "Tất cả loại BĐS"

const CategoryFilter = (props: CategoryFilter) => {
    const postsAttributes = props.postsAttributes;
    const categories = postsAttributes.categories;
    const specialties = postsAttributes.specialties;
    const [show, setShow] = useState(false);
    const [label, setLabel] = useState(ALL_STRING);
    const [items, setItems] = useState([]);
    const searchQuery = props.postCollection.query;

    // fetch districts
    useEffect(() => {
        const category = categories.find((res: any) => res.slug === searchQuery.category) || {};
        if (category.id) {
            props.fetchSpecialtiesRequest(category.id);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchQuery.category]);

    useEffect(() => {
        if (searchQuery.specialty) {
            const specialty = specialties.find((res: any) => res.slug === searchQuery.specialty) || {};
            setItems(specialties)
            setLabel(specialty.name)
            return;
        }
        if (searchQuery.category) {
            const category = categories.find((res: any) => res.slug === searchQuery.category) || {};
            setLabel(category.name)
            setItems(specialties)
            return;
        }
        setItems(categories)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchQuery.category, searchQuery.specialty, specialties, categories])
    const onChangeItem = (item: any) => {
        props.search({
            key: item.category_id ? "specialty" : "category",
            value: item.slug,
        });
    }

    const renderFooter = () => {
        return <React.Fragment></React.Fragment>
    }

    const renderBackItem = () => {
        let item: any = {};
        if (searchQuery.category) {
            item = categories.find((res: any) => res.slug === searchQuery.category) || {};
        }
        return (
            <>
                <li className={`${styles.item} ${styles.itemBack}`}>
                    <i className='pi pi-angle-left'></i>
                    <span className={styles.tagLink} onClick={e => onChangeItem({
                        category_id: item.category_id,
                        slug: ""
                    })}>
                        {item.name ?? ALL_STRING}
                    </span>
                </li>
            </>
        )
    }

    const renderHeadItem = () => {
        const getHeadItem = () => {
            if (searchQuery.category) {
                const category = categories.find((res: any) => res.slug === searchQuery.category) || {};
                return {
                    id: category.id,
                    slug: category.slug
                };
            }
            return {
                id: "",
                slug: ""
            };
        }
        
        return (
            <>
                <li className={`${styles.item} ${items.length == 0 && styles.skeletonItem}`}>
                    <span className={styles.tagLink} onClick={e => onChangeItem(getHeadItem())}>
                        Tất cả
                    </span>
                </li>
            </>
        )
    }

    const renderItems = (data: categoryItem[]) => {
        const items: JSX.Element[] = [];

        data.forEach((element: categoryItem) => {
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
    const itemTemplate = (item: categoryItem): React.ReactElement<any> => {
        const specialty = specialties.find((res: any) => res.slug === searchQuery.specialty) || {};
        const active = specialty.id === item.id;
        return (
            <>
                <li className={`${styles.item} ${active ? styles.itemActive : ""}`}>
                    <span className={styles.tagLink} onClick={e => onChangeItem(item)}>
                        {item.name}
                    </span>
                    {active ? <i className="pi pi-chevron-circle-down" /> : <i className='pi pi-angle-right'></i>}
                </li>
            </>
        )
    }
    return (
        <div className={styles.fragment}>
            <Dialog header={'Lọc theo loại BĐS'}
                footer={renderFooter()}
                visible={show}
                dismissableMask={true}
                position='top'
                onHide={() => setShow(false)}
                breakpoints={{ '960px': '75vw' }}
                style={{ width: '25vw' }}>
                <ul className={styles.list}>
                    {renderBackItem()}
                    {renderHeadItem()}
                    {items.length > 0 ? renderItems(items) : renderSkeletons()}
                </ul>
            </Dialog>
            <Button
                type="button"
                className={`${styles.button} p-button-outlined ${props.maxWidth ? "w-100" : ""}`}
                label={label}
                onClick={(e: any) => { return setShow(true) }}>
                <span className='pi pi-angle-down'></span>
            </Button>
        </div>
    );
}

const mapStateToProps = ({ postsAttributes, postCollection }: any) => ({
    postCollection: postCollection,
    postsAttributes: postsAttributes,
});

const mapDispatchToProps = (dispatch: any) => {
    return {
        updateQuery: bindActionCreators(updateQuery, dispatch),
        fetchPostsRequest: bindActionCreators(fetchPostsRequest, dispatch),
        fetchPostsSeoMetaRequest: bindActionCreators(fetchPostsSeoMetaRequest, dispatch),
        fetchSpecialtiesRequest: bindActionCreators(fetchSpecialtiesRequest, dispatch),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CategoryFilter)