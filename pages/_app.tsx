/* MATERIAL UI IMPORT BEGIN */
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
/* MATERIAL UI IMPORT FINISH */

import type { AppProps } from "next/app";
import Navbar from "../components/navbar";

/**
 * @hidden
 */
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
