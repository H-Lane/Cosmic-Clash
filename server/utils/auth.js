//Used to create custom GraphQL errors
const { GraphQLError } = require('graphql');
//Used for creating and verifying tokens
const jwt = require('jsonwebtoken');


// Retrieve the secret and expiration values from environment variables
const secret = process.env.JWT_SECRET;
const expiration = process.env.JWT_EXPIRATION;

module.exports = {
  // Define a custom GraphQL error for authentication failures
  AuthenticationError: new GraphQLError("Could not authenticate user.", {
    extensions: {
      code: "UNAUTHENTICATED",
    },
  }),
  // Function to sign a JWT token with the user's data
  signToken: function ({ email, name, _id }) {
    const payload = { email, name, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
