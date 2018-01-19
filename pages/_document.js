import Document, { Head, Main, NextScript } from 'next/document'
import flush from 'styled-jsx/server'

import css from '../src/styles'
import { currentLocale } from '../src/app/withLocale'

export default class AppDocument extends Document {
  static getInitialProps({ renderPage, asPath }) {
    const { html, head, errorHtml, chunks } = renderPage()
    const styles = flush()
    const locale = currentLocale(asPath)

    return { html, head, errorHtml, chunks, styles, locale }
  }

  render() {
    const intlPolyfill = `https://cdn.polyfill.io/v2/polyfill.min.js?features=Intl.~locale.${this.props.locale}`

    return (
      <html lang={this.props.locale}>
        <Head>
          <style>{css}</style>
        </Head>
        <body>
          <Main />
          <script src={intlPolyfill} />
          <NextScript />
        </body>
      </html>
    )
  }
}
