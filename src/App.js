import { useState } from "react";
import { NavBar } from "./NavBar/NavBar";
import { Logo } from "./NavBar/Logo";
import { Search } from "./NavBar/Search";
import { NumResults } from "./NavBar/NumResults";
import { SortResults } from "./NavBar/SortResults";
import { FilterResults } from "./NavBar/FilterResults";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.7,
    userRating: 9,
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.6,
    userRating: 6,
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
  arr.reduce((acc, cur, arr) => acc + cur / arr.length, 0);
export default function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);

  const [sortedMovies, setSortedMovies] = useState(movies);
  const handleSortChange = (sortedMovies) => {
    setSortedMovies(sortedMovies);
  };

  return (
    <>
      <NavBar>
        <Logo />
        <Search />
        <NumResults movies={movies} />
        <FilterResults />
        <SortResults movies={movies} onSortChange={handleSortChange} />
      </NavBar>
      <MainBody>
        <Box>
          <BoxBar watched={watched}>
            <ResultsSummary movies={movies} />
          </BoxBar>
          <MovieResults sortedMovies={sortedMovies}>
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
function ResultsSummary({ movies }) {
  return (
    <>
      <h2>Results of Your Search</h2>
      <div>
        <p>
          <span>📽️</span>
          <span>{movies.length}</span>
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
          <span>📽️</span>
          <span>{watched.length}</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>{avgRunTime}</span>
          <span>⌛</span>
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
          <span></span>
          <span>Total time </span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
      </div>
    </>
  );
}
function MovieResults({ sortedMovies }) {
  return (
    <ul className="list">
      {sortedMovies.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}
function Movie({ movie }) {
  return (
    <li key={movie.imdbID}>
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
        <div>
          <select>
            <option value="favorites">Too Watch </option>
            <option value="watched">Watched </option>
          </select>
          <span role="button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </span>
        </div>
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
        <p>
          <span role="button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="darkred"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="1" y1="12" x2="19" y2="12"></line>
            </svg>
          </span>
        </p>
      </div>
    </li>
  );
}
