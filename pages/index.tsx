/**
 * @packageDocumentation
 * @module HomePage
 */

import type { NextPage } from "next";

/**
 * Endpoint: /
 * @category Pages
 */
const HomePage: NextPage = () => {
  return (
    <div>
      <h1
        style={{
          width: "50%",
          margin: "20px auto",
          textAlign: "center",
          color: "#787878",
          fontFamily: "Arial",
        }}
      >
        Thank you for choosing the OneNote solution 🙋‍♂️
      </h1>
    </div>
  );
};

export default HomePage;
