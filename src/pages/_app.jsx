import { Fragment, useEffect } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import { useRouter } from 'next/router';

import '@/styles/scss/main.scss'
import Layout from '@/components/layout';
import * as ga from '../lib/google-analytics';
import { Analytics } from "@vercel/analytics/next";

function App({ Component, pageProps }) {
  // Setup for Google Analytics page views
  const router = useRouter();
  useEffect(() => {
    // This function passes the clicked URL page event to Google Analytics
    const handleRouteChange = (url) => {
      ga.pageview(url);
    }

    // Subscribe to change event when component "mounts"
    router.events.on('routeChangeComplete', handleRouteChange);
    // Unsubscribe from events when component "unmounts" or is destroyed
    // This is important to avoid memory leaks
    // and to ensure that the event listener is removed when the component is unmounted
    // This is a good practice to avoid memory leaks
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    }
  }, [router.events]);

  return (
    <Fragment>
      <Script 
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        strategy="afterInteractive"
      />
      <Script
        id="google-analytics-script"
        strategy="afterInteractive"
      >
        {`window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');`}
      </Script>
      <Analytics />
      <Head>
        <link rel="shortcut icon" href="/images/favicon.ico" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Fragment>
  )
}

export default App;