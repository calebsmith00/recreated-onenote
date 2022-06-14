/* MATERIAL UI IMPORT BEGIN */
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
/* MATERIAL UI IMPORT FINISH */

/* MSGRAPH IMPORT BEGIN */
import { Providers, MsalProvider } from "@microsoft/mgt";

Providers.globalProvider = new MsalProvider({
  clientId: "f2e346d7-bfb2-4cb6-ad65-dc69d6f2cbc8",
});
/* MSGRAPH IMPORT FINISH */

import type { AppProps } from "next/app";
import Navbar from "../components/navbar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
