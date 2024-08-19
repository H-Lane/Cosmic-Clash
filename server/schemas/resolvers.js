// Import the User model and authentication utilities
const { User, Game, Grid } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");
const { Types } = require("mongoose");

// Define the resolvers for the GraphQL queries and mutations
const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("grids");
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    username: async (parent, { userId }, context) => {
      return User.findOne({ _id: new Types.ObjectId(userId) })
    },

    grids: async (parent, args, context) => {
      console.log(context.user);
      return Grid.find({ userId: context.user._id });
    },


    //Resolver for fetching a single game by ID
    game: async (parent, { gameId }) => {
      return Game.findOne({ _id: new Types.ObjectId(gameId) });
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
      console.log(email, password);
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
        console.log(ships);
        const newGrid = await Grid.create({ ships, userId: context.user._id });

        return newGrid;
      }
      throw new AuthenticationError("Not logged in");
    },
    createGame: async (parent, { gridId }, context) => {
      if (context.user) {
        const newGame = await Game.create({
          playerOne: context.user._id,
          turn: context.user._id,
          playerOneGrid: new Types.ObjectId(gridId),
        });

        return newGame;
      }
      throw new AuthenticationError("Not logged in");
    },
    // should turn be set to playerTwo once they join the game?
    joinGame: async (parent, { gridId }, context) => {
      if (context.user) {
        try {
          const joinGame = await Game.findOneAndUpdate(
            { playerTwo: null },
            {
              playerTwo: context.user._id,
              playerTwoGrid: new Types.ObjectId(gridId),
            },
            { new: true }
          );

          return joinGame;
        } catch (error) {
          console.error(error);
          throw new Error("Failed to join the game.");
        }
      }
      throw new AuthenticationError("Not logged in");
    },

    createAttack: async (parent, { gameId, position }, context) => {
      const newGameId = new Types.ObjectId(gameId)
      if (context.user) {
        const game = await Game.findById(newGameId).populate("playerOneGrid playerTwoGrid");

        if (!game) {
          throw new Error("Game not found");
        }
        console.log("gamefound");

        // Determine which player's turn it is - boolean that equals true for playerOne and false if its playerTwo's turn
        const isPlayerOneTurn = game.turn === game.playerOne ? true : false;

        // If playerOne is true, attack playerTwo grid; else, it's playerTwo's turn and attack playerOne grid
        const playerGrid = isPlayerOneTurn
          ? game.playerTwoGrid
          : game.playerOneGrid;

        // Stores the attacks in the correct array
        const attackArray = isPlayerOneTurn
          ? game.firstAttacks
          : game.secondAttacks;

        //Check attackarray against position array for duplicate attacks
        if (attackArray.includes(position)) {
          throw new Error("Position already attacked");
        }

        // Check if the attack hits a ship
        const hit = playerGrid.ships.some((ship) =>
          ship.position.includes(position)
        );

        // Add the attack to the array
        if (hit) {
          attackArray.push(position);
        }

        // Update the turn
        game.turn = isPlayerOneTurn ? game.playerTwo : game.playerOne;

        // Save the game state after updating the attack array
        await game.save();

        // Check if a ship is sunk
        const shipSunk = playerGrid.ships.some((ship) =>
          ship.position.every((pos) => attackArray.includes(pos))
        );

        // Check if all ships are sunk
        const allShipsSunk = playerGrid.ships.every((ship) =>
          ship.position.every((pos) => attackArray.includes(pos))
        );

        if (allShipsSunk) {
          game.winner = context.user._id
        };

        return {
          success: true,
          hit,
          shipSunk,
          allShipsSunk,
        };
      }
      throw new AuthenticationError("Not logged in");
    },

  },
};

// Export the resolvers as a module

module.exports = resolvers;
