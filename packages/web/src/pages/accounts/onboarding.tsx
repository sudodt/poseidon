import React, { useEffect, useState } from "react"
import { wrapper } from "@/redux/store";
import MasterLayout from "@/src/components/MasterLayout/Master";
import Onboarding from "@/src/components/AccountProfile/Onboarding";
import Cookies from 'universal-cookie';
import { fetchAccountRequest } from '@/redux/actions/accountsAction';

type Props = {
  hasToken: Boolean,
  account: any
}
const OnboardingPage = (props : Props) => {

  return (
    <MasterLayout>
      <Onboarding />
    </MasterLayout>
  );
}
export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookies = new Cookies(context.req?.headers?.cookie);
  const token = cookies.get('USER_TOKEN');
  if (token) {
    await context.store.dispatch(fetchAccountRequest({ token: token, isServer: true }));
    const state = context.store.getState();
    const account = state.accounts?.account || {};
    if (account.phone_verified_at) {
      return {
        redirect: {
          permanent: false,
          destination: "/accounts"
        }
      }
    }
    return { props: { hasToken : true } }
  }
  return {
    redirect: {
      permanent: false,
      destination: "/auth/login?countinue=/accounts/onboarding"
    }
  }
});

export default OnboardingPage;