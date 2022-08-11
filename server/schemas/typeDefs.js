const { gql } = require('apollo-server-express');

const typeDefs = gql`

type User {
    _id: ID!
    name: String!
    email: String!
    city: String!
    state: String!
    breed: String!
    characteristics:[String]
    favoriteTreat: String
    image: String
    savedDogs: [Favorite]
      
}

type Favorite {
    id: ID!
    name: String
}

type Query{
    me(id: ID): User
}


type Auth {
    token: ID!
    user: User
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveDog(_id: ID!): User
    removeDog(_id: ID!): User
}

`;



module.exports = typeDefs;