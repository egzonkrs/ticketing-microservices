import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetStaticProps,
  GetStaticPropsContext,
  NextPageContext,
} from 'next';
import Link from 'next/link';
import buildClient from '../api/build-client';
import '../styles/globals.css';
import Header from '../components/Header';

interface MyAppProps extends AppProps {
  host: string;
}

function MyApp({ Component, pageProps, host }: MyAppProps) {
  return (
    <ChakraProvider>
      <Header />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  // console.log(Object.keys(context), ' - _app.tsx');
  console.log('FETCHING DATA APP.TSX');
  // const client = buildClient({ context });
  // const { data } = await client.get('/api/users/currentuser');
  // console.log(data);

  return {
    props: {
      host: '_app component ---',
    },
  };
};

export default MyApp;
