import React, { useState, useEffect } from "react";
import {
  Jumbotron,
  Container,
  Col,
  Form,
  Button,
  Card,
  CardColumns,
} from "react-bootstrap";
import homepageImg from "../images/homepage.jpg";

const Homepage = () => {
  return (
    <>
      <Container>
        <h1>Everyone deserves love, even Dogs!</h1>
      </Container>
      <Jumbotron>
        <Container>
          <img
            src={homepageImg}
            alt="two dogs"
            width="1200"
            height="700"
            rounded
            style={{ alignSelf: "center" }}
          />
        </Container>
      </Jumbotron>
    </>
  );
};

export default Homepage;
