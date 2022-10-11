import React, { useState, useEffect } from "react";

const Modal = ({ open, onClose, id }) => {
  const [result, setResult] = useState("");
  
  //Fetching the data for an individal movie
  useEffect(() => {
    fetchData();
  }, [open]);
  const fetchData = () => {
    fetch(`https://movie-task.vercel.app/api/movie?movieId=${id}`)
      .then((response) => {
        console.log("res", response);
        return response.json();
      })
      .then((data) => {
        console.log("data1", data);
        setResult(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  if (!open) return null;

  return (
    <div onClick={onClose} className="overlay">
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="modalContainer"
      >
        <div className="modalRight">
          <p className="closeBtn" onClick={onClose}>
            X
          </p>
          <div className="content">
            <div className="Container">
              <img
                className="CoverImage"
                src={`https://image.tmdb.org/t/p/original/${result?.data?.poster_path}`}
              ></img>
              <div className="MovieName">
                {result?.data?.original_title}({result?.data?.release_date})
              </div>
              <div className="movieInfo">{result?.data?.overview}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
