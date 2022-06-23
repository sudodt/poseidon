import React, {useEffect, useState} from "react"
import { wrapper } from "@/redux/store";
import MasterLayout from "@/src/components/MasterLayout/Master";
import AuthDataService from "@/services/Auth";
import Cookies from 'universal-cookie';
import {useRouter} from 'next/router'
import AccountLayout from "@/src/components/AccountLayout/Layout";
import Posts from "@/src/components/AccountPost/Post";
import { fetchAccountPostsRequest } from '@/redux/actions/accountsAction';
type Props  = {
  hasToken : Boolean,
  account : any
}
const Login = (props : Props) => {
  const router = useRouter();
  const account  = props.account;
  const hasToken  = props.hasToken;

  useEffect(() => {
    if (!account || !hasToken) {
        router.push('/auth/login')
    }
  }, [router, account, hasToken]);

  return (
    <MasterLayout>
      <AccountLayout contentClass="p-col-12 p-md-9 p-lg-9">
        <Posts/>
      </AccountLayout>
    </MasterLayout>
  );
}
export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookies = new Cookies(context.req?.headers?.cookie);
  const token = cookies.get('USER_TOKEN');
  if (token) {
      const account  = await AuthDataService.getAccount(token);
      await context.store.dispatch(fetchAccountPostsRequest({ 
        token: token, 
        isServer: true 
      }));
    return { props: { hasToken : true , account : account} }
  }
  return {
    redirect: {
      permanent: false,
      destination: "/auth/login?countinue=/accounts"
    }
  }
});

export default Login;