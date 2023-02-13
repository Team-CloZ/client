import { SessionProvider } from "next-auth/react";
import "reset-css";
import localFont from "@next/font/local";
import type { AppProps } from "next/app";
import { css, Global } from "@emotion/react";
import styled from "@emotion/styled";

const pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
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
    font-family: "PretendardVariable", sans-serif;
    box-sizing: border-box;
    outline: 1px solid dodgerblue;
  }
`;

const Main = styled.main`
  max-width: 480px;
  width: 100%;
  min-height: 100vh;
  margin: 0 auto;
`;
