import Head from 'next/head'
import NProgress from 'nprogress'
import Router from 'next/router'

import { IntlProvider, addLocaleData } from 'react-intl'
import en from 'react-intl/locale-data/en'
import ku from 'react-intl/locale-data/ku'

import { Layout, LocaleProvider as AntLocaleProvider } from 'antd'
import enUS from 'antd/lib/locale-provider/en_US'
import { APP_NAME } from '../config'
import withLocale from './withLocale'
import translations from '../../translations'

addLocaleData([...en, ...ku])
const now = Date.now()

// TODO set antd locale once Kurdish PR merged
export default withLocale(({ locale: { currentLocale }, children }) =>
  <IntlProvider locale={currentLocale} initialNow={now} messages={translations[currentLocale]}>
    <AntLocaleProvider locale={enUS}>
      <div>
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="stylesheet" type="text/css"
            href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.0.2/antd.min.css" />
          <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />
          <title>{APP_NAME}</title>
        </Head>

        <Layout>
          {children}
        </Layout>
      </div>
    </AntLocaleProvider>
  </IntlProvider>
)

let timeoutId
NProgress.configure({ showSpinner: false })
const NProgressDone = () => {
  clearTimeout(timeoutId)
  NProgress.done()
}
Router.onRouteChangeStart = () => {
  timeoutId = setTimeout(NProgress.start, 100)
}
Router.onRouteChangeComplete = NProgressDone
Router.onRouteChangeError = NProgressDone
