import React from "react";
import styles from "./Categoies.module.scss";

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { connect } from 'react-redux';

type Props = {
  cities: []
};

const Categoies = (props: Props) => {
  const renderElement = () => {
    const items: any[] = [];
    const limit = 8;
    props.cities.forEach((res: any, key) => {
      if (res.image) {
        items.push(itemTeamplate(res));
      }
      if (key >= limit) return;
    });
    return items;
  };
  const itemTeamplate = (item: any) => {
    return (
      <SwiperSlide>
        <div className={styles.item}>
          <a href={`${item.slug}/mua-ban/`}>
            <div className={styles.itemImage} style={{ backgroundImage: `url(${item.image})`}}/>
            <div className={styles.imageOverlay} />
            <div className={styles.caption}>
              <h3>
                {item.full_name}
              </h3>
              <span>
                0 tin đăng
              </span>
            </div>
          </a>
        </div>  
      </SwiperSlide>

    )
  };
  return (
    <div className={styles.wrapper}>
      <div className="container">
        <div className={styles.header}>
          <h2>Khám phá nhanh khu vực</h2>
        </div>
        <div className={styles.slider}>
        <Swiper
          className={styles.swiper}
          modules={[Scrollbar, Navigation, A11y]}
          navigation
          spaceBetween={40}
          slidesPerView={5}
          breakpoints={{
            320: {
              slidesPerView: 1.5,
            },
            640: {
              slidesPerView: 2.5,
            },
            768: {
              slidesPerView: 3.5,
            },
            1024: {
              slidesPerView: 5,
            },
          }}
        >
          {renderElement()}

        </Swiper>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ locations }: any) => ({
  cities: locations.cities || [],
});

export default connect(mapStateToProps, null)(Categoies)