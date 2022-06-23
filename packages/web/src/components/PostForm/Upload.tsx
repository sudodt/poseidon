
import React, { useState, useEffect, useRef } from 'react';
import { Card } from 'primereact/card';
import { useFormContext, Controller } from 'react-hook-form';
import styles from "./Detail.module.scss";

import { FileUpload } from 'primereact/fileupload';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';

const Upload = (props: any) => {
    const { control, formState: { errors }, handleSubmit, reset, setValue, watch } = useFormContext();

    const fileUploadRef = useRef<any>(null);

    const onTemplateSelect = (e: any) => {
        setValue('images', fileUploadRef.current.files)
    }
   
    const onTemplateRemove = (file: any, callback: any) => {
        const removedItemIndex = fileUploadRef.current.files.findIndex((res: any) => res.name === file.name);
        callback();
        fileUploadRef.current.files.splice(removedItemIndex, 1);
        setValue('images', fileUploadRef.current.files)
    }

    const headerTemplate = (options: any) => {
        const { className, chooseButton, cancelButton } = options;

        return (
            <div className={className} style={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center' }}>
                {chooseButton}
                {cancelButton}
            </div>
        );
    }

    const itemTemplate = (file: any, props: any) => {
        return (
            <div className="p-d-flex p-ai-center p-flex-wrap">
                <div className="p-d-flex p-ai-center" style={{ width: '40%' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img alt={file.name} role="presentation" src={file.objectURL} width={100} />
                    <span className="p-d-flex p-dir-col p-text-left p-ml-3">
                        {file.name}
                        <small>{new Date().toLocaleDateString()}</small>
                    </span>
                </div>
                <Tag value={props.formatSize} severity="warning" className="p-px-3 p-py-2" />
                <Button type="button" icon="pi pi-times" className="p-button-outlined p-button-rounded p-button-danger p-ml-auto" onClick={() => onTemplateRemove(file, props.onRemove)} />
            </div>
        )
    }

    const emptyTemplate = () => {
        return (
            <div className="p-d-flex p-ai-center p-dir-col">
                <i className="pi pi-image p-mt-3 p-p-5" style={{ 'fontSize': '5em', borderRadius: '50%', backgroundColor: 'var(--surface-b)', color: 'var(--surface-d)' }}></i>
                <span style={{ 'fontSize': '1.2em', color: 'var(--text-color-secondary)' }} 
                    className="p-my-5">
                    Drag and Drop Image Here
                </span>
            </div>
        )
    }

    const chooseOptions = { 
        icon: 'pi pi-fw pi-cloud-upload', 
        label: 'Thêm ảnh', 
        className: 'custom-choose-btn p-button-rounded p-button-outlined' 
    };
    const cancelOptions = { 
        icon: 'pi pi-fw pi-times', 
        label: 'Làm mới', 
        className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined' 
    };

    return (
        <div className={`${styles.wrapper} container`}>
            <Card>
                <h3>3. Tải lên</h3>
                <div className={"p-grid"}>
                    <div className="p-col-12">
                        <FileUpload ref={fileUploadRef} 
                            name="images[]"
                            multiple
                            accept="image/*" maxFileSize={1000000}
                            onSelect={onTemplateSelect} 
                            headerTemplate={headerTemplate} 
                            itemTemplate={itemTemplate} 
                            emptyTemplate={emptyTemplate}
                            chooseOptions={chooseOptions} 
                            cancelOptions={cancelOptions} />
                    </div>

                </div>
            </Card>
        </div>
    );
}


export default Upload