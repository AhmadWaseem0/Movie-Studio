import React from "react";
import MyNavbar from "./Components/Navbar";
import Carousel from "./Components/carousel";
import PlayingMovieSlider from "./Components/Playing_MovieSlider/PlayingMovieSlider";
import UpcomingMovieSlider from "./Components/Upcoming_movieSlider/Upcoming_movieSlider";
import TopMovieSlider from "./Components/Top_Movie/TopMovieSlider";
import PopularMovie from "./Components/Popular_Movie/PopularMovie";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MovieDetail from "./Components/Playing_MovieSlider/PMovieDetail/PMovieDetail";

function App() {
  return (
    <Router>
      <Routes>
        {/* 👇 Home page with full layout */}
        <Route
          path="/"
          element={
            <>
              <MyNavbar />
              <Carousel />
              <div style={{ padding: "20px" }}>
                <h1>Welcome to Movie Studio</h1>
              </div>
              <PlayingMovieSlider />
              <UpcomingMovieSlider />
              <TopMovieSlider />
              <PopularMovie />
            </>
          }
        />

        {/* 👇 Detail page with only Navbar + MovieDetail */}
        <Route
          path="/movies/:title"
          element={
            <>
              <MyNavbar />
              <MovieDetail />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;