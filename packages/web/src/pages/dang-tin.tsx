import React, { useEffect, useState } from "react"
import { wrapper } from "@/redux/store";
import MasterLayout from "@/src/components/MasterLayout/Master";
import Container from "@/src/components/PostForm/Container";
import AuthDataService from "@/services/Auth";
import Cookies from 'universal-cookie';
import { fetchCategoriesRequest, fetchAttributesRequest } from "@/redux/actions/postsAttributesAction";
import { fetchLocationsRequest } from "@/redux/actions/locationsAction";
import { FETCH_CITIES } from "@/redux/reducers/locationsReducer";

type Props = {
  hasToken: Boolean,
  account: any
}
const View = (props: Props) => {
  return (
    <MasterLayout>
      <Container />
    </MasterLayout>
  );
}
export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookies = new Cookies(context.req?.headers?.cookie);
  const token = cookies.get('USER_TOKEN');
  if (token) {
    const account = await AuthDataService.getAccount(token);
    if (!account?.data?.phone_verified_at) {
      return {
        redirect: {
          permanent: false,
          destination: "/accounts/onboarding?countinue=/dang-tin&pre=2"
        }
      }
    }
    await context.store.dispatch(fetchCategoriesRequest({ isServer: true }));
    await context.store.dispatch(fetchAttributesRequest());
    await context.store.dispatch(
      fetchLocationsRequest({ isServer: true, type: FETCH_CITIES, parent_id: null })
    );
    return { props: { hasToken: true, account: account } }
  }

  return {
    redirect: {
      permanent: false,
      destination: "/auth/login?countinue=/dang-tin"
    }
  }
});

export default View;