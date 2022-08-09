const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { default: mongoose } = require('mongoose');
const resolvers = {

    Query: {
        user: (root, args, context) => {
            const user = users.find((user) => {
                return user.id === parseInt(args.id, 10);
            });

            return user;
        },

        User: {
            favoriteUsers: (root, args, context) => {
              console.log("root", root);
              const user = root;
              const friendIds = user.friendIds;
              const friends = users.filter((user) => {
                return friendIds.includes(user.id);
              });
              return friends;
            }
          }
    },

    Mutation: {

        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
          
            return {token, user};
        },

        login: async (parent, {email, password}) => {
            const user = await User.findOne({email});

            if(!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if(!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);
            return {token, user};
    
        },

        saveFav: async (parent, {_id}, context) => {
            if (context.user) {
     
             const updatedUser =  await User.findByIdAndUpdate(
                { _id: context.user._id },
                { $addToSet: { favoriteUsers: {_id} } },
                { new: true }
              );
          
            return updatedUser;
            }
          
            throw new AuthenticationError('You need to be logged in!');
        },



        removeFav: async (parent, args, context) => {
            if(context.user) {
            const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { favoriteUsers: { _id: args._id } } },
                { new: true }
            );

            return updatedUser;
            }

            throw new AuthenticationError('You need to be logged in!');
        }
    }
};

module.exports = resolvers;