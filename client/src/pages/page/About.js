import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import cover from "../../assets/cover.png";

const About = () => {
  return (
    <>
      <Card className="mt-2">
        <Card.Img variant="top" src={cover} />
        <Card.Body>
          <Card.Text className="text-center text-black h4" >
            Selling only the best things online The e-commerce platform that
            cares
          </Card.Text>
        </Card.Body>
      </Card>
      <Card className="mt-2">
        <ListGroup variant="flush">
          <ListGroup.Item>About Us</ListGroup.Item>
          <Card.Text>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.{" "}
          </Card.Text>
        </ListGroup>
      </Card>
    </>
  );
};

export default About;
