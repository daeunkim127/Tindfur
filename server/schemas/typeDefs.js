const { gql } = require('apollo-server-express');

const typeDefs = gql`

type User {
    _id: ID!
    name: String!
    email: String!
    city: String!
    state: String!
    breed: String!
    age: Int
    gender:String!
    about: String
    characteristics:String
    favoriteTreat: String
    image: String
    savedDogs: [Favorite]
      
}

type Favorite {
    id: ID!
    name:String
    email: String!
    city: String!
    state: String!
    breed: String!
    age: Int
    gender:String!
    about: String
    characteristics:String
    favoriteTreat: String
    image: String
}

type Query{
    me(_id: ID): User
    users:[User]
}


type Auth {
    token: ID!
    user: User
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(name: String!, email: String!, password: String!, city: String!, state: String!, breed:String!, age:String!, gender:String!, characteristics:String!, favoriteTreat:String!): Auth
    saveDog(id: ID!): User
    removeDog(id: ID!): User
}

`;



module.exports = typeDefs;