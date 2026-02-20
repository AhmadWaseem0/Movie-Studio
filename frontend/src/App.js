import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MyNavbar from "./Components/Navbar";
import Carousel from "./Components/carousel";
import PlayingMovieSlider from "./Components/Playing_MovieSlider/PlayingMovieSlider";
import UpcomingMovieSlider from "./Components/Upcoming_movieSlider/Upcoming_movieSlider";
import TopMovieSlider from "./Components/Top_Movie/TopMovieSlider";
import PopularMovie from "./Components/Popular_Movie/PopularMovie";
import MovieDetail from "./Components/Playing_MovieSlider/PMovieDetail/PMovieDetail";
import Users from "./Components/Users";
import Login from "./pages/Login";
import ProtectedRoute from "./Components/ProtectedRoute";
import Unauthorized from "./pages/Unauthorized";
import AdminMovies from "./admin/movies/AdminMovies";
import Signup from "./pages/Signup";
import EditMovie from "./admin/movies/EditMovie";
import HomeMoviesList from "./Components/HomeMoviesList";


function App() {
  return (
    <Router>

      {/* ✅ Navbar GLOBAL */}
      <MyNavbar />

      <Routes>

        {/* Home */}
        <Route
          path="/"
          element={
            <>
              <Carousel />
              {/* <HomeMoviesList />  */}
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

        {/* Movie Detail */}
        <Route path="/movies/:title" element={<MovieDetail />} />

        {/* Protected Users */}
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          }
        />

        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Signup */}
        <Route path="/signup" element={<Signup />} />

        {/* Unauthorized */}
        <Route path="/unauthorized" element={<Unauthorized />} />

        <Route
          path="/admin/movies"
          element={
            <ProtectedRoute role="admin">
              <AdminMovies />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/movies/edit/:id"
          element={
            <ProtectedRoute role="admin">
              <EditMovie />
            </ProtectedRoute>
          }
        />


      </Routes>
    </Router>
  );
}

export default App;
