import styles from "./MasterLayout.module.scss";
import Image from "next/image";
import Link from "next/link";
import { LazyLoadImage } from 'react-lazy-load-image-component';

const Footer = () => {
    const d = new Date();
    return (
        <div className={styles.FooterWrapper}>
            <div className={styles.aboutWrapper}>
                <div className="container">
                    <div className={styles.contact}>
                        <div className="p-grid p-fluid">
                            <div className={`p-md-3 p-lg-3 p-col-12 ${styles.footerBge}`}>
                                <small>Quảng cáo đặt tại đây</small>
                            </div>
                            <div className="p-md-3 p-lg-3 p-col-12">
                                <div className={'title'}><b>Bất động sản TP Hồ Chí Minh</b></div>
                                <div><Link href={"/"}><a>Khu vực Quận 1</a></Link></div>
                                <div><Link href={"/"}><a>Khu vực Quận 2</a></Link></div>
                                <div><Link href={"/"}><a>Khu vực Quận 7</a></Link></div>
                            </div>
                            <div className="p-md-3 p-lg-3 p-col-12">
                                <div className={'title'}><b>Bất động sản Hà Nội</b></div>
                                <div><Link href={"/"}><a>Khu vực Quận Cầu Giấy</a></Link></div>
                                <div><Link href={"/"}><a>Khu vực Quận Đống Đa</a></Link></div>
                            </div>
                            <div className="p-md-3 p-lg-3 p-col-12">
                                <div className={'title'}><b>Khu vực khác</b></div>
                                <div><Link href={"/"}><a>Khu vực Bình Dương</a></Link></div>
                                <div><Link href={"/"}><a>Khu vực Đà Nẵng</a></Link></div>
                                <div><Link href={"/"}><a>Khu vực Đồng Nai</a></Link></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.aboutWrapper}>
                <div className="container">
                    <div className={styles.contact}>
                        <div className="p-grid p-fluid">
                            <div className={`p-md-3 p-lg-3 p-col-12 ${styles.logoWrapper}`}>
                                <LazyLoadImage
                                    alt="bdstotnhat.com"
                                    src="/images/logo-white.svg"
                                    width={'160px'}
                                    height={"22px"}
                                />
                            </div>
                            <div className="p-md-3 p-lg-3 p-col-12">
                                <div className={'title'}><b>Về chúng tôi</b></div>
                                <div><Link href={"/"}><a>Về trang này</a></Link></div>
                                <div><Link href={"/"}><a>Chính sách bảo mật</a></Link></div>
                                <div><Link href={"/"}><a>Điều khoản thỏa thuận</a></Link></div>
                            </div>
                            <div className="p-md-3 p-lg-3 p-col-12">
                                <div className={'title'}><b>Chăm sóc khách hàng</b></div>
                                <div><Link href={"/"}><a>Hướng dẫn đăng kí</a></Link></div>
                                <div><Link href={"/"}><a>Hướng dẫn đăng tin</a></Link></div>
                                <div><Link href={"/"}><a>Phản ảnh thành viên</a></Link></div>
                            </div>
                            <div className="p-md-3 p-lg-3 p-col-12">
                                <div className={'title'}><b>Chính sách dịch vụ</b></div>
                                <div><Link href={"/"}><a>Chương trình khuyến mãi</a></Link></div>
                                <div><Link href={"/"}><a>Bảng giá dịch vụ</a></Link></div>
                                <div><Link href={"/"}><a>Các hình thức nạp tiền</a></Link></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.footer}>
                <div className="container">
                    <hr />
                    <div className={styles.footerContent}>
                        <span>
                            {`© ${d.getFullYear()} - Bản quyền thuộc về Bdstotnhat.com`}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Footer;