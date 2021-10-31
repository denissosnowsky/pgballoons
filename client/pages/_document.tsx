import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from "next/document";
import { getDataFromTree } from "@apollo/client/react/ssr";
import { getApolloClient } from "../store/apollo-client";

type DocumentProps = DocumentInitialProps & {
  apolloState: object;
};

class MyDocument extends Document<DocumentProps> {
  constructor(props: any) {
    super(props);

    const { __NEXT_DATA__, apolloState } = props;
    __NEXT_DATA__.apolloState = apolloState;
  }

  static async getInitialProps(ctx: DocumentContext & { appProps: any }) {
    const apolloClient = getApolloClient(true);

    await getDataFromTree(<ctx.AppTree {...ctx.appProps} />);

    const initialProps = await Document.getInitialProps(ctx);

    const apolloState = apolloClient.extract();

    return { ...initialProps, apolloState };
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta charSet="utf-8" />
          <meta
            name="keywords"
            content="balloons, helium balloons, balloons buy, balloons online"
          />
          <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
