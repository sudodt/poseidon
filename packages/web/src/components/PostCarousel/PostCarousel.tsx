import React from "react";
import styles from "./PostCarousel.module.scss";
import { getAddressString } from '@/utils/location';
import { priceText } from '@/utils/price';
import { getUserAvatar } from '@/utils/user';
import { getThumbImageSrc } from '@/utils/post';
import { Avatar } from 'primereact/avatar';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { Navigation, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';

import { BiShapeSquare, BiDollarCircle } from 'react-icons/bi'

type Props = {
  data: [],
  header: String,
  demand?: any,
  more?: boolean,
};

const PostCarousel = (props: Props) => {

  const renderElement = () => {
    const items: any[] = [];
    props.data.forEach((res: any, key) => {
      items.push(itemTeamplate(res));
    });
    return items;
  };
  const itemTeamplate = (item: any) => {

    return (
      <SwiperSlide>
      <div className={styles.item}>
        <div className="p-shadow-3 p-br-3">
          <a href={`${item.slug}-pid-${item.uuid}`}>
            <div className={styles.imageWrapper}>
              <LazyLoadImage
                alt={item.title}
                className={styles.image}
                src={getThumbImageSrc(item.images)}
                effect="opacity"
                width={'100%'}
                height={"auto"}
              />
              <span className={styles.imageCounter}>
                <i className="pi pi-images" />
                <span>{item.images.length}</span>
              </span>
            </div>
          </a>
          <div className={styles.content}>
            <a href={`${item.slug}-pid-${item.uuid}`}>
              <h3 className={styles.title}>{item.title}</h3>
            </a>
            <div className={styles.address}>
              <i className="pi pi-map-marker p-pr-1"></i>
              {getAddressString(item, true)
              }</div>
          </div>
          <div className={styles.sperate} />
          <div className={styles.moreInfo}>
            <div className={styles.price}>
              <span>{priceText(item.price)}</span>
            </div>
            <div className={styles.moreInRight}>
              <BiShapeSquare size={20} /> <span>{item.acreage} m2</span>
            </div>
          </div>
          <div className={styles.sperate} />
          <div className={styles.moreInfo}>
            <div className={styles.userInfo}>
              <span>
                <Avatar image={getUserAvatar(item.user.profile)} shape="circle" className="p-mr-2" />
                {item.user.name}
              </span>
            </div>
            <div className={styles.moreInRight}>
              <span>{item.created_at}</span>
            </div>
          </div>
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
              slidesPerView: 1.5,
            },
            640: {
              slidesPerView: 2.5,
            },
            768: {
              slidesPerView: 2.5,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
        >
          {renderElement()}

        </Swiper>
        </div>
        {props.more &&
          <div className="w-100 p-d-flex p-ai-center p-jc-center">
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a href={`/${props?.demand?.slug}`} className={styles.link}>
              Xem thêm các tin đăng {props.header} khác
            </a>
          </div>
        }
      </div>
    </div>
  );
};


export default PostCarousel;