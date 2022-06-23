import { wrapper } from "@/redux/store";
import { connect } from 'react-redux';
import { fetchCategoriesRequest } from "@/redux/actions/postsAttributesAction";
import { fetchLocationsRequest } from "@/redux/actions/locationsAction";
import { fetchOutstandingPostRequest } from "@/redux/actions/postCollectionAction";
import { FETCH_CITIES } from "@/redux/reducers/locationsReducer";
import MasterLayout from "@/src/components/MasterLayout/Master";
import Slider from "@/components/ImageSlider/Slider";
import Categories from "@/components/CategorySlider/Categories";
import PostCarousel from "@/src/components/PostCarousel/PostCarousel";
import UserCarousel from "@/src/components/UserCarousel/Carousel";
import useMobileDetect from "@/utils/hooks/useMobileDetect";
import app from '../config/app.json';


const Home = (props: any) => {
  const currentDevice = useMobileDetect();
  const isMobile = currentDevice.isMobile() || false;
  const renderPostCarousel = () => {
    const items: JSX.Element[] = [];
    app.demandData.forEach(res => {
      items.push(
        <PostCarousel
          header={`${res.label} Bất động sản`}
          demand={res}
          more={true}
          data={props.outstanding.filter((post: any) => {
            return post.demand.id === res.id
          })} />
      )
    });
    return items;
  }
  return (
    <MasterLayout>
      <Slider />
      <Categories cities={[]} />
      {renderPostCarousel()}
      <UserCarousel header={`Môi giới nổi bật`} />
      {/* {isMobile ? <Bottom /> : ''} */}
    </MasterLayout>
  );
}
export const getServerSideProps = wrapper.getServerSideProps(async ({ store }) => {
  await store.dispatch(fetchCategoriesRequest({ isServer: true }));
  await store.dispatch(fetchOutstandingPostRequest({ isServer: true }));
  await store.dispatch(fetchLocationsRequest({
    isServer: true,
    type: FETCH_CITIES,
    parent_id: null
  }));
  return { props: {} }
})
const mapStateToProps = ({ postCollection }: any) => ({
  outstanding: postCollection.outstanding || [],
});
export default connect(mapStateToProps, null)(Home)