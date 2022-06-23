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

import LocationFilter from "./LocationFilter";
import CategoryFilter from "./CategoryFilter";
import PriceFilter from "./PriceFilter";
import AcreageFilter from "./AcreageFilter";
import Counter from "./Counter";

import { Dropdown } from 'primereact/dropdown';
import { useRouter } from "next/router";
import * as opts from '../../../config/selectOptions';
import useMobileDetect from "@/utils/hooks/useMobileDetect";

type IDropdownProps = {
    label : string,
    searchKey : string,
    placeholder : string,
    options : any,
    action : any,
    value: any,
}

const AdvancedFilter = (props: any) => {
    const searchQuery = props.postCollection.query;
    const router = useRouter();
    const [show, setShow] = useState(false);
    const [label, setLabel] = useState(`Lọc`);
    const search = props.search;
    const currentDevice = useMobileDetect();
    const isMobile = currentDevice.isMobile() || false;

    const handle = (option : any) => {
        props.search(option);
    }

    const renderFooter = () => {
        return (
            <React.Fragment>
                <Button type="button"
                    onClick={(e: any) => { return setShow(false) }}
                    label="Bỏ lọc" className="p-mt-2 p-button-text p-ripple" >
                </Button>
                <Button type="button"
                    onClick={(e: any) => { return setShow(false) }}
                    label="Áp dụng" className="p-mt-2 p-ripple" >
                </Button>
            </React.Fragment>
        )
    }

    return (
        <div className={styles.fragment}>
            <Dialog header={'Lọc kết quả'}
                footer={renderFooter()}
                visible={show}
                dismissableMask={true}
                position='top'
                onHide={() => setShow(false)}
                breakpoints={{ '960px': '75vw' }}
                style={{ width: '25vw' }}>
                <div className="p-col-12">
                    <label className="p-d-block p-pb-1">Vị trí</label>
                    <LocationFilter search={search} maxWidth={true}/>
                </div>
                <div className="p-col-12">
                    <label className="p-d-block p-pb-1">Loại BĐS</label>
                    <CategoryFilter search={search} maxWidth={true}/>
                </div>
                <div className="p-col-12">
                    <label className="p-d-block p-pb-1">Khoảng giá</label>
                    <PriceFilter search={search} maxWidth={true}/>
                </div>
                <div className="p-col-12">
                    <label className="p-d-block p-pb-1">Diện tích</label>
                    <AcreageFilter search={search} maxWidth={true}/>
                </div>
                <div className="p-col-12">
                    <label className="p-d-block p-pb-1">Số phòng ngủ</label>
                    <Counter
                        search={search}
                        string="phòng ngủ"
                        searchKey="bedroom"
                    />
                </div>
                <div className="p-col-12">
                    <label className="p-d-block p-pb-1">Số WC</label>
                    <Counter
                        search={search}
                        string="WC"
                        searchKey="bathroom"
                    />
                </div>
                <div className="p-col-12">
                    <DropdownFilter
                        placeholder={"Hướng bất kì"}
                        label="Hướng cửa chính"
                        searchKey="direction"
                        options={opts.directOptions}
                        action={handle}
                        value={searchQuery.direction}
                    />
                </div>
                <div className="p-col-12">
                    <DropdownFilter
                        placeholder={"Pháp lý bất kì"}
                        label="Giấy tờ pháp lý"
                        searchKey="juridical"
                        options={opts.juridicalOptions}
                        action={handle}
                        value={searchQuery.juridical}
                    />
                </div>
            </Dialog>
            <Button
                    type="button"
                    icon="pi pi-filter"
                    className={`${styles.button} p-button-outlined`}
                    label={label}
                    onClick={(e: any) => { return setShow(true) }}>
                    <span className='pi pi-angle-down'></span>
                </Button>
            
        </div>
    );
}

const DropdownFilter = (props : IDropdownProps) => {
    const onChangeSelection = (e : any) => {
        let targetOption = props.options.find((res : any) => {
            return parseInt(res.value) == parseInt(e.value); 
        })
        Object.assign(targetOption, {key : props.searchKey});
        return props.action(targetOption);
    };

    return (
        <React.Fragment>
            <label className="p-d-block p-pb-1">{props.label}</label>
            <Dropdown
                placeholder={props.placeholder}
                className={`w-100`}
                options={props.options}
                optionLabel="label"
                onChange={onChangeSelection}
                value={props.value}
            />
        </React.Fragment>
    )
}

const mapStateToProps = ({ postsAttributes, postCollection }: any) => ({
    categories: postsAttributes.categories,
    postCollection: postCollection
});

const mapDispatchToProps = (dispatch: any) => {
    return {
        updateQuery: bindActionCreators(updateQuery, dispatch),
        fetchPostsRequest: bindActionCreators(fetchPostsRequest, dispatch),
        fetchPostsSeoMetaRequest: bindActionCreators(fetchPostsSeoMetaRequest, dispatch),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AdvancedFilter)