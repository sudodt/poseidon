import React, { useRef } from 'react';
import { Menu } from 'primereact/menu';
import styles from "./MasterLayout.module.scss"; 
import AuthService from '@/src/services/Auth';
import Cookies from 'universal-cookie';
import { Avatar } from 'primereact/avatar';
import { useRouter } from 'next/router';
import { getImageUrl } from "@/utils/url"
const UserMenu = ({user} : any) => {
    const menu = useRef<any>(null);
    const router = useRouter();
    const cookie = new Cookies();
    const dataProfile = cookie.get('USER_PROFILE');
    const items = [
        {
            label: 'Lối tắt',
            items: [
                {
                    label: 'Trang cá nhân',
                    icon: 'pi pi-users',
                    command: () => {
                        router.push('/accounts');
                    }
                },
                {
                    label: 'Danh sách tin đăng',
                    icon: 'pi pi-list',
                    command: () => {
                        router.push('/accounts/posts');
                    }
                },
                {
                    label: 'Yêu thích',
                    icon: 'pi pi-heart',
                    command: () => {
                        router.push('/accounts/favorites');
                    }
                },
                {
                    label: 'Đăng xuất',
                    icon: 'pi pi-power-off',
                    command: (e: any) => {
                        const token = cookie.get('USER_TOKEN');
                        AuthService.logout(token);
                        cookie.remove('USER_TOKEN');
                        window.location.reload();
                    }
                }
            ]
        }
    ];

    return (
        <li>
            <Menu model={items} popup ref={menu} id="popup_menu" />
            <a onClick={(event) => menu.current.toggle(event)} 
                className={styles.button}
                aria-controls="popup_menu" aria-haspopup >
                    <Avatar image={getImageUrl(dataProfile.avatar)} shape="circle"/>
                    <span className={"p-pl-2"}>
                        {dataProfile.name}
                    </span>
            </a>
        </li>
    );
}

export default UserMenu;