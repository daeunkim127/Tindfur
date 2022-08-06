import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';

import Auth from '../utils/auth';
// import {} from '../utils/API';
import { saveDogIds, getSavedDogIds } from '../utils/localStorage'; // needs modification, you want to render the dog options to the homepage upon login.
import { useMutation } from '@apollo/react-hooks';
import {SAVE_DOG} from '../utils/mutations';
import { GET_ME } from '../utils/queries';

import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';

// import whole navbar instead 
import Navbar from '../components/Navbar'

const Homepage  = () => {
    // create state for holding returned dog favorites data
  // const [searchedDogs, setSearchedDogs] = useState([]);
  // create state for holding our search field data
  // const [searchInput, setSearchInput] = useState('');

  // create state to hold saved bookId values
  // const [savedDogIds, setSavedDogIds] = useState(getSavedDogIds());

  // define the save book function from the mutation
  // const [saveDog] = useMutation(SAVE_DOG)

  // set up useEffect hook to save `savedBookIds` list to localStorage on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  // useEffect(() => {
  //   return () => saveDogIds(savedDogIds);
  // });

  // create method to search for books and set state on form submit
  const handleFormSubmit= async (event) => { // handle Save Dog (or not save dog)
    event.preventDefault();

    if (!searchInput) { // change this to event handler for fave (heart) versus not (X)
      return false;
    }

    try {
      const response = await searchGoogleBooks(searchInput); // swipe dogs (save favorite dog)

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const { items } = await response.json();

      const bookData = items.map((book) => ({
        bookId: book.id,
        authors: book.volumeInfo.authors || ['No author to display'],
        title: book.volumeInfo.title,
        description: book.volumeInfo.description,
        link: book.volumeInfo.infoLink,
        image: book.volumeInfo.imageLinks?.thumbnail || '',
      }));


      //   const dogData = items.map((dog) => { the fields below will be adjusted for by name
      //        dogID: dog.id,
      //        name: dog.name,
      //        location: dog.location,
      //        breed: dog.breed,
      //        characteristics: [dog.charactersitics], 
      //        favorite_treat: dog.treat,
      //        image: dog.image
      //
      //    }));


      setSearchedBooks(dogData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  // create function to handle saving a favorite dog to our database
  const handleSaveDog = async (dogId) => {
    // find the book in `searchedBooks` state by the matching id
    const dogToSave = searchedBooks.find((dog) => dog.dogId === dogId); // should most likely change to an on click function

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await saveDog({
        variables: {dog: dogToSave},
        update: cache => {
          const {me} = cache.readQuery({ query: GET_ME });
          // console.log(me)
          // console.log(me.savedDogs)
          cache.writeQuery({ query: GET_ME , data: {me: { ...me, savedDogs: [...me.savedDogs, dogToSave] } } })
        }
      });

      // if book successfully saves to user's account, save book id to state
      setSavedDogIds([...savedDogIds, dogToSave.dogId]);
    } catch (err) {
      console.error(err);
    }
  };
    return (
        <>
        <Navbar />
          <Container>
            <h1>Everyone deserves love, even Dogs!</h1>
          </Container>
          <Jumbotron>
            <Container>
              <Image src="../../public/homepage.jpg" rounded />
            </Container>
          </Jumbotron>
            
        </>
    )

};

export default Homepage;