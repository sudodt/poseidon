
import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { BreadCrumb } from 'primereact/breadcrumb';
import styles from "./UserList.module.scss"

const ListUserBreadCrumb = (props: any) => {
    let items = [
        {
            label : "Tìm môi giới",
            url : "/tim-moi-gioi"
        }
    ];
    const home = { icon: 'pi pi-home', url: '/' };
    const prefix = '/';

    if (props.searchQuery.city) {
        const city = props.cities.find((city: any) => city.slug === props.searchQuery.city) || false;

        city && items.push({
            label: `${city.name}`,
            url: `${prefix}/${city.slug}`
        })

        if (props.searchQuery.district) {
            const district = props.districts.find((district: any) => district.slug === props.searchQuery.district) || false;
            
            district && items.push({
                label: `${district.full_name}`,
                url: `${prefix}/${city.slug}/${district.slug}`
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

const mapStateToProps = ({ userCollection, locations }: any) => ({
    searchQuery: userCollection.query,
    cities: locations.cities,
    districts: locations.districts,
});

export default connect(mapStateToProps, null)(ListUserBreadCrumb)