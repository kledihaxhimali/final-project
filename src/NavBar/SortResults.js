import { useState } from "react";

export function SortResults({ movies }) {
  const [sortBy, setSortBy] = useState("input");
  let sortedMovies;
  if (sortBy === "input") sortedMovies = movies;
  if (sortBy === "rate")
    sortedMovies = movies.slice().sort((a, b) => b.imdbRating - a.imdbRating);
  if (sortBy === "releaseDate")
    sortedMovies = movies
      .slice()
      .sort((a, b) => Number(b.Year) - Number(a.Year));
  return (
    <select>
      <option value="input">Sort by input</option>
      <option value="rate">Sort by rate</option>
      <option value="releaseDate">Sort by release date</option>
    </select>
  );
}
