import type { GetServerSideProps, NextPage } from "next";

type LoginPageProps = {
  authorizeURL: string;
};

const LoginPage: NextPage<LoginPageProps> = ({ authorizeURL }) => {
  return (
    <>
      <button onClick={() => window.location.replace(authorizeURL)}>
        Login
      </button>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { APP_ID, REDIRECT_URI, GRAPH_AUTH_URL, CODE_CHALLENGE } = process.env;
  const scope = "user.read.all%20offline_access";
  const authorizeURL = `${GRAPH_AUTH_URL}?client_id=${APP_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&response_mode=query&scope=${scope}&code_challenge=${CODE_CHALLENGE}&code_challenge_method=S256`;

  return {
    props: { authorizeURL },
  };
};

export default LoginPage;
