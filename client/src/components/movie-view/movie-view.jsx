import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './movie-view.scss';

export class MovieView extends React.Component {

  constructor() {
    super();

    this.state = {};

  }

  render() {
    const { movie, unsetMovie } = this.props;

    if (!movie) return null;

    return (
      <Container>
        <Row>
          <Col>
            <Card className="cardMovieView" style={{ width: '45rem' }}>
              <Card.Img variant="top" src={movie.ImagePath}/>
              <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Text>{movie.Description}</Card.Text>
                <Card.Text>Genre: {movie.Genre.Name}</Card.Text>
                <Card.Text>Director: {movie.Director.Name}</Card.Text>
                <Button className="button" onClick={unsetMovie} variant="primary">Back</Button>
              </Card.Body>
            </Card>
            </Col>
          </Row>
      </Container>
    );
  }
}

MovieView.propTypes = { //????
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired
    })
  }).isRequired,
  unsetMovie: PropTypes.func.isRequired
};