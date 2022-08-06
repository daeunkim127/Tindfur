const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { default: mongoose } = require('mongoose');
const resolvers = {

    Query: {
       
        me: async (parent, args, context) => {
            if(context.user) {

                const userData = await User.findOne({_id:context.user._id})
                .select('-__v -password')
                // .populate('favoriteUsers')
                
                const ids = userData.favoriteUsers.map((item)=>{return mongoose.Types.ObjectId(item)})
                
                const favoriteData = await User.find({'_id':{$in:ids}});
                console.log(favoriteData)
                return {
                    ...userData,
                    favorites:favoriteData
                }
            }

            throw new AuthenticationError('Not logged in')

        },
        
        userWithFavorites: async(parent,args,context) =>{
            if(context.user) {

                const userData = await User.findOne({_id:context.user._id})
                .select('-__v -password')
                // .populate('favoriteUsers')
                
                const ids = userData.favoriteUsers.map((item)=>{return mongoose.Types.ObjectId(item)})
                console.log(ids);
                const favoriteData = await User.find({'_id':{$in:ids}});
               
                console.log('favoriteData',favoriteData)
                return {
                    user:userData,
                    favorites:favoriteData
                }
            }

            throw new AuthenticationError('Not logged in')

            
        }
    },

    // FavoriteUsers:{
    //     users: async(parent) =>{
    //         console.log(parent)
    //         const ids = parent.map((item)=>{return mongoose.Types.ObjectId(item)})
    //         const userData = await User.find({'_id':{$in:ids}});

    //         return userData;
    //     }
    // },

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