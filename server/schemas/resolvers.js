// Import the User model and authentication utilities
const { User, Game, Grid } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

// Define the resolvers for the GraphQL queries and mutations
const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("grids");
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    //Resolver for fetching all games
    games: async () => {
      return Game.find();
    },

    //Resolver for fetching a single game by ID
    game: async (parent, { gameId }) => {
      return Game.findOne({ _id: gameId });
    },
  },

  Mutation: {
    // Resolver for adding a new user
    addUser: async (parent, { username, email, password }) => {
      // Create a new user in the database
      const user = await User.create({ username, email, password });
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
      const correctPw = await user.validatePassword(password);

      // If the password is incorrect, throw an authentication error
      if (!correctPw) {
        throw AuthenticationError;
      }

      // Generate a JWT token for the logged-in user
      const token = signToken(user);

      return { token, user };
    },

    createGrid: async (parent, { ships }, context) => {
      if (context.user) {
        const newGrid = await Grid.create({ ships, userId: context.user._id });

        return newGrid;
      }
      throw new AuthenticationError("Not logged in");
    },

    // // Resolver for creating a new grid
    // createGrid: async (parent, {  }, context) => {

    // // finds user, inputs user and coordinates into grid model
    // if (context.user) {
    //   const user = await User.findById({context.userId})
    // }
    // },

    // // //Resolver for creating a new game
    // //   createGame: async (parent, { userId }) => {
    // // //

    // const game = Game.findOneAndUpdate({ player2: null})
    // },
  },
};

// Export the resolvers as a module

module.exports = resolvers;
