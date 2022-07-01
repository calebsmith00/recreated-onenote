import type { NextPage } from "next";

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

      <p
        style={{
          width: "40%",
          margin: "auto",
          lineHeight: "2",
          fontSize: "18px",
          fontFamily: "Arial",
        }}
      >
        Hello team, thanks for checking out my OneNote demo! Keep in mind, I ran
        into a <i>lot</i> of trouble with HTML parsing these past few days, but
        I do want to demonstrate its capabilities before we present to Tom next
        week. Please bear with me through any errors that may occur, I do have a
        backlog noted below of things that need to get done.
      </p>

      <h2
        style={{
          margin: "15px auto",
          width: "40%",
          color: "#787878",
          fontFamily: "Arial",
        }}
      >
        Backlog before the demo next week:
      </h2>

      <ul
        style={{
          margin: "15px auto",
          width: "40%",
          fontSize: "18px",
          lineHeight: "1.9",
          fontFamily: "Arial",
        }}
      >
        <li>
          The &quot;View Templates&quot; page does not properly sort the headers
          or columns, but it rather creates a row for every column. Fixable, I
          just ran out of time for things such as that.
        </li>

        <li>
          There are, unfortunately, a lot of unhandled errors (😢) that will be
          further investigated and tested through copiloting.
        </li>

        <li>
          Properly using the refresh token to request a new access token. This
          bypasses the unexpected errors every hour since the token expires in
          that time frame.
        </li>

        <li>
          Migrate the &quot;Add Training&quot; page into the &quot;View
          Templates&quot; page so that the table is editable and each template
          is instantly accessible.
        </li>

        <li>
          Store modified templates in local storage until the user decides to
          submit all their changed data to OneNote.
        </li>

        <li>Add loading indicators.</li>

        <li>Add more customizable columns for each template</li>
      </ul>
    </div>
  );
};

export default HomePage;
