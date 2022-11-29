import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="fr-FR">
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#2E1550" />
        <meta name="msapplication-TileColor" content="#2E1550" />
        <meta name="theme-color" content="#2E1550"></meta>

        {/* <link
          rel="preload"
          href="/fonts/chloe/Chloe-Regular.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/gistesy/Gistesy.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        /> */}
        <link
          rel="preload"
          href="/fonts/parmigiano/ParmigianoTextPro-Bld.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
        {/* <link
          rel="preload"
          href="/fonts/parmigiano/ParmigianoTextPro-BldIta.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        /> */}
        {/* <link
          rel="preload"
          href="/fonts/parmigiano/ParmigianoTextPro-Blk.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/parmigiano/ParmigianoTextPro-BlkIta.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        /> */}
        {/* <link
          rel="preload"
          href="/fonts/parmigiano/ParmigianoTextPro-Lt.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        /> */}
        {/* <link
          rel="preload"
          href="/fonts/parmigiano/ParmigianoTextPro-LtIta.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        /> */}
        {/* <link
          rel="preload"
          href="/fonts/parmigiano/ParmigianoTextPro-Med.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        /> */}
        {/* <link
          rel="preload"
          href="/fonts/parmigiano/ParmigianoTextPro-MedIta.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        /> */}
        <link
          rel="preload"
          href="/fonts/parmigiano/ParmigianoTextPro-Reg.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
        {/* <link
          rel="preload"
          href="/fonts/parmigiano/ParmigianoTextPro-RegIta.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        /> */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
