import React, { useState, useEffect } from "react";
import styles from './Post.module.scss'
import { connect } from 'react-redux';

const InternalLink = (props : any) => {

    const data = props.data;
    const demand = data.demand || {};
    const category = data.category || {};
    const city = data.city || {};
    const district = data.district || {};
    const list = [
        {
            'url' : `${demand.slug}-${category.slug}`,
            'label' : `${demand.name} ${category.name}`
        },
        {
            'url' : `${city.slug}/${demand.slug}-${category.slug}`,
            'label' : `${category.name} khu vực ${city.name}`
        },
        {
            'url' : `${city.slug}/${district.slug}/${demand.slug}-${category.slug}`,
            'label' : `${category.name} khu vực ${district.name}, ${city.name}`
        },
    ]


    const itemTemplate = (item : any) => {
        return (
            <a className={styles.urlRecommendTag} href={item.url}>
                {item.label}
            </a>
        )
    };

    const renderElement = () => {
        const items: any[] = [];
        list.forEach((res: any, key : any) => {
          items.push(itemTemplate(res));
        });
        return items;
    };

    return (
        <div className={styles.urlRecommendwrapper}>
            <div className={styles.urlRecommendTitle}>
                <span>Có thể bạn quan tâm</span>
            </div>
            <div>
                {renderElement()}
            </div>
        </div>
    )
}
const mapStateToProps = ({ post }: any) => ({
    data: post.data || {},
});
export default connect(mapStateToProps, null)(InternalLink)