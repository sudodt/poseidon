import { toggleMobileMenu } from '@/src/redux/actions/miscAction';
import React, { useRef, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styles from "./Bottom.module.scss";
import { useDebounce } from '@/utils/hooks/useDebounce';

const Bottom = (props : any) => {
    const config = props.config;
    const [openMenu, setOpenMenu] = useState(config.mobileMenuEnabled);
    const debounceOpenMenu = useDebounce(openMenu);
    const toggleMobileMenu = (e : any) => {
        setOpenMenu(!config.mobileMenuEnabled);
    }
    useEffect(() => {props.toggleMobileMenu(openMenu)}, [debounceOpenMenu]);
    return (
        <React.Fragment>
            <div className={styles.listWrraper}>
                <ul className={styles.list}>
                    <li className={styles.itemWrapper}>
                        <div className={styles.item}>
                            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                            <a className={styles.link} href="/">
                                <div className="pi pi-home"/>
                                <div className={styles.linkText}>Trang chủ</div>
                            </a>
                        </div>
                    </li>
                    <li className={styles.itemWrapper}>
                        <div className={styles.item}>
                            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                            <a className={styles.link} href="/dang-tin">
                            <div className="pi pi-pencil"/>
                                <div className={styles.linkText}>Đăng tin</div>
                            </a>
                        </div>
                    </li>
                    <li className={styles.itemWrapper}>
                        <div className={styles.item}>
                            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                            <a className={styles.link} href="/accounts/posts">
                            <div className="pi pi-user"/>
                                <div className={styles.linkText}>Quản lý tin</div>
                            </a>
                        </div>
                    </li>
                    <li className={styles.itemWrapper}>
                        <div className={`${styles.item} ${config.mobileMenuEnabled && styles.itemActive}`}>
                            <a className={styles.link} onClick={toggleMobileMenu}>
                                <div className="pi pi-ellipsis-h"/>
                                <div className={styles.linkText}>Thêm</div>
                            </a>
                        </div>
                    </li>
                </ul>
            </div>
        </React.Fragment>
    )
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        toggleMobileMenu: bindActionCreators(toggleMobileMenu, dispatch),
    }
}
const mapStateToProps = ({ config }: any) => ({
    config: config || {},
});

export default connect(mapStateToProps, mapDispatchToProps)(Bottom);