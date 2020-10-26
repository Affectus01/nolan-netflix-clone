import React, { useState, useEffect } from "react";
import axios from "../axios";
import requests from "../requests";
import movieTrailer from "movie-trailer";
import Youtube from "react-youtube";
import "../css/Modal.css";

function Modal({ movieInfo, hide }) {
  const [trailerUrl, setTrailerUrl] = useState("");
  const [movieYear, setMovieYear] = useState("");
  const [movieDetails, setMovieDetails] = useState([]);
  const [movieRatings, setMovieRatings] = useState("");
  const [movieRuntime, setMovieRuntime] = useState("");

  useEffect(() => {
    var movieDate = movieInfo?.first_air_date || movieInfo?.release_date;
    var movieDateSub = movieDate.substring(0, 4);
    setMovieYear(movieDateSub);

    movieTrailer(
      movieInfo?.title || movieInfo?.name || movieInfo?.original_name || "",
      movieYear
    )
      .then((url) => {
        const urlParams = new URLSearchParams(new URL(url).search);
        setTrailerUrl(urlParams.get("v"));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [
    movieInfo.first_air_date,
    movieInfo.release_date,
    movieInfo.title,
    movieInfo.name,
    movieInfo.original_name,
    movieYear,
  ]);

  useEffect(() => {
    async function fetchMovieDetails() {
      const request = await axios.get(
        `/movie/${movieInfo.id}` + requests.fetchMovieDetails
      );
      setMovieDetails(request.data);
    }
    fetchMovieDetails();
  }, [movieInfo.id]);

  useEffect(() => {
    async function fetchMovieRatings() {
      const request = await axios.get(
        `/movie/${movieInfo.id}` + requests.fetchMovieRatings
      );

      var releaseDates = request.data.results.map((releaseDates) => {
        var rating = releaseDates.release_dates.map((rating) => {
          setMovieRatings(rating.certification);
          return rating;
        });
        return releaseDates;
      });
    }
    fetchMovieRatings();
  }, [movieInfo.id]);

  useEffect(() => {
    function ratingsConvert(movieCertification) {
      var checkNumbers = /^[0-9]+$/;
      if (checkNumbers.test(movieCertification)) {
        var ratingInt = parseInt(movieCertification, 10);
        var ratingChar;
        switch (ratingInt) {
          case ratingInt < 8:
            ratingChar = "G";
            break;
          case ratingInt >= 8 && ratingInt < 13:
            ratingChar = "PG";
            break;
          case ratingInt >= 13 && ratingInt < 17:
            ratingChar = "PG-13";
            break;
          case ratingInt >= 17:
            ratingChar = "R";
            break;
          default:
            ratingChar = "NR";
        }
        setMovieRatings(ratingChar);
      } else {
        if (movieCertification !== "") {
          setMovieRatings(movieCertification);
        } else {
          setMovieRatings("NR");
        }
      }
    }
    ratingsConvert(movieRatings);
  }, [movieRatings]);

  useEffect(() => {
    function runtimeConvert(runtime) {
      var num = runtime;
      var hours = num / 60;
      var rhours = Math.floor(hours);
      var minutes = (hours - rhours) * 60;
      var rminutes = Math.round(minutes);
      setMovieRuntime(rhours + "h " + rminutes + "m");
    }
    runtimeConvert(movieDetails.runtime);
  }, [movieDetails.runtime]);

  const opts = {
    height: "500",
    width: "100%",
    playerVars: {
      autoplay: 1,
      rel: 0,
      controls: 0,
      disablekb: 1,
      color: "white",
    },
  };

  return (
    <div id="modal" className="modal__overlay">
      <div className="movie__modalPopup">
        <button onClick={hide} className="modal__exitButton">
          <i className="fa fa-times fa-3x"></i>
        </button>
        <div
          className="movie__trailer"
          style={{
            backgroundSize: "cover",
            backgroundImage: `url("https://image.tmdb.org/t/p/original/${movieInfo?.backdrop_path}")`,
            backgroundPosition: "center center",
            width: "100%",
            borderRadius: "25px 25px 0 0",
          }}
        >
          <div className={trailerUrl ? "" : "modal--fadeBottom"}></div>
          {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
        </div>
        <div className="movie__details">
          <h1 className="movie__title">
            {movieInfo?.title || movieInfo?.name || movieInfo?.original_name}
          </h1>
          <ul>
            <li>{movieYear}</li>
            <li>{movieRatings}</li>
            <li>{movieRuntime}</li>
          </ul>
          <p className="movie__overview">{movieDetails?.overview}</p>
        </div>
      </div>
    </div>
  );
}

export default Modal;
