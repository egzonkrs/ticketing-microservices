import {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextApiRequest,
  NextPage,
  NextPageContext,
} from 'next';
import axios from 'axios';
import buildClient from '../api/build-client';
import { CurrentUser } from '../models/user';
// import styles from '../styles/Home.module.css';

interface Props {
  currentUser: CurrentUser;
}

const Home: NextPage<Props> = ({ currentUser }) => {
  return (
    <div>
      <p>asdasd</p>
      {currentUser ? (
        <>
          <h1>You are signed in</h1>
          <span>{JSON.stringify(currentUser)}</span>
        </>
      ) : (
        <h1>you are not signed in</h1>
      )}
    </div>
  );
};

// export interface Headers {
//   [key: string]: any;
// }

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  // console.log(Object.keys(context), ' - _app.tsx');
  console.log('FETCHING DATA - LANDING PAGE');
  // const client = buildClient({ context });
  // const { data } = await client.get('/api/users/currentuser');
  // console.log(data);

  return {
    props: {
      host: 'landing page',
    },
  };
};

// Home.getInitialProps = async (context: NextPageContext) => {
//   console.log(Object.keys(context));
//   const client = buildClient({ context });
//   const { data } = await client.get('/api/users/currentuser');
//   console.log(data);
//   return data;
// };

export default Home;
