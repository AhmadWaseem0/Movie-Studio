// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import "./PMovieDetail.css";

// const MovieDetail = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const movie = location.state; // 👈 Get movie data passed from Link

//   if (!movie) {
//     return (
//       <p style={{ textAlign: "center", marginTop: "50px" }}>Movie not found.</p>
//     );
//   }

//   return (
//     <div className="movie-detail">
//       <button className="back-btn" onClick={() => navigate(-1)}>
//         ⬅ Back
//       </button>
//       <div className="movie-detail-content">
//         {/* <img src={movie.img} alt={movie.title} className="detail-img" /> */}
//         <img
//           src={
//             movie.img
//               ? movie.img
//               : `http://localhost:5000/uploads/${movie.poster}`
//           }
//           alt={movie.title}
//           className="detail-img"
//         />
//         <div className="detail-info">
//           <h2 className="detail-title">{movie.title}</h2>
//           <p className="detail-desc">{movie.description}</p>
//           <p>
//             <strong>Status:</strong> <span className="released">Released</span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MovieDetail;

import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./PMovieDetail.css";

const MovieDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const movie = location.state;
  console.log(movie);

  if (!movie) {
    return (
      <p style={{ textAlign: "center", marginTop: "50px" }}>Movie not found.</p>
    );
  }

  // YouTube embed link convert
  const getEmbedUrl = (url) => {
    if (!url) return "";

    if (url.includes("youtu.be/")) {
      const videoId = url.split("youtu.be/")[1];
      return `https://www.youtube.com/embed/${videoId}`;
    }

    if (url.includes("watch?v=")) {
      const videoId = url.split("v=")[1];
      return `https://www.youtube.com/embed/${videoId}`;
    }

    return url;
  };

  return (
    <div className="movie-detail">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ⬅ Back
      </button>

      <div className="movie-detail-content">
        <img
          src={
            movie.img
              ? movie.img
              : `http://localhost:5000/uploads/${movie.poster}`
          }
          alt={movie.title}
          className="detail-img"
        />

        <div className="detail-info">
          <h2 className="detail-title">{movie.title}</h2>
          <p className="detail-desc">{movie.description}</p>
          <p>
            <strong>Status:</strong> <span className="released">Released</span>
          </p>
        </div>
      </div>

      {/* 🎬 YouTube Trailer */}
      <div className="mt-5 ">
        <iframe
          width="100%"
          height="500"
          src={getEmbedUrl(movie.youtubeUrl)}
          title="YouTube trailer"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default MovieDetail;