// import React, { useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Upcoming_movieSlider.css";
// import afterburn from "../../Assets/images (1).jpeg";
// import ourfault from "../../Assets/images (2).jpeg";
// import elixir from "../../Assets/images (3).jpeg";
// import stolen from "../../Assets/images.jpeg";
// import darkshadow from "../../Assets/The-Revenant.jpg";
// import hunt from "../../Assets/venom.jpg";
// import { Container, Row, Col, Button } from "react-bootstrap";

// const movies = [
//   {
//     title: "Afterburn",
//     img: afterburn,
//     description: "A young couple faces...",
//   },
//   { title: "Our Fault", img: ourfault, description: "A young couple faces..." },
//   {
//     title: "The Elixir",
//     img: elixir,
//     description: "A mysterious scientist...",
//   },
//   {
//     title: "Stolen Hearts",
//     img: stolen,
//     description: "A story of love and betrayal...",
//   },
//   {
//     title: "Dark Shadow",
//     img: darkshadow,
//     description: "A hunter faces his demons...",
//   },
//   { title: "The Hunt", img: hunt, description: "A hunter faces his demons..." },
// ];

// const Upcoming_movieSlider = () => {
//   const sliderRef = useRef(null);
//   const navigate = useNavigate();
//   let isDown = false;
//   let startX;
//   let scrollLeft;

//   const handleMouseDown = (e) => {
//     isDown = true;
//     sliderRef.current.classList.add("active");
//     startX = e.pageX - sliderRef.current.offsetLeft;
//     scrollLeft = sliderRef.current.scrollLeft;
//   };

//   const handleMouseLeave = () => {
//     isDown = false;
//     sliderRef.current.classList.remove("active");
//   };

//   const handleMouseUp = () => {
//     isDown = false;
//     sliderRef.current.classList.remove("active");
//   };

//   const handleMouseMove = (e) => {
//     if (!isDown) return;
//     e.preventDefault();
//     const x = e.pageX - sliderRef.current.offsetLeft;
//     const walk = (x - startX) * 2;
//     sliderRef.current.scrollLeft = scrollLeft - walk;
//   };

//   return (
//     <div className="movie-section">
//       <Container fluid className="my-4">
//         <Row className="align-items-center justify-content-between">
//           <Col xs="auto">
//             <h5 className="fw-bold text-dark mb-1">UPCOMING</h5>
//             <div className="line_style"></div>
//           </Col>
//           <Col xs="auto">
//             <Button
//               variant="dark"
//               className="fw-bold text-uppercase px-3 py-1"
//               style={{ fontSize: "0.8rem", borderRadius: "6px" }}
//             >
//               View More
//             </Button>
//           </Col>
//         </Row>
//         <hr className="mt-2" style={{ borderColor: "#b0b0b0" }} />
//       </Container>

//       <div
//         className="movie-slider-container"
//         ref={sliderRef}
//         onMouseDown={handleMouseDown}
//         onMouseLeave={handleMouseLeave}
//         onMouseUp={handleMouseUp}
//         onMouseMove={handleMouseMove}
//       >
//         {movies.map((movies, index) => (
//           <div
//             className="movie-card"
//             key={index}
//             onClick={() =>
//               navigate(`/movies/${encodeURIComponent(movies.title)}`, {
//                 state: movies,
//               })
//             }
//           >
//             <img src={movies.img} alt={movies.title} className="movie-img" />
//             <div className="movie-overlay">
//               <h6 className="movie-title">{movies.title}</h6>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Upcoming_movieSlider;

import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Upcoming_movieSlider.css";
import { Container, Row, Col, Button } from "react-bootstrap";

const Upcoming_movieSlider = () => {
  const sliderRef = useRef(null);
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);

  let isDown = false;
  let startX;
  let scrollLeft;

  // ✅ Fetch upcoming movies
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/movies/upcoming")
      .then((res) => setMovies(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleMouseDown = (e) => {
    isDown = true;
    sliderRef.current.classList.add("active");
    startX = e.pageX - sliderRef.current.offsetLeft;
    scrollLeft = sliderRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDown = false;
    sliderRef.current.classList.remove("active");
  };

  const handleMouseUp = () => {
    isDown = false;
    sliderRef.current.classList.remove("active");
  };

  const handleMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="movie-section">
      <Container fluid className="my-4">
        <Row className="align-items-center justify-content-between">
          <Col xs="auto">
            <h5 className="fw-bold text-dark mb-1">UPCOMING</h5>
            <div className="line_style"></div>
          </Col>
          <Col xs="auto">
            <Button
              variant="dark"
              className="fw-bold text-uppercase px-3 py-1"
              style={{ fontSize: "0.8rem", borderRadius: "6px" }}
            >
              View More
            </Button>
          </Col>
        </Row>
        <hr className="mt-2" style={{ borderColor: "#b0b0b0" }} />
      </Container>

      <div
        className="movie-slider-container"
        ref={sliderRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {movies.map((movie) => (
          <div
            className="movie-card"
            key={movie.id}
            // onClick={() =>
            //   navigate(`/movies/${encodeURIComponent(movie.title)}`, {
            //     state: movie,
            //   })
            // }

            onClick={() => {
              const selectedMovie = movie;

              let nowPlaying =
                JSON.parse(localStorage.getItem("nowPlayingMovies")) || [];

              // duplicate remove
              nowPlaying = nowPlaying.filter(
                (m) => m.title !== selectedMovie.title,
              );

              // new movie first
              nowPlaying.unshift(selectedMovie);

              localStorage.setItem(
                "nowPlayingMovies",
                JSON.stringify(nowPlaying),
              );

              navigate(`/movies/${encodeURIComponent(movie.title)}`, {
                state: movie,
              });
            }}
          >
            <img
              src={`http://localhost:5000/uploads/${movie.poster}`}
              alt={movie.title}
              className="movie-img"
            />
            <div className="movie-overlay">
              <h6 className="movie-title">{movie.title}</h6>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Upcoming_movieSlider;
