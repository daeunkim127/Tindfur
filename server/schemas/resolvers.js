const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { default: mongoose } = require('mongoose');
const resolvers = {

    Query: {
        me: async(root, args, context) => {
            const user = await User.findOne({_id:context.user._id} )
            return user;
        },
        users: async() => {
        
            const userData = await User.find({})
          
            return userData
        }

    },

    User: {
        savedDogs: async (root, args, context) => {
            
            const user = root;
            const friendIds = user.savedDogs;
            const friends = await User.find({'_id':{$in:friendIds}})
           
            return friends;
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

        saveDog: async (parent, {_id}, context) => {
            
            if (context.user) {
     
             const updatedUser =  await User.findByIdAndUpdate(
                { _id: context.user._id },
                { $addToSet: { savedDogs: {_id} } },
                { new: true }
              );
          
            return updatedUser;
            }
          
            throw new AuthenticationError('You need to be logged in!');
        },



        removeDog: async (parent, args, context) => {
            if(context.user) {
                const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { savedDogs: { id: args.id } } },
                { new: true }
            );

            return updatedUser;
            }

            throw new AuthenticationError('You need to be logged in!');
        }
    }
};

module.exports = resolvers;