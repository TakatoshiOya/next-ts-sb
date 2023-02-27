import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import { Descriptions } from '@/constants/Descriptions'

interface CustomDocumentInterface {
  url: string
  title: string
  description: string
}

class CustomDocument extends Document implements CustomDocumentInterface {
  url = ''
  title = ''
  description = Descriptions.description

  render(): JSX.Element {
    return (
      <Html lang="ja-jp">
        <Head>
          <meta name="description" content={this.description} />
          <meta name="theme-color" content="" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content={this.title} />
          <meta property="og:url" content={this.url} />
          <meta property="og:description" content={this.description} />
          <meta property="og:site_name" content={this.title} />
          <meta property="og:image" content={`${this.url}/ogp.png`} />
          <meta name="format-detection" content="telephone=no" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={this.title} />
          <meta name="twitter:description" content={this.description} />
          <meta name="twitter:image" content={`${this.url}/ogp.png`} />
          <link rel="icon" href={'/favicon.ico'} />
          <link rel="apple-touch-icon" href={'/apple-touch-icon.png'} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }

  // getInitialProps メソッドの追加
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  static async getInitialProps(ctx: any): Promise<any> {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = (): any =>
        originalRenderPage({
          enhanceApp:
            (App: any) =>
            (props: any): any =>
              sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }
}

export default CustomDocument
