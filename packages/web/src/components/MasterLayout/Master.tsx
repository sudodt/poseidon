import styles from "./MasterLayout.module.scss";
import MyHeader from "./Header";
import Footer from "./Footer";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import useMobileDetect from "@/utils/hooks/useMobileDetect";
import { mobileDetect } from "@/redux/actions/miscAction"
import { useEffect } from "react";

const Master = (props: any) => {
  const currentDevice = useMobileDetect();
  useEffect(() => {
    props.mobileDetect(currentDevice.isMobile());
  }, []);
  
  return (
    <>
      <MyHeader />
      <div className={styles.content}>
        {props.children}
      </div>
      <Footer />
    </>
  );

};
const mapDispatchToProps = (dispatch: any) => {
  return {
    mobileDetect: bindActionCreators(mobileDetect, dispatch),
  }
}

export default connect(null, mapDispatchToProps)(Master)