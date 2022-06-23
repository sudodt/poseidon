import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styles from './AccountProfile.module.scss';
import { getImageUrl } from "@/utils/url"

const mapStateToProps = ({ accounts }: any) => ({
    account: accounts?.account || {},
});

type Props = {
    editMode: Boolean,
    account: any,
    setValue: any
}

const Avatar = (props: Props) => {
    const account = props.account;
    const [file, setFile] = useState(null);
    const [image, setImage] = useState(getImageUrl(account.avatar));

    useEffect(() => {
        setImage(getImageUrl(account.avatar))
    }, [account])
    
    const onFileChange = (e : any) => {
        setFile(e.target.files[0]);
    }
    
    useEffect(() => {
        let objectUrl = ""
        if (file) {
            props.setValue("avatar", file)
            objectUrl = URL.createObjectURL(file)
            setImage(objectUrl)
        }

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [file])

    return (
        <React.Fragment>
            <div className={styles.wrapper}>
                <div 
                    className={styles.avatar} 
                    style={{ backgroundImage: `url(${image})` }}
                >
                    {props.editMode &&
                    <>
                        <input type="file" onChange={onFileChange} className={styles.inputFile}/>
                        <span className={styles.icon}>
                            <i className={`pi pi-camera`}></i>
                        </span>
                    </>
                    }
                </div>

                <div className={styles.displayName}>
                    <span>{account.name}</span>
                </div>
            </div>
        </React.Fragment>
    )
}

export default connect(mapStateToProps, null)(Avatar)
