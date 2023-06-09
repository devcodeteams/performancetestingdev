import Page500 from 'src/500';
import { NextPage } from 'next';
import Head from 'next/head';

interface ErrorPageProps {
  statusCode?: number | null | undefined;
}

/**
 * Rendered for 500 errors on both server and client. Used only in Production mode.
 * @link https://nextjs.org/docs/advanced-features/custom-error-page#more-advanced-error-page-customizing
 */
const ErrorPage: NextPage<ErrorPageProps> = ({ statusCode }) => (
  <>
    <Head>
      <title>Error</title>
    </Head>
    <div style={{ padding: 10 }}>
      <p>
        {statusCode
          ? <Page500 statusCode={statusCode}/>
          : <Page500 statusCode={'A client-side error occurred.'}/>
          }
      </p>
    </div>
  </>
);

ErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;

  return { statusCode };
};

export default ErrorPage;
