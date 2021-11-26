import { NextApiRequest, NextPage, NextPageContext } from 'next';
import axios from 'axios';
import buildClient from '../api/build-client';
// import styles from '../styles/Home.module.css';

interface Props {
  color: string;
}

const Home: NextPage<Props> = ({ color }) => {
  return (
    <div>
      <span>{color}</span>
      <p>asdasd</p>
    </div>
  );
};

Home.getInitialProps = async (context: NextPageContext) => {
  // const { req } = context;
  const client = buildClient({ context });
  const data = await client.get('/api/users/currentuser');
  console.log(data);
  return { color: 'red' };
};

export default Home;
