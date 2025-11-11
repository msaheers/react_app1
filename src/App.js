import { useState, useEffect } from 'react';

import MovieCard from './MovieCard';

import './App.css';
import SearchIcon from './search.svg';

const API_URL = 'http://www.omdbapi.com?apikey=f9248fce'

let App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&S=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    }

    useEffect(() => {
        searchMovies('Superman');

    }, []);



    return (
     <div className="app">
        <h1>NetFreeze</h1>

        <div className="search">
            <input 
             placeholder="Search for movies"
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
            />
            <img
                src={SearchIcon}
                alt="Search"
                onClick={() => searchMovies(searchTerm)}
            />
        </div>

        {movies?.length > 0
            ? (
              <div className="container">
                {movies.map((movie) => (
                    <MovieCard movie={movie} />
                ))}
              </div>
            ) : (
              <div className="empty">
                <h2>No Movies Found</h2>
              </div>
            )}
       </div>
    );
}

export default App;