import { wrapper } from "@/redux/store";
import { fetchUsersRequest } from "@/redux/actions/userCollectionAction";
import { fetchLocationsRequest } from "@/redux/actions/locationsAction";
import { FETCH_CITIES } from "@/redux/reducers/locationsReducer";
import MasterLayout from "@/src/components/MasterLayout/Master";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import styles from "@/components/UserList/UserList.module.scss";
import Breadcrumb from "@/components/UserList/Breadcrumb";
import Filter from "@/components/UserList/Filter";
import Collection from "@/components/UserList/Collection";
import Right from "@/components/UserList/Right";


const View = (props: any) => {
    const router = useRouter();
    const d = new Date();
    const userCollection = props.userCollection;
    const search = userCollection.search;
    const month = d.getMonth() + 1;
    const year = d.getFullYear();

    return (
        <MasterLayout>
            <NextSeo
                    title={`Danh sách môi giới mới nhất tháng ${month} ${year}`}
                    description={`Danh sách môi giới mới nhất tháng ${month} ${year}`}
                    openGraph={{
                        url: 'https://bdstotnhat.com' + router.asPath,
                        title: `Danh sách môi giới mới nhất tháng ${month} ${year}}`,
                        description: `Danh sách môi giới mới nhất tháng ${month} ${year}}`,
                        images: [
                            {
                                url: 'https://bdstotnhat.com/_next/image?url=%2Fimages%2Flogo.svg&w=384&q=100'
                            }
                        ],
                        site_name: 'bdstotnhat.com',
                    }
                    }
                />
            <Filter />
            <Breadcrumb />
            <div className={styles.container}>
                <div className="container">
                    <div className={"p-grid"}>
                        <div className="p-col-12 p-md-9 p-lg-9">
                            <div className={"p-pt-2 p-pb-2"}>
                                <h2 className={styles.metaTitle}>{`Danh sách môi giới đang hoạt động tháng ${month} ${year}`}</h2>
                                <span>Tìm thấy {search.meta.total} môi giới đang hoạt động</span>
                            </div>
                            <div className="post--wrapper">
                                <Collection data={search.data}/>
                            </div>
                        </div>
                        <div className="p-col-12 p-md-3 p-lg-3">
                            <Right/>
                        </div>
                    </div>
                </div>
            </div>
        </MasterLayout>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
    await context.store.dispatch(
        fetchLocationsRequest({ isServer: true, type: FETCH_CITIES, parent_id: null })
    );
    await context.store.dispatch(fetchUsersRequest({
        isServer: true,
        data: context.query
    }));
    return {
        props: context.store.getState()
    }
});

export default View