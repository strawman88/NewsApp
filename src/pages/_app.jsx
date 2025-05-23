import { Fragment } from 'react';
import Head from 'next/head';
import Script from 'next/script';

import '@/styles/scss/main.scss'
import Layout from '@/components/layout';

function App({ Component, pageProps }) {
  return (
    <Fragment>
      <Script 
        src={`https://www.googletagmanager.com/gtag/js?id=G-2GBM02K875`}
        strategy="afterInteractive"
      />
      <Script
        id="google-analytics-script"
        strategy="afterInteractive"
      >
        {`window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-2GBM02K875');`}
      </Script>
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