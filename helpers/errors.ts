type ErrorResponseProps = {
  error: boolean;
  message: string;
  missingComponent?: string;
};

type ErrorProps = {
  [key: string]: ErrorResponseProps;
};

const errors: ErrorProps = {
  invalid_notebook: {
    error: true,
    message: "No notebook found!",
  },

  invalid_token: {
    error: true,
    message: "Invalid token sent to API.",
  },

  invalid_entry: {
    error: true,
    message: "Invalid entry sent to server.",
  },

  invalid_request: {
    error: true,
    message: "Invalid request sent to server.",
  },
};

export default errors;
