const dev = {
  apiGateway: {
    REGION: "us-east-1",
    URL: "wss://chat-api.wholenanyards.com/dev/"
  }
};

const prod = {
  apiGateway: {
    REGION: "us-east-1",
    URL: "wss://chat-api.wholenanyards.com/prod/"
  }
};

// Default to dev if not set
const config = process.env.REACT_APP_STAGE === "prod" ? prod : dev;

export default {
  // Add common config values here
  ...config
};
