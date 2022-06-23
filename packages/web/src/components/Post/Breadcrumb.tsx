
import React, { useEffect } from 'react';
import styles from "./Post.module.scss";
import { BreadCrumb } from 'primereact/breadcrumb';
import Link from 'next/link';
import useMobileDetect from "@/utils/hooks/useMobileDetect";

type Props = {
    data: any
}
const Breadcrumb = (props: Props) => {
    const data = props.data || {};
    const demand = data.demand || {};
    const category = data.category || {};
    const city = data.city || {};
    const district = data.district || {};
    const currentDevice = useMobileDetect();
    const isMobile = currentDevice.isMobile() || false;
    let items = [];
    items.push(
        {
            label: `${demand.name} ${category.name}`,
            url: `/${demand.slug}-${category.slug}`
        },
        {
            label: `${city.name}`,
            url: `${city.slug}/${demand.slug}-${category.slug}/`
        },
        {
            label: `${district.name}`,
            url: `/${city.slug}/${district.slug}/${demand.slug}-${category.slug}/`
        },
        {
            label: `${data.title}`,
            url: `/${data.slug}-pid-${data.uuid}`
        })


    const home = { icon: 'pi pi-home', url: '/' }
    return (
        <div className={styles.breadcrumbWrapper}>
            <div className={'container'}>
                <div className={styles.breadcrumb}>
                    <div className={'p-grid'}>
                        <div className={"p-col-12 p-lg-9"}>
                            <BreadCrumb model={items} home={home} className={styles.breadcrumbContainer} />
                        </div>
                        <div className={`p-col-12 p-lg-3 ${styles.routeWrapper}`}>
                            <div className={styles.route}>
                                <Link href={'/'}>
                                    <a className={styles.back}>
                                        Về danh sách
                                    </a>
                                </Link>
                                <Link href={'/'}>
                                    <a className={styles.next}>
                                        Tin kế
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Breadcrumb;