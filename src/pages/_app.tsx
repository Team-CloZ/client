import { SessionProvider } from 'next-auth/react';
import localFont from '@next/font/local';
import type { AppProps } from 'next/app';
import { css, Global } from '@emotion/react';
import styled from '@emotion/styled';
import Layout from './layout';
import Script from 'next/script';
import { useCallback } from 'react';

declare global {
  interface Window {
    Kakao: any;
  }
}

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const kakaoInit = useCallback(() => {
    window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
  }, []);

  return (
    <SessionProvider session={session}>
      <Global styles={globalCss} />
      <Layout>
        <Main className={pretendard.className}>
          <Component {...pageProps} />
        </Main>
        <Script
          src='https://developers.kakao.com/sdk/js/kakao.min.js'
          onLoad={kakaoInit}
        ></Script>
      </Layout>
    </SessionProvider>
  );
}

const globalCss = css`
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    font-family: 'PretendardVariable', sans-serif;
    /* outline: 1px solid dodgerblue; */
  }

  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;

  html,
  body {
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #__next {
    display: contents;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    cursor: pointer;
    border: none;
    background: none;

    &:disabled {
      background: #c8c6c8;
      color: #9a9b9d;
    }
  }

  input,
  textarea {
    &:focus {
      outline-color: #37258e;
    }

    ::placeholder {
      color: #9a9b9d;
    }
  }
`;

const Main = styled.main`
  max-width: 480px;
  margin: 0 auto;
  box-shadow: 0 0 20px rgb(0 0 0 / 5%);
  overflow-x: hidden;
`;
