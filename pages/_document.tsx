import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="fr-FR">
      <Head>
        <link
          rel="preload"
          href="/fonts/chloe/Chloe-Regular.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/gistesy/Gistesy.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/parmigiano/ParmigianoTextPro-Bld.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        {/* <link
          rel="preload"
          href="/fonts/parmigiano/ParmigianoTextPro-BldIta.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        /> */}
        {/* <link
          rel="preload"
          href="/fonts/parmigiano/ParmigianoTextPro-Blk.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/parmigiano/ParmigianoTextPro-BlkIta.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        /> */}
        <link
          rel="preload"
          href="/fonts/parmigiano/ParmigianoTextPro-Lt.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        {/* <link
          rel="preload"
          href="/fonts/parmigiano/ParmigianoTextPro-LtIta.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        /> */}
        <link
          rel="preload"
          href="/fonts/parmigiano/ParmigianoTextPro-Med.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        {/* <link
          rel="preload"
          href="/fonts/parmigiano/ParmigianoTextPro-MedIta.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        /> */}
        <link
          rel="preload"
          href="/fonts/parmigiano/ParmigianoTextPro-Reg.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        {/* <link
          rel="preload"
          href="/fonts/parmigiano/ParmigianoTextPro-RegIta.ttf"
          as="font"
          type="font/ttf"
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
