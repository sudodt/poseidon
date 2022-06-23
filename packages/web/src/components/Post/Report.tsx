import React, { useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import styles from './Post.module.scss'
import { Checkbox } from 'primereact/checkbox';
const Reasons = [
    'Nội dung tin không đúng (giá, diện tích, mô tả, ...)',
    'Địa chỉ của bất động sản không đúng',
    'Ảnh không đúng với thực tế',
    'Không liên lạc được với người bán',
    'Bất động sản đã bán/cho thuê',
    'Tin không có thật',
    'Tin trùng với tin khác'
]
const Share = () => {
    const [show, setShow] = useState(false);
    const [reasons, setReasons] = useState<any>([]);

    const onReasonChange = (e: any) => {
        let selectedReason:any[] = [...reasons];
        if (e.checked)
            selectedReason.push(e.value);
        else
            selectedReason.splice(selectedReason.indexOf(e.value), 1);
        setReasons(selectedReason);
    }

    const renderHeader = () => {
        return (
            <React.Fragment>
                <span>
                    <i className={"pi pi-flag p-mr-2"}></i>
                    Báo cáo vi phạm
                </span>
            </React.Fragment>
        )
    }

    const renderFooter = () => {
        return (
            <div>
                <Button label="Đóng" icon="pi pi-times" onClick={() => setShow(false)} className="p-button-text" />
                <Button label="Gửi báo cáo" icon="pi pi-check" onClick={() => setShow(false)} autoFocus />
            </div>
        )
    }

    const renderCheckBox = () => {
        let jsx:any[] = [];
        Reasons.forEach((res, key) => {
            jsx.push(chechBoxTemplate(key, res))
        });
        return jsx;
    }

    const chechBoxTemplate = (id : number , text: any) => {
        return (<div className="p-col-12">
            <Checkbox inputId={`report--reason${id}`} value={text} onChange={onReasonChange} checked={reasons.includes(text)}></Checkbox>
            <label htmlFor={`report--reason${id}`} className="p-checkbox-label p-ml-2">{text}</label>
        </div>)
    }

    return (
        <React.Fragment>
            <div className={'p-d-flex'}>
                <Button icon={'pi pi-flag'}
                    onClick={e => setShow(true)}
                    className={`p-button-outlined ${styles.btnWarning}`}
                    label={'Báo cáo vi phạm'} />
            </div>
            <Dialog header={renderHeader()}
                visible={show}
                onHide={() => setShow(false)}
                breakpoints={{ '960px': '75vw' }}
                style={{ width: '40vw' }}
                footer={renderFooter()}>
                <div className={'p-grid'}>
                    {renderCheckBox()}
                </div>
            </Dialog>
        </React.Fragment>
    )
};
export default Share;