import React, {useEffect, useState} from "react"
import { wrapper } from "@/redux/store";
import MasterLayout from "@/src/components/MasterLayout/Master";
import Cookies from 'universal-cookie';
import {useRouter} from 'next/router'
import AccountLayout from "@/src/components/AccountLayout/Layout";
import Profile from "@/src/components/AccountProfile/Profile";
import { fetchAccountRequest } from '@/redux/actions/accountsAction';

type Props  = {
  hasToken : Boolean,
  account : any
}
const Index = (props : Props) => {
  const router = useRouter();
  const hasToken  = props.hasToken;

  useEffect(() => {
    if (!hasToken) {
        router.push('/auth/login')
    }
  }, [router, hasToken]);

  return (
    <MasterLayout>
      <AccountLayout contentClass="p-col-12 p-md-6 p-lg-6">
        <Profile/>
      </AccountLayout>
    </MasterLayout>
  );
}
export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookies = new Cookies(context.req?.headers?.cookie);
  const token = cookies.get('USER_TOKEN');
  if (token) {
    await context.store.dispatch(fetchAccountRequest({ token: token, isServer: true }));
    return { props: { hasToken : true } }
  }
  return {
    redirect: {
      permanent: false,
      destination: "/auth/login?countinue=/accounts"
    }
  }
});

export default Index;