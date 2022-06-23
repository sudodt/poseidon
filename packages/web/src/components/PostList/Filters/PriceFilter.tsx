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
import { priceText } from '@/utils/price';
import { Slider } from 'primereact/slider';

const computeRate = (demand: string) => {
    if (demand === 'cho-thue') {
        return 1000000;
    }
    else return 100000000
}
const parsePrice = (value: any, rate: number) => {
    const arr = (value || '').split("-");
    const from = parseInt(arr[0]) / rate || 0;
    const to = parseInt(arr[1]) / rate || 0;

    return [from, to];
}

const PriceFilter = (props: any) => {
    const searchQuery = props.postCollection.query;
    const price = searchQuery.price;
    const rate = computeRate(searchQuery.demand);
    const [show, setShow] = useState(false);
    const [label, setLabel] = useState(`Khoảng giá`);
    const [value, setValue] = useState<any>([0, 100]);
    const [min, setMin] = useState<any>(0);
    const [max, setMax] = useState<any>(0);
    // handle click 
    const onChangeSelection = (option: any) => {
        props.search({
            key: "price",
            slug: `${min}-${max}`
        });
        setShow(false)
    }

    // rendering
    const renderSlideMenu = () => {
        return (<Slider value={value} onChange={(e) => setValue(e.value)} range />)
    }

    const renderText = () => {
        const from = (min).toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
        const to = (max).toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
        return (
            <span className='p-mb-2'>Giá từ {from} đến {to}</span>
        )
    }

    const renderFooter = () => {
        return (
            <React.Fragment>
                <Button type="button"
                    onClick={onChangeSelection}
                    label="Áp dụng" className="p-mt-2 p-ripple" >
                </Button>
            </React.Fragment>
        )
    }

    useEffect(() => {
        setMin(value[0] * rate);
        setMax(value[1] * rate);
    }, [rate, value]);

    useEffect(() => {
        let string = '';
        if (value[0] === 0 && value[1] === 0)
            return;
        string += `${priceText(value[0] * rate)}`;

        if (value[1]) {
            string += ` - ${priceText(value[1] * rate)}`;
        }
        setLabel(string);
    }, [value, searchQuery.demand, rate]);

    return (
        <div className={styles.fragment}>
            <Dialog header={'Giá'}
                footer={renderFooter()}
                visible={show}
                dismissableMask={true}
                position='top'
                onHide={() => setShow(false)}
                breakpoints={{ '960px': '75vw' }}
                style={{ width: '25vw' }}>
                {renderText()}
                <div className='p-pt-5'>
                    {renderSlideMenu()}
                </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(PriceFilter)