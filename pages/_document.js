import Document, { Head, Main, NextScript } from 'next/document'
import flush from 'styled-jsx/server'

import styles from '../src/styles'
import { APP_NAME } from '../src/config'

export default class AppDocument extends Document {
  static getInitialProps({ renderPage }) {
    const { html, head, errorHtml, chunks } = renderPage()
    const styles = flush()
    return { html, head, errorHtml, chunks, styles }
  }

  render() {
    return (
      <html lang="en">
      <Head>
        <title>{APP_NAME}</title>
        <style>{styles}</style>
      </Head>
      <body>
      {this.props.customValue}
      <Main />
      <NextScript />
      </body>
      </html>
    )
  }
}
