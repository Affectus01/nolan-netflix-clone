import React, { useState, useEffect } from "react";
import axios from "../axios";
import requests from "../requests";
import "../css/Banner.css";
import Modal from "../components/Modal";
import useModal from "../useModal";

function Banner() {
  const [movie, setMovie] = useState([]);
  const [movieModal, setMovieModal] = useState([]);
  const { isShowing, toggle } = useModal();

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
    }
    fetchData();
  }, []);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  const movieModalInfo = (movie) => {
    setMovieModal(movie);
    toggle();
  };

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundPosition: "center 15%",
      }}
    >
      {isShowing && <Modal movieInfo={movieModal} hide={toggle} />}
      <div className="banner--overlay"></div>
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <p className="banner__description">{truncate(movie?.overview, 150)}</p>
        <div className="banner__buttons">
          <button className="banner__button1">
            <i className="fas fa-play fa-lg"></i>&nbsp;&nbsp;Play
          </button>
          <button
            onClick={() => movieModalInfo(movie)}
            className="banner__button2"
          >
            <i className="fas fa-info-circle fa-lg"></i>
            &nbsp;&nbsp;More Info
          </button>
        </div>
      </div>
      <div className="banner--fadeBottom"></div>
    </header>
  );
}

export default Banner;
