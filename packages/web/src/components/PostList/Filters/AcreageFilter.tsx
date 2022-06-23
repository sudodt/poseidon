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

import { Slider } from 'primereact/slider';

const AcreageFilter = (props: any) => {
    const [show, setShow] = useState(false);
    const [label, setLabel] = useState(`Diện tích`);
    const [value, setValue] = useState<any>([0, 100]);
    const [min, setMin] = useState<any>(0);
    const [max, setMax] = useState<any>(0);
    const rate = 10;
    // handle click 
    const onChangeSelection = (option: any) => {
        props.search({
            key : "acreage",
            slug : `${min}-${max}`
        });
        setShow(false)
    }

    // rendering
    const renderSlideMenu = () => {
        return (<Slider value={value} onChange={(e) => setValue(e.value)} range />)
    }

    const renderText = () => {
        const from = (min).toLocaleString('it-IT');
        const to = (max).toLocaleString('it-IT');
        return (
            <span className='p-mb-2'>Diện tích từ {from} m<sup>2</sup> đến {to} m<sup>2</sup></span>
        )
    }

    const renderFooter = () => {
        return (
            <React.Fragment>
                <Button type="button"
                    onClick={onChangeSelection}
                    label="Áp dụng" className="p-mt-2 p-ripple">
                </Button>
            </React.Fragment>
        )
    }

    useEffect(() => {
        setMin(value[0] * rate);
        setMax(value[1] * rate);
        
    }, [rate, value]);

    useEffect(() => {
        const from = (min).toLocaleString('it-IT');
        const to = (max).toLocaleString('it-IT');
        setLabel(`${from} m2 - ${to} m2`);
    }, [min, max]);

    return (
        <div className={styles.fragment}>
            <Dialog header={'Diện tích'}
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
export default connect(mapStateToProps, mapDispatchToProps)(AcreageFilter)