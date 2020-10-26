import React, { useState, useEffect } from "react";
import axios from "../axios";
import "../css/Row.css";
import Modal from "../components/Modal";
import useModal from "../useModal";

const image_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [movieModal, setMovieModal] = useState([]);
  const { isShowing, toggle } = useModal();

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const movieModalInfo = (movie) => {
    setMovieModal(movie);
    toggle();
  };

  return (
    <div className="row">
      {isShowing && <Modal movieInfo={movieModal} hide={toggle} />}
      <h2>{title}</h2>
      <div className="row__posters">
        {movies.map((movie) => (
          <div
            onClick={() => movieModalInfo(movie)}
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
          >
            <div className="poster__overlay"></div>
            <img
              key={movie.id}
              src={`${image_url}${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.name}
            />
            <p className="poster__title">
              {movie?.title || movie?.name || movie?.original_name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Row;
