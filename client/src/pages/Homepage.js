import React from "react";
import {  Jumbotron, Container } from "react-bootstrap";
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
            style={{ alignSelf: "center" }}
          />
        </Container>
      </Jumbotron>
    </>
  );
};

export default Homepage;
