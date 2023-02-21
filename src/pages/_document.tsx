import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='ko'>
      <Head />
      <title>CloZ</title>
      <script
        defer
        src='https://developers.kakao.com/sdk/js/kakao.min.js'
      ></script>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
