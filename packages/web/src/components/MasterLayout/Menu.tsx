import styles from "./MasterLayout.module.scss";
import { Button } from 'primereact/button';
import { Ripple } from 'primereact/ripple';
import Cookies from 'universal-cookie';
import { insert } from '@/utils/misc';

import { useEffect } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { fetchAccountRequest } from '@/redux/actions/accountsAction';
import router from "next/router";
import UserMenu from "./UserMenu"
import { classNames } from "primereact/utils";

const Menu = (props: any) => {
  const cookie = new Cookies();
  const token = cookie.get('USER_TOKEN');
  const account = props.account || false;
  const config = props.config;

  let listMenu = [
    {
      label: "Mua bán",
      url: "/mua-ban",
    },
    {
      label: "Cho thuê",
      url: "/cho-thue",
    },
    {
      label: "Môi giới",
      url: "/tim-moi-gioi",
    },

    {
      label: "Đăng tin",
      icon: "pi pi-pencil",
      url: "/dang-tin",
    },
  ];

  if (!token) {
    listMenu = insert(listMenu, 3, {
      label: "Đăng nhập",
      url: "/auth/login",
    });
  } else {
    listMenu = insert(listMenu, 3, {
      label: account.name,
      url: "/accounts",
    });
  }

  const renderItems = () => {
    const items: JSX.Element[] = [];
    listMenu.forEach((res) => {
      if (res.url === "/accounts") {
        items.push(<UserMenu user={res} />);
      }
      else items.push(
        <li>
          {res.icon ? (
            <Button {...res} className="p-button-outlined p-ripple"
              onClick={e => { router.push(`/${res.url}`) }}
            >
              <Ripple />
            </Button>
          ) : (
            <a href={res.url}>
              {res.icon && <i className={`${res.icon}`} />}
              {res.label}
            </a>
          )}
        </li>
      );
    });
    return items;
  };

  return (
    <div className={`${styles.menu} ${config.mobileMenuEnabled && styles.menuOpen}`}>
      <ul className={styles.menuList}>
        {renderItems()}
      </ul>
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchAccountRequest: bindActionCreators(fetchAccountRequest, dispatch),
  }
}

const mapStateToProps = ({ accounts, config }: any) => ({
  account: accounts.account,
  config: config
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu)
