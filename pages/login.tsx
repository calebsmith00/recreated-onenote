import type { GetServerSideProps, NextPage } from "next";
import { pca } from "../auth/msal_provider";

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
  // const APP_ID = process.env.APP_ID;
  // const authorizeURLBase =
  //   "https://login.microsoftonline.com/organizations/oauth2/v2.0/authorize";
  // const authorizeURLEndpoint = `${authorizeURLBase}?client_id=${APP_ID}&response_type=code&redirect_uri=http://localhost:3000&response_mode=query&scope=user.read.all&code_challenge=IcYiovFVElv-uLtxMa2AfiMIL4CrzUZO-ELrUr_kpCo&code_challenge_method=S256`;

  // const testUrl =
  //   "https://login.microsoftonline.com/organizations/oauth2/v2.0/authorize?client_id=f2e346d7-bfb2-4cb6-ad65-dc69d6f2cbc8&response_type=code&redirect_uri=http://localhost:3000/api/auth/authorize&response_mode=query&scope=user.read.all%20offline_access&code_challenge=7BtZpqFs_Bq9OMamb4NKdjBjI8huQEyzXagBoldMRG0&code_challenge_method=S256";

  const { APP_ID, REDIRECT_URI, BASE_URL, CODE_CHALLENGE } = process.env;
  const scope = "user.read.all%20offline_access";
  const authorizeURL = `${BASE_URL}?client_id=${APP_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&response_mode=query&scope=${scope}&code_challenge=${CODE_CHALLENGE}&code_challenge_method=S256`;

  return {
    props: { authorizeURL },
  };
};

export default LoginPage;
