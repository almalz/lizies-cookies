import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="fr-FR" className="scroll-smooth">
      <Head>
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
