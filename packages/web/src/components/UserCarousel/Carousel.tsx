import React, { useState, useEffect, useCallback } from "react";
import styles from "./UserCarousel.module.scss";
import { getUserAvatar } from '@/utils/user';
import UserDataService from '@/services/User';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { Navigation, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';

type Props = {
  header: String
};

const UserCarousel = (props: Props) => {

  const [collection, setCollection] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      const usersCollection = await UserDataService.fetch({ "sort": "id-2" });
      return setCollection(usersCollection.data);
    };
    fetchData();
  }, [])

  const renderElement = () => {
    const items: any[] = [];
    collection.forEach((res: any) => {
      items.push(itemTeamplate(res));
    });
    return items;
  };

  const itemTeamplate = (item: any) => {

    return (
      <SwiperSlide>
      <div className={styles.item}>
        <div className={styles.itemContainer}>
          <a href={`/me/${item.slug}-uid-${item.uuid}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <LazyLoadImage
              className={styles.image}
              alt={item.name}
              src={getUserAvatar(item.profile)}
              effect="opacity"
              width="120px"
              height="120px"
            />
            <div>{item.name}</div>
          </a>
        </div>
      </div>
      </SwiperSlide>
    )
  };

  return (
    <div className={styles.wrapper}>
      <div className="container">
        <div className={styles.header}>
          <h2>{props.header}</h2>
        </div>
        <div className={styles.slider}>
        <Swiper
          className={styles.swiper}
          modules={[Scrollbar, Navigation, A11y]}
          navigation
          spaceBetween={20}
          slidesPerView={4}
          breakpoints={{
            320: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 3.5,
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


export default UserCarousel;