import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import Video from "../components/Layouts/Video/Video";
import NextNprogress from "nextjs-progressbar";
import { ApolloProvider } from "@apollo/client";
import { getApolloClient } from "../store/apollo-client";
import AlertComponent from "../components/Layouts/AlertComponent/AlertComponent";

function MyApp({ Component, pageProps }: AppProps) {
  const client = getApolloClient();

  return (
    <ApolloProvider client={client}>
      <NextNprogress
        color="#dc3545"
        startPosition={0.3}
        stopDelayMs={200}
        height={5}
        showOnShallow={true}
      />
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <AlertComponent>
        <Video src="/video.mp4" shadow={false}>
          <Component {...pageProps} />
        </Video>
      </AlertComponent>
    </ApolloProvider>
  );
}
export default MyApp;
