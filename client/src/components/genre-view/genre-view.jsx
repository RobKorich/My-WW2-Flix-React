import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';

import './genre-view.scss';


export class GenreView extends React.Component {

  constructor() {
    super();

    this.state = {};

  }

  render () {
    const { genre, movie } = this.props;
  
    return (
      <div className='genre-view'>
          <Container>
            <Card style={{ width: '25 rem'}}>
              <Card.Body>
                <Card.Title>{genre.Name}</Card.Title>
                <Card.Text>Description: {genre.Description}</Card.Text>
                <Link to={`/`}>
                  <Button className='button' variant="primary">Back</Button>
                </Link>
              </Card.Body>
            </Card>
          </Container>
      </div>
    );
  }
}
