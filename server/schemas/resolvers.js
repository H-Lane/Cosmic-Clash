// Import the User model and authentication utilities
const { User } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");


// Define the resolvers for the GraphQL queries and mutations
const resolvers = {
  Query: {
    // Resolver for fetching all users
    users: async () => {
      return User.find();
    },

    // Resolver for fetching a single user by ID
    user: async (parent, { userId }) => {
      return User.findOne({ _id: userId });
    },
  },

  Mutation: {
    // Resolver for adding a new user
    addUser: async (parent, { name, email, password }) => {
      // Create a new user in the database
      const user = await User.create({ name, email, password });
      // Generate a JWT token for the new user
      const token = signToken(user);

      // Return the token and user object
      return { token, user };
    },
    // Resolver for logging in an existing user
    login: async (parent, { email, password }) => {
      // Find the user by email
      const user = await User.findOne({ email });

      // If the user is not found, throw an authentication error
      if (!user) {
        throw AuthenticationError;
      }

      // Check if the provided password is correct
      const correctPw = await user.isCorrectPassword(password);

      // If the password is incorrect, throw an authentication error
      if (!correctPw) {
        throw AuthenticationError;
      }

      // Generate a JWT token for the logged-in user
      const token = signToken(user);
      return { token, user };
    },

    // Resolver for removing a user by ID
    removeUser: async (parent, { userId }) => {
      return User.findOneAndDelete({ _id: userId });
    },
  },
};

// Export the resolvers as a module
module.exports = resolvers;
