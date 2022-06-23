import React, { useState, useEffect } from "react";
import styles from "./MasterLayout.module.scss";
import Search from "./Search";
import Bottom from "./Bottom";
import Menu from "./Menu";
import Link from 'next/link'
import { useScrollData } from "@/utils/hooks/useScrollData";
import { classNames } from 'primereact/utils';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { connect } from "react-redux";

const MyHeader = (props: any) => {
  const [mounted, setMounted] = useState(false);
  const {
    position,
  } = useScrollData();
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;
  return (
    <>
      <div className={classNames(
        styles.header,
        position.y !== 0 && props.isMobile ? styles.smallHeader : ''
      )}>
        <div className={"container"}>
          <div className="p-grid p-fluid">
            <div className={"p-col-12 p-md-2 p-lg-2 p-pb-0"}>
              <div className={classNames(
                styles.logo,
                position.y !== 0 ? styles.hidelogo : ''
                )}>
                  {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                  <a href='/'>
                    <LazyLoadImage
                      alt="bdstotnhat.com"
                      src="/images/logo.svg"
                      width={'160px'}
                      height={"22px"}
                    />
                  </a>
              </div>
            </div>
            <div className="p-col-12 p-md-4 p-lg-4  p-pb-0">
              <div className={styles.search}>
                <Search />
              </div>
            </div>
            <div className={"p-col-12 p-md-6 p-lg-6  p-pb-0"}>
              <Menu />
            </div>
          </div>
        </div>
      </div>
      {
        props.isMobile ? <Bottom /> : ""
      }
    </>
  );
};

const mapStateToProps = ({ config }: any) => ({
  isMobile: config.isMobile,
});

export default connect(mapStateToProps, null)(MyHeader)

