
import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { BreadCrumb } from 'primereact/breadcrumb';
import styles from "./PostList.module.scss"
import app from '../../config/app.json';

const ListPostBreadCrumb = (props: any) => {
    let items = [];
    const home = { icon: 'pi pi-home', url: '/' };
    const demand = app.demandData.find((demand: any) => demand.slug === props.searchQuery.demand) || false;
    const category = props.categories.find((category: any) => category.slug === props.searchQuery.category) || { };
    
    if (demand) {
        if (props.searchQuery.city) {
            const city = props.cities.find((city: any) => city.slug === props.searchQuery.city) || false;

            city && items.push({
                label: `${city.name}`,
                url: `/${city.slug}/${demand.slug}`
            })

            if (props.searchQuery.district) {
                const district = props.districts.find((district: any) => district.slug === props.searchQuery.district) || false;
                
                district && items.push({
                    label: `${district.name}`,
                    url: `/${city.slug}/${district.slug}/${demand.slug}`
                })
            }
        }

        if (!props.searchQuery.category) {
            items.push({
                label: `${demand.label}`,
                url: `/${demand.slug}`
            })
        } else {
            items.push({
                label: `${demand.label} ${category.name}`,
                url: `/${demand.slug}-${category.slug}`
            })
        }

    }
    
    return (
        <div>
            <div className="container">
                <div className="card">
                    <BreadCrumb model={items} home={home} className={styles.breadcrumb} />
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = ({ postCollection, locations, postsAttributes }: any) => ({
    searchQuery: postCollection.query,
    cities: locations.cities,
    districts: locations.districts,
    wards: locations.wards,
    streets: locations.streets,
    areas: locations.areas,
    categories: postsAttributes.categories
});

export default connect(mapStateToProps, null)(ListPostBreadCrumb)