
import React from 'react';
import Link from "next/link";
import styles from "./UserList.module.scss";
import { connect } from 'react-redux';

import app from "../../config/app.json"

const Right = (props: any) => {
    const prefix = "/tim-moi-gioi";
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
                <Link href={`${prefix}/${item.slug}`}>
                    <a>
                        <i className="pi pi-chevron-circle-right p-pr-2" />{item.name}
                    </a>
                </Link>
            </li>
        )
    };

    return (
        <div className={styles.rightContainer}>
            <div className={`p-shadow-2 p-mt-2 ${styles.rightCard}`}>
                {header('Môi giới theo khu vực')}
                <ul className={styles.contentWrapper}>
                    {content(props.cities, 15, 'city')}
                </ul>
            </div>
        </div>
    );
}
const mapStateToProps = ({ locations, postsAttributes, userCollection }: any) => ({
    cities: locations.cities || [],
    categories: postsAttributes.categories,
    query: userCollection.query,
});
export default connect(mapStateToProps, null)(Right)
