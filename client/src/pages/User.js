import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';

import Auth from '../utils/auth';
// import {} from '../utils/API';
import { saveDogIds, getSavedDogIds } from '../utils/localStorage'; // needs modification, you want to render the dog options to the homepage upon login.
import { useMutation } from '@apollo/react-hooks';
import { SAVE_DOG, REMOVE_DOG } from '../utils/mutations';
import { GET_ME } from '../utils/queries';

const User = () => {
      // create state for holding returned dog favorites data
  const [searchedDogs, setSearchedDogs] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');

  // create state to hold saved dogId values
  const [savedDogIds, setSavedDogIds] = useState(getSavedDogIds());

  // define the save dog function from the mutation
  const [saveDog] = useMutation(SAVE_DOG)

  // set up useEffect hook to save `savedDogIds` list to localStorage on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  useEffect(() => {
    return () => saveDogIds(savedDogIds);
  });

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

        const dogData = items.map((dog) => ({
             dogID: dog.id,
             name: dog.name,
             location: dog.location,
             breed: dog.breed,
             characteristics: [dog.charactersitics], 
             favorite_treat: dog.treat,
             image: dog.image
      
         }));


      setSearchedDogs(dogData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  const nextDog = async () => { // grab random dog from the array
    const nextDogArray = searchedDogs.filter(dogMatch);
    const currentDog = searchedDogs[Math.floor(Math.random()*(searchedDogs.length-1))];

    const dogMatch = () => {
        currentDog == savedDogs[i];
    }
    for (let i=0; i<searchedDogs.length; i++){
    if(currentDog == savedDogs[i]) {
        // filter this array so that the dog you are presented with is not a dog already in the favorites list.
        dogMatch == true;
    } else {
        // present the dog at index i to the user
        nextDogArray[i];
    }
  }
}

  // create function to handle saving a favorite dog to our database
  const handleSaveDog = async (dogId) => {
    // find the dog in `searchedDogs` state by the matching id
    const dogToSave = searchedDogs.find((dog) => dog.dogId === dogId); // should most likely change to an on click function

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

    nextDog();
  };

  // create function to handle deleting a rejected dog
  const handleDeleteDog = async (dogId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    const [deleteDog] = useMutation(REMOVE_DOG);

    if (!token) {
      return false;
    }

    try {
      await deleteDog({
        variables: {dogId: dogId},
        update: cache => {
          const data = cache.readQuery({ query: GET_ME });
          const userDataCache = data.me;
          const savedDogsCache = userDataCache.savedDogs;
          const updatedDogCache = savedDogsCache.filter((dog) => dog.dogId !== dogId);
          data.me.savedDogs = updatedDogCache;
          cache.writeQuery({ query: GET_ME , data: {data: {...data.me.savedDogs}}})
        }
      });
      // upon success, remove book's id from localStorage
      removeDogId(dogId);
    } catch (err) {
      console.error(err);
    }
  };
    return (
        <>
          <Jumbotron fluid className='text-light bg-dark'>
            <Container>
              <h1>Find Dog Love Here</h1>
       
            </Container>
          </Jumbotron>
    
          <Container>
            <h2>
              {searchedDogs.length
                ? `You are currently viewing 1 out of ${searchedDogs.length} results:`
                : 'Click the heart icon to save your Favorites!'}
            </h2>
            <CardColumns>
              {searchedDogs.map((dog) => {
                return (
                  <Card key={dog.dogId} border='dark'>
                    {dog.image ? (
                      <Card.Img src={dog.image} alt={`Your wonderful, furry face: ${dog.name}`} variant='top' />
                    ) : null}
                    <Card.Body>
                      <Card.Title>{dog.title}</Card.Title>
                      <p className='large'>name: {dog.name}</p>
                      <p className='large'>location: {dog.location}</p>
                      <p className='large'>breed: {dog.breed}</p>
                      <p className='large'>favorite treat: {dog.favoriteTreat}</p>
                      <Card.Text>{dog.description}</Card.Text>
                      {Auth.loggedIn() && (
                        <Button // this will be the heart icon
                          disabled={savedDogIds?.some((savedDogId) => savedDogId === dog.dogId)}
                          className='btn-block btn-info'
                          onClick={() => handleSaveDog(dog.dogId)}>
                          {savedDogIds?.some((savedDogId) => savedDogId === dog.dogId)
                            ? 'This dog has already been saved!'
                            : 'Save this Dog as a favrite!'}
                        </Button>
                        
                      ) && (
                        <Button // this will be the X icon
                        disabled={savedDogIds?.some((savedDogId) => savedDogId === dog.dogId)}
                        className='btn-block btn-info'
                        onClick={() => nextDog()}>
                        {savedDogIds?.some((savedDogId) => savedDogId === dog.dogId)
                          ? ''
                          : 'pass.'}
                      </Button>
                      )}
                    </Card.Body>
                  </Card>
                );
              })}
            </CardColumns>
          </Container>
        </>
      );
}

export default User;
