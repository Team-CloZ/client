import { SessionProvider } from 'next-auth/react';
import localFont from '@next/font/local';
import type { AppProps } from 'next/app';
import { css, Global } from '@emotion/react';
import styled from '@emotion/styled';

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Global styles={globalCss} />
      <Main className={pretendard.className}>
        <Component {...pageProps} />
      </Main>
    </SessionProvider>
  );
}

const globalCss = css`
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    /* outline: 1px solid dodgerblue; */
  }

  html,
  body {
    font-family: 'PretendardVariable', sans-serif;
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

    &:disabled {
      background: #c8c6c8;
      color: #9a9b9d;
    }
  }

  input {
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
  padding: 0 20px;
  min-height: 100vh;
  box-shadow: 0 0 20px rgb(0 0 0 / 5%);
`;
