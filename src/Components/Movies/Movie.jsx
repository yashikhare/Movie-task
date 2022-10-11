import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import moment from "moment";
import "./Movie.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";

function Movies() {
  const [date, setDate] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [result, setResult] = useState("");
  const [openModal, setOpenModal] = useState(false);

  //Fetching the data from api
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = () => {
    fetch("https://movie-task.vercel.app/api/popular?page=1")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("data", data);
        setResult(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  //Filter by year
  const filter = (date) => {
    let res = [];
    for (let i = 0; i < result.data.results.length; i++) {
      if (
        moment(date).format("YYYY-MM-DD") ==
        moment(result.data.results[i].release_date).format("YYYY-MM-DD")
      ) {
        res.push(result.data.results[i]);
      }
    }

    var finalResult = result;
    finalResult.data.results = res;
    setResult({ ...finalResult });
  };

  return (
    <div>
      <div className="filter">
        <p>Filter by year</p>
        <input type="date" onChange={(e) => setDate(e.target.value)}></input>
        <button>
          <FontAwesomeIcon
            icon={faCheck}
            onClick={() => filter(date)}
          ></FontAwesomeIcon>
        </button>
        <button>
          <FontAwesomeIcon icon={faXmark} onClick={fetchData}></FontAwesomeIcon>
        </button>
      </div>
      <div className="MovieListContainer">
        {result?.data?.results?.map((i, index) => (
          <div key={index} className="MovieContainer">
            <div>
              <img
                src={`https://image.tmdb.org/t/p/original/${i?.poster_path}`}
                className="CoverImage"
                onClick={() => {
                  setSelectedMovie(i?.id);
                  setOpenModal(true);
                }}
              ></img>
            </div>
            <div className="MovieName">{i?.title}</div>
            <div className="InfoColumn">
              <div className="MovieInfo">{i?.release_date}</div>
              <div className="MovieInfo">Movie</div>
            </div>
          </div>
        ))}
        <Modal
          open={openModal}
          onClose={() => setOpenModal(false)}
          id={selectedMovie}
        />
      </div>
    </div>
  );
}
export default Movies;
