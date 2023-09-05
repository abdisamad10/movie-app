import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavourite from './components/AddFavourite';

function App() {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [favourites, setFavourites] = useState([]);
  
  const getMovieRequest =  async (searchValue) => {
    const url = `https://www.omdbapi.com/?s=${searchValue}&apikey=79555010`;
    
    const responce = await fetch(url);
    const responceJson = await responce.json();

    if(responceJson.Search) {
      setMovies(responceJson.Search);
    }
  };
  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  const AddFavouriteMovie = (movie) => {
    const newFavouriteList = [...favourites, movie];
    setFavourites(newFavouriteList);
  }

  return (
    <div className="container-fluid movie-app">
      <div className='row d-flex align-items-center mt-4 mb-4'>
     <MovieListHeading heading="Movies" />
     <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}/>
    </div>
    <div className='row'>
    <MovieList 
      movies={movies}
      handleFavouritesClick={AddFavouriteMovie}
      favouriteComponent={AddFavourite}
     />
    </div>
    <br></br>
    <div className='row d-flex align-items-center mt-4 mb-4'>
      <MovieListHeading heading='Favourites'/>
    </div>
    <div className='row'>
    <MovieList 
    movies={favourites}
    />
    </div>
    
    </div>
  );
}

export default App;
