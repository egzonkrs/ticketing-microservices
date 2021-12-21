import buildClient from '../api/build-client';

const Home = (currentUser) => {
  // console.log(currentUser);
  return (
    <div>
      {/* {JSON.stringify(currentUser)} */}
      {currentUser != null && currentUser.currentUser ? (
        <>
          <h1>You are signed in</h1>
          <span>{JSON.stringify(currentUser)}</span>
        </>
      ) : (
        <h1>you aree not signed in</h1>
      )}
    </div>
  );
};

Home.getInitialProps = async (context, client, currentUser) => {
  // const client = buildClient(context);
  // const { data } = await client.get('/api/users/currentuser');
  return {};
};

export default Home;
