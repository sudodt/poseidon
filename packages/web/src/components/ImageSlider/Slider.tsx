/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "./Slider.module.scss";
import { Autoplay, Pagination, Scrollbar, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

type Props = {};

const Slider = (props: Props) => {
  return (
    <Swiper
      className={styles.swiper}
      modules={[Pagination, Scrollbar, A11y, Autoplay]}
      spaceBetween={0}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{ clickable: true }}
    >
      <SwiperSlide className={styles.slideItem}>
        <img src="/images/bg.webp" className={styles.image}/>
      </SwiperSlide>
      <SwiperSlide className={styles.slideItem}>
        <img src="/images/bg2.webp" className={styles.image}/>
      </SwiperSlide>

    </Swiper>
  );
};

export default Slider;
