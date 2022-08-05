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
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_DOG = gql`
  mutation saveDog($dog: SavedDogInput!) {
    saveDog(dog: $dog) {
      username
      email
      dogCount
      savedDogs {
        location
        breed
        dogId
        image
        characteristics
        name
        favoriteTreat
      }
    }
  }
`;

export const REMOVE_DOG = gql`
  mutation removeDog($dogId: String!) {
    removeDog(dogId: $dogId) {
      username
      email
      dogCount
      savedDogs {
        location
        breed
        dogId
        image
        characteristics
        name
        favoriteTreat
      }
    }
  }
`;
