const dev = {
  apiGateway: {
    REGION: "us-east-1",
    URL: "wss://kessgs6puj.execute-api.us-east-1.amazonaws.com/prod/"
  }
};

const prod = {
  apiGateway: {
    REGION: "us-east-1",
    URL: "wss://kessgs6puj.execute-api.us-east-1.amazonaws.com/prod/"
  }
};

// Default to dev if not set
const config = process.env.REACT_APP_STAGE === "prod" ? prod : dev;

export default {
  // Add common config values here
  ...config
};
