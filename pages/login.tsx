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
  const APP_ID = process.env.ALT_APP_ID;
  const authorizeURLBase =
    "https://login.microsoftonline.com/organizations/oauth2/v2.0/authorize";
  const authorizeURLEndpoint = `${authorizeURLBase}?client_id=${APP_ID}&response_type=code&redirect_uri=http://localhost:3000&response_mode=query&scope=user.read.all`;

  return {
    props: { authorizeURL: authorizeURLEndpoint },
  };
};

export default LoginPage;
