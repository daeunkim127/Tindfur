import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';

import Auth from '../utils/auth';
// import {} from '../utils/API';
import { saveDogIds, getSavedDogIds } from '../utils/localStorage'; // needs modification, you want to render the dog options to the homepage upon login.
import { useMutation } from '@apollo/react-hooks';
import {SAVE_DOG} from '../utils/mutations';
import { GET_ME } from '../utils/queries';

const User = () => {
    return (
        <>
          <Jumbotron fluid className='text-light bg-dark'>
            <Container>
              <h1>Your Profile</h1>
       
            </Container>
          </Jumbotron>
    
          <Container>
            <h2>
              {searchedBooks.length
                ? `Viewing ${searchedBooks.length} results:`
                : 'Search for a book to begin'}
            </h2>
            <CardColumns>
              {searchedBooks.map((book) => {
                return (
                  <Card key={user.dogId} border='dark'>
                    {user.image ? (
                      <Card.Img src={user.image} alt={`Your wonderful, furry face: ${user.name}`} variant='top' />
                    ) : null}
                    <Card.Body>
                      <Card.Title>{user.title}</Card.Title>
                      <p className='large'>name: {user.name}</p>
                      <p className='large'>location: {user.location}</p>
                      <p className='large'>breed: {user.breed}</p>
                      <p className='large'>favorite treat: {user.favoriteTreat}</p>
                      <Card.Text>{user.about}</Card.Text>
                      {Auth.loggedIn() && (
                        <Button
                          disabled={savedBookIds?.some((savedBookId) => savedBookId === book.bookId)}
                          className='btn-block btn-info'
                          onClick={() => handleSaveBook(book.bookId)}>
                          {savedBookIds?.some((savedBookId) => savedBookId === book.bookId)
                            ? 'This book has already been saved!'
                            : 'Save this Book!'}
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