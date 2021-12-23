import { ChakraProvider } from '@chakra-ui/react';
import buildClient from '../api/build-client';
import Header from '../components/Header';
import PageContainer from '../components/PageContainer';
// import '../styles/globals.css';

const MyApp = ({ Component, pageProps, currentUser }) => {
  return (
    <ChakraProvider>
      <Header currentUser={currentUser} />
      <PageContainer>
        <Component {...pageProps} currentUser={currentUser} />
      </PageContainer>
    </ChakraProvider>
  );
};

MyApp.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx);
  const { data } = await client.get('/api/users/currentuser');
  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(
      appContext.ctx,
      client,
      data
    );
  }
  // console.log('app getinitial props');
  return {
    pageProps,
    ...data,
  };
  // return {};
};

export default MyApp;
