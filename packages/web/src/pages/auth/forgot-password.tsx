import React, { useEffect, useState } from "react"
import { wrapper } from "@/redux/store";
import MasterLayout from "@/src/components/MasterLayout/Master";
import ForgotPassword from "@/components/Auth/ForgotPassword";
import Cookies from 'universal-cookie';
import { useRouter } from 'next/router'

type Props = {
  hasToken: Boolean,
  account: any
}

const Verification = (props: Props) => {
  const router = useRouter();
  const account = props.account;
  const hasToken = props.hasToken;

  useEffect(() => {
    if (account || hasToken) {
      router.push('/accounts')
    }
  }, [router, account, hasToken]);

  return (
    <MasterLayout>
      <ForgotPassword />
    </MasterLayout>
  );
}
export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookies = new Cookies(context.req?.headers?.cookie);
  const token = cookies.get('USER_TOKEN');
  const { __NEXT_INIT_QUERY } = context.req as any;
  const { email, uuid } = __NEXT_INIT_QUERY || {};
  if (token) {
    return {
      redirect: {
        permanent: false,
        destination: "/accounts"
      }
    }
  }
  return { props: {} }
});

export default Verification;