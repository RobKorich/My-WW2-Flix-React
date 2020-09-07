import React from 'react';
import axios from 'axios';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';

export class MainView extends React.Component {

  constructor() {
    // Call the superclass constructor
    // so React can initialize it
    super();

    // Initialize the state to an empty object so we can destructure it later
    this.state = {
      movies: null,
      selectedMovie: null,
      user: null
    };
  }

  // One of the "hooks" available in a React Component
  componentDidMount() {
    axios.get('https://myww2flixdb.herokuapp.com/movies')
      .then(response => {
        // Assign the result to the state
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  //Click function for clicking on MovieCard in MainView to show MovieView
  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  //Click function for back button on MovieView (sets state back to MainView state)
  onBackClick = () => {
    this.setState({
      selectedMovie: null
    });
  }

  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  render() {
    // If the state isn't initialized, this will throw on runtime
    // before the data is initially loaded
    const { movies, selectedMovie, user } = this.state;

    //if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    // Before the movies have been loaded
    if (!movies) return <div className="main-view">Loading Movies...</div>;

    return (
      <div className="main-view">
        {selectedMovie
            ? <MovieView movie={selectedMovie} unsetMovie={this.onBackClick}/> //movie and unsetMovie are props to MovieView
            : this.state.movies.map(movie => (
              <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)}/> //movie and onClick are props to MovieCard
            ))
        }
      </div>
        
      
      
    );
  }
}


