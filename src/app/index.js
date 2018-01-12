import Head from 'next/head'
import NProgress from 'nprogress'
import Router from 'next/router'

import { Layout, LocaleProvider } from 'antd'
import enUS from 'antd/lib/locale-provider/en_US'
import { APP_NAME } from '../config'

export default ({ children }) =>
  <LocaleProvider locale={enUS}>
    <div>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.0.2/antd.min.css"
        />
        <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />
        <title>{APP_NAME}</title>
      </Head>

      <Layout>
        {children}
      </Layout>
    </div>
  </LocaleProvider>


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
