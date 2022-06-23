import React, {useEffect, useState} from "react"
import { wrapper } from "@/redux/store";
import MasterLayout from "@/src/components/MasterLayout/Master";
import AuthLayout from "@/components/Auth/AuthLayout";
import Cookies from 'universal-cookie';

type Props  = {
  hasToken : Boolean,
  account : any
}
const Login = (props : Props) => {
  return (
    <MasterLayout>
      <AuthLayout active={1}/>
    </MasterLayout>
  );
}
export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookies = new Cookies(context.req?.headers?.cookie);
  const token = cookies.get('USER_TOKEN');
  if (token) {
    return {
      redirect: {
        permanent: false,
        destination: "/accounts"
      }
    }
  }
  // const account  = await AuthDataService.getAccount(token);
  return { props: {} }
});

export default Login;