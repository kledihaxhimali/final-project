import { useState } from "react";
import { NavBar } from "./NavBar";
import { Logo } from "./Logo";
import { Search } from "./Search";
import { NumResults } from "./NumResults";
import { SortResults } from "./SortResults";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.6,
    userRating: 10,
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.6,
    userRating: 10,
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];
const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
export default function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);
  return (
    <>
      <NavBar>
        <Logo />
        <Search />
        <NumResults movies={movies} />
        <FilterResults />
        <SortResults />
      </NavBar>
      <MainBody>
        <Box>
          <BoxBar watched={watched}>
            <ResultsSummary movies={movies} />
          </BoxBar>
          <MovieResults movies={movies}>
            <Movie />
          </MovieResults>
        </Box>
        <Box>
          <BoxBar watched={watched}>
            <FavoriteSummary watched={watched} />
          </BoxBar>
          <WatchednFavoritesResult watched={watched} />
        </Box>
        <Box>
          <BoxBar watched={watched}>
            <WatchedMoviesSummary watched={watched} />
          </BoxBar>
          <WatchednFavoritesResult watched={watched} />
        </Box>
      </MainBody>
    </>
  );
}
function FilterResults({}) {
  //add filter options here
  return (
    <select>
      <option value="rate">Sort by rate</option>
      <option value="releasDate">Sort by release date</option>
    </select>
  );
}
function MainBody({ children }) {
  return <main className="main-body">{children}</main>;
}
function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}
function BoxBar({ children, watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return <div className="summary">{children}</div>;
}
function ResultsSummary({ avgUserRating, movies }) {
  return (
    <>
      <h2>Results of Your Search</h2>
      <div>
        <p>
          <span>{movies.length}</span>
          <span>📽️</span>
        </p>
        <p>
          <span>{avgUserRating}</span>
          <span>🌟</span>
        </p>
      </div>
    </>
  );
}
function FavoriteSummary({
  avgImdbRating,
  avgRunTime,
  avgUserRating,
  watched,
}) {
  return (
    <>
      <h2>Movies added on your list</h2>
      <div>
        <p>
          <span>{watched.length} </span>
          <span>📽️</span>
        </p>
        <p>
          <span>{avgImdbRating}</span>
          <span>⭐️</span>
        </p>
        <p>
          <span>{avgUserRating}</span>
          <span>🌟</span>
        </p>
        <p>
          <span>⌛</span>
          <span>{avgRunTime}</span>
        </p>
      </div>
    </>
  );
}
function WatchedMoviesSummary({ avgImdbRating, avgUserRating, watched }) {
  return (
    <>
      <h2>Movies you have watched</h2>
      <div>
        <p>
          <span>Total time </span>
          <span></span>
        </p>
        <p>
          <span>{avgImdbRating}</span>
          <span>⭐️</span>
        </p>
        <p>
          <span>{avgUserRating}</span>
          <span>🌟</span>
        </p>
      </div>
    </>
  );
}
function MovieResults({ movies }) {
  return (
    <ul className="list">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}
function Movie({ movie }) {
  return (
    <li>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>📆</span>
          <span>{movie.Year}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <select>
          <option value="favorites">Favorites</option>
          <option value="watched">Watched</option>
        </select>
      </div>
    </li>
  );
}
function WatchednFavoritesResult({ watched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchednFavoritesMovies movie={movie} />
      ))}
    </ul>
  );
}
function WatchednFavoritesMovies({ movie }) {
  return (
    <li key={movie.imdbID}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
      </div>
    </li>
  );
}
