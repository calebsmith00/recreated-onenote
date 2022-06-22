import type { NextPage } from "next";
import { GetServerSideProps } from "next";
const authorizeURL =
  "https://login.microsoftonline.com/organizations/oauth2/v2.0/authorize";

const LoginPage: NextPage = () => {
  return (
    <>
      <p>Login</p>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const APP_ID = process.env.ALT_APP_ID;
  const response = await fetch(
    `${authorizeURL}?client_id=${APP_ID}&response_type=code&redirect_uri=http://localhost:3000&response_mode=form_post&scope=user.read.all`
  );
  console.log(response.body);

  return {
    props: {},
  };
};

export default LoginPage;
