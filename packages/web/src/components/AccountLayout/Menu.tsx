import React, {useState, useEffect, useRef} from 'react';
import { Menu } from 'primereact/menu';
import styles from './AccountLayout.module.scss';
import { useRouter } from 'next/router';

const AccountMenu = () => {
    const menu = useRef(null);
    const toast = useRef(null);
    const router = useRouter();

    const items = [
        {
            label: 'Cá nhân',
            items: [
                {
                    label: 'Thay đổi thông tin',
                    command: () => {
                        router.push('/accounts')
                    }
                },
                {
                    label: 'Đổi mật khẩu',
                    command: () => {
                        router.push('/accounts/change-password')
                    }
                }
            ]
        },
        {
            label: 'Tin đăng',
            items: [
                {
                    label: 'Quản lý tin đăng',
                    command:() => {
                        router.push('/accounts/posts')
                    }
                },
                {
                    label: 'Đăng tin mới',
                    command:() => {
                        router.push('/dang-tin')
                    }
                }
            ]
        },
        {
            label: 'Yêu thích',
            items: [
                {
                    label: 'Tin đăng đã lưu',
                },
                {
                    label: 'Tìm kiếm đã lưu',
                }
            ]
        }
    ];

    return (
        <Menu model={items} className={styles.menu} />
    );
}

export default AccountMenu;