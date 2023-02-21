import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='ko'>
      <Head />
      <title>CloZ</title>
      <script
        defer
        src='https://developers.kakao.com/sdk/js/kakao.min.js'
        onLoad={() => {
          window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
        }}
      ></script>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
