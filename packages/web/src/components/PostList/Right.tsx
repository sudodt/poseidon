
import React from 'react';
import Link from "next/link";
import styles from "./PostList.module.scss";
import { connect } from 'react-redux';

import app from "../../config/app.json"

const Right = (props: any) => {
    const query = props.query || {};
    const demand : any = app.demandData.find(res => res.slug === query.demand) || {};
    
    const header = (string: String) => {
        return (
            <div className={styles.headerWrapper}>
                <h4 className={styles.header}>{string}</h4>
            </div>
        )
    }

    const content = (data: [], limit = 10, type : string) => {
        let jsx: JSX.Element[] = [];

        data.every((res, index) => {
            if (type === 'category') {
                jsx.push(itemCategoryTemplate(res));
            }
            if (type === 'city') {
                jsx.push(itemCityTemplate(res));
            }
            if (index > limit) {
                return false;
            };
            return true;
        });

        return jsx;
    }

    const itemCategoryTemplate = (item: any) => {
        return (
            <li className={styles.rightItem}>
                <Link href={`/${demand.slug}-${item.slug}`}>
                    <a>
                        <i className="pi pi-chevron-circle-right p-pr-2" />{item.name}
                    </a>
                </Link>
            </li>
        )
    };

    const itemCityTemplate = (item: any) => {
        return (
            <li className={styles.rightItem}>
                <Link href={`/${item.slug}/${demand.slug}`}>
                    <a>
                        <i className="pi pi-chevron-circle-right p-pr-2" />{item.name}
                    </a>
                </Link>
            </li>
        )
    };

    return (
        <div className={styles.rightContainer}>
            <div className={`p-shadow-2 ${styles.rightCard}`}>
                {header('Loại Bất động sản')}
                <ul className={styles.contentWrapper}>
                    {content(props.categories, 10, 'category')}
                </ul>
            </div>
            <div className={`p-shadow-2 p-mt-2 ${styles.rightCard}`}>
                {header('Bất động sản theo khu vực')}
                <ul className={styles.contentWrapper}>
                    {content(props.cities, 15, 'city')}
                </ul>
            </div>
        </div>
    );
}
const mapStateToProps = ({ locations, postsAttributes, postCollection }: any) => ({
    cities: locations.cities || [],
    categories: postsAttributes.categories,
    query: postCollection.query,
});
export default connect(mapStateToProps, null)(Right)
