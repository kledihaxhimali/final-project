import { useState } from "react";

export function SortResults({ movies, onSortChange }) {
  const [sortBy, setSortBy] = useState("input");
  let sortedMovies;
  if (sortBy === "input") {
    sortedMovies = movies;
  }
  if (sortBy === "releaseDate") {
    sortedMovies = [...movies].sort((a, b) => Number(b.Year) - Number(a.Year));
  }
  if (sortBy === "rate") {
    sortedMovies = [...movies].sort((a, b) => b.imdbRating - a.imdbRating);
  }
  // Call the callback to update the sortedMovies in the parent component
  onSortChange(sortedMovies);
  return (
    <select
      value={sortBy}
      onChange={(e) => {
        setSortBy(e.target.value);
      }}
    >
      <option value="input">Sort by input</option>
      <option value="rate">Sort by rate</option>
      <option value="releaseDate">Sort by release date</option>
    </select>
  );
}
