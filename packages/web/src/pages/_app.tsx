import 'primereact/resources/primereact.min.css'
import 'primeflex/primeflex.css';
import '../../styles/globals.scss'
import 'react-lazy-load-image-component/src/effects/opacity.css';
import "nprogress/nprogress.css";
import "primereact/resources/themes/lara-light-blue/theme.css";
import { DefaultSeo } from 'next-seo';
import type { AppProps } from 'next/app'
import { wrapper } from "@/redux/store";
import dynamic from 'next/dynamic';
import SEO from '../../next-seo.config.js';
import PrimeReact from 'primereact/api';
import React from 'react';

PrimeReact.ripple = true;
const TopProgressBar = dynamic(
  () => {
    return import("../components/Shared/TopProgessBar");
  },
  { ssr: false },
);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <DefaultSeo {...SEO} />
      <TopProgressBar />
        <Component {...pageProps} />
    </React.Fragment>
  )
}

export default wrapper.withRedux(MyApp)
