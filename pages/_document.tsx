import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en-US">
        <Head>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/favicons/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicons/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicons/favicon-16x16.png"
          />
          <link href="/favicons/site.webmanifest" rel="manifest" />
          <link href="/favicons/favicon.ico" rel="shortcut icon" />
        </Head>
        <body className="max-w-5xl mx-auto">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
