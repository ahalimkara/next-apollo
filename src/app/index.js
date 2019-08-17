import React from 'react'
import Head from 'next/head'
import NProgress from 'nprogress'
import Router from 'next/router'

import { IntlProvider, addLocaleData } from 'react-intl'
import en from 'react-intl/locale-data/en'
import ku from 'react-intl/locale-data/ku'

import { Layout, ConfigProvider as AntConfigProvider } from 'antd'
import enUS from 'antd/lib/locale-provider/en_US'
import kuIQ from 'antd/lib/locale-provider/ku_IQ'
import { APP_NAME } from '../config'
import withLocale from './withLocale'
import translations from '../../translations'

import '../styles/index.css'

addLocaleData([...en, ...ku])
const now = Date.now()

const localeToAntLocale = currentLocale => currentLocale === 'ku' ? kuIQ : enUS

export default withLocale(({ locale: { currentLocale }, children }) =>
  <IntlProvider locale={currentLocale} initialNow={now} messages={translations[currentLocale]}>
    <AntConfigProvider locale={localeToAntLocale(currentLocale)}>
      <div>
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />
          <title>{APP_NAME}</title>
        </Head>

        <Layout>
          {children}
        </Layout>
      </div>
    </AntConfigProvider>
  </IntlProvider>
)

let timeoutId
NProgress.configure({ showSpinner: false })
const NProgressDone = () => {
  clearTimeout(timeoutId)
  NProgress.done()
}
const handleRouteChange = () => {
  timeoutId = setTimeout(NProgress.start, 100)
}
Router.events.on('routeChangeStart', handleRouteChange)
Router.events.on('routeChangeComplete', NProgressDone)
Router.events.on('routeChangeError', NProgressDone)
