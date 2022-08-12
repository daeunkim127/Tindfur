import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Button, Card, CardColumns } from 'react-bootstrap';
import homepageImg from '../images/homepage.jpg'
// import Auth from '../utils/auth';
// // import {} from '../utils/API';
// import { saveDogIds, getFavoriteUsers } from '../utils/localStorage'; // needs modification, you want to render the dog options to the homepage upon login.
import { useQuery } from '@apollo/react-hooks';
// import { SAVE_DOG, REMOVE_DOG } from '../utils/mutations';
import { GET_ME } from '../utils/queries';
const User = () => {
      // create state for holding returned dog favorites data
  const [allUsers, setAllUsers] = useState([]);

  const { loading, data} = useQuery(GET_ME);
  console.log(data)
  const userData = data?.me || [];
  console.log(userData)
  // const allUsers = [1, 2, 3, 4]
  // create state to hold saved dogId values
  // const [favoriteUsers, setFavoriteUsers] = useState(getFavoriteUsers());
  // define the save dog function from the mutation
  // const [saveDog] = useMutation(SAVE_DOG)
  // set up useEffect hook to save `favoriteUsers` list to localStorage on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  // useEffect(() => {
  //   return () => saveDogIds(favoriteUsers);
  // });
  // create method to search for books and set state on form submit
  // const handleFormSubmit= async (event) => { // handle Save Dog (or not save dog)
  //   event.preventDefault();
  //   if (!searchInput) { // change this to event handler for fave (heart) versus not (X)
  //     return false;
  //   }
  //   try {
      // const response = await searchGoogleBooks(searchInput); // swipe dogs (save favorite dog)
      // if (!response.ok) {
      //   throw new Error('something went wrong!');
      // }
      // const { items } = await response.json();
      //   const dogData = items.map((dog) => ({
      //        dogID: dog.id,
      //        name: dog.name,
      //        location: dog.location,
      //        breed: dog.breed,
      //        characteristics: [dog.charactersitics],
      //        favorite_treat: dog.treat,
      //        image: dog.image
      //    }));
      // setAllUsers(dogData);
      // setSearchInput('');
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };
  // const nextDog = async () => { // grab random dog from the array
  //   const nextDogArray = allUsers.filter(dogMatch);
  //   const currentDog = allUsers[Math.floor(Math.random()*(allUsers.length-1))];
  //   const dogMatch = () => {
        // currentDog == savedDogs[i];
    // }
    // for (let i=0; i<allUsers.length; i++){
    // if(currentDog == savedDogs[i]) {
    //     // filter this array so that the dog you are presented with is not a dog already in the favorites list.
    //     dogMatch == true;
    // } else {
    //     // present the dog at index i to the user
    //     nextDogArray[i];
    // }
//   }
// }
//   // create function to handle saving a favorite dog to our database
//   const handleSaveDog = async (dogId) => {
//     // find the dog in `allUsers` state by the matching id
//     const dogToSave = allUsers.find((dog) => dog.dogId === dogId); // should most likely change to an on click function
//     // get token
//     const token = Auth.loggedIn() ? Auth.getToken() : null;
//     if (!token) {
//       return false;
//     }
//     try {
//       await saveDog({
//         variables: {dog: dogToSave},
//         update: cache => {
//           const {me} = cache.readQuery({ query: GET_ME });
//           // console.log(me)
//           // console.log(me.savedDogs)
//           cache.writeQuery({ query: GET_ME , data: {me: { ...me, savedDogs: [...me.savedDogs, dogToSave] } } })
//         }
//       });
//       // if book successfully saves to user's account, save book id to state
//       setFavoriteUsers([...favoriteUsers, dogToSave.dogId]);
//     } catch (err) {
//       console.error(err);
//     }
//     nextDog();
//   };
//   // create function to handle deleting a rejected dog
//   const [deleteDog] = useMutation(REMOVE_DOG);
//   const handleDeleteDog = async (dogId) => {
//     const token = Auth.loggedIn() ? Auth.getToken() : null;
//     if (!token) {
//       return false;
//     }
//     try {
//       await deleteDog({
//         variables: {dogId: dogId},
//         update: cache => {
//           const data = cache.readQuery({ query: GET_ME });
//           const userDataCache = data.me;
//           const savedDogsCache = userDataCache.savedDogs;
//           const updatedDogCache = savedDogsCache.filter((dog) => dog.dogId !== dogId);
//           data.me.savedDogs = updatedDogCache;
//           cache.writeQuery({ query: GET_ME , data: {data: {...data.me.savedDogs}}})
//         }
//       });
//       // upon success, remove book's id from localStorage
//       // removeDogId(dogId);
//     } catch (err) {
//       console.error(err);
//     }
//   };
    return (
        <>
          <Jumbotron fluid className='text-light bg-dark'>
            <Container>
              <h1>Find Dog Love Here</h1>
            </Container>
          </Jumbotron>
          <Container>
          <h2>
              {allUsers.length
                ? `You are currently viewing 1 out of ${allUsers.length} results:`
                : 'Click the heart icon to save your Favorites!'}
            </h2>
             <CardColumns>
              <Card>
                <img src={homepageImg} alt="two dogs" width="1300" height="700"/>
                <Card.Body>
                      <Card.Title>Dog Title</Card.Title>
                      <p className='large'>name: Fido</p>
                      <p className='large'>location: Atlanta</p>
                      <p className='large'>breed: Chihuahua</p>
                      <p className='large'>favorite treat: cookies</p>
                </Card.Body>
              </Card>
              {/* {allUsers.map((dog) => {
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
                          disabled={favoriteUsers?.some((savedDogId) => savedDogId === dog.dogId)}
                          className='btn-block btn-info'
                          onClick={() => handleSaveDog(dog.dogId)}>
                          {favoriteUsers?.some((savedDogId) => savedDogId === dog.dogId)
                            ? 'This dog has already been saved!'
                            : 'Save this Dog as a favrite!'}
                        </Button>
                      ) && (
                        <Button // this will be the X icon
                        disabled={favoriteUsers?.some((savedDogId) => savedDogId === dog.dogId)}
                        className='btn-block btn-info'
                        onClick={() => nextDog()}>
                        {favoriteUsers?.some((savedDogId) => savedDogId === dog.dogId)
                          ? ''
                          : 'pass.'}
                      </Button>
                      )}
                    </Card.Body>
                  </Card>
                );
              })} */}
            </CardColumns>
          </Container>
        </>
      );
}
export default User;
