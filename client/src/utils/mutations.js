import gql from "graphql-tag";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;


export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!, $city: String!, $state: String!, $breed: String!, $age: String!, $gender: String!, $about: String!, $characteristics: String!, $favorite_treat: String!) {
    addUser(username: $username, email: $email, password: $password, city: $city, state: $state, breed: $breed, age: $age, gender: $gender, about: $about, characteristics: $characteristics, favorite_treat: $favorite_treat) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_DOG = gql`
  mutation saveDog(_id: ID!) {
    saveDog(dog: $dog) {
      username
      email
      dogCount
      savedDogs {
        city
        state
        breed
        dogId
        age
        gender
        about
        image
        characteristics
        name
        favorite_treat
      }
    }
  }
`;

export const REMOVE_DOG = gql`
  mutation removeDog(_id:ID!) {
    removeDog(dogId: $dogId) {
      username
      email
      dogCount
      savedDogs {
        city
        state
        breed
        dogId
        age
        gender
        about
        image
        characteristics
        name
        favorite_treat
      }
    }
  }
`;
