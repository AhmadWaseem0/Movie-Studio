import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./PMovieDetail.css";


const MovieDetail = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const movie = location.state; // 👈 Get movie data passed from Link

    if (!movie) {
        return <p style={{ textAlign: "center", marginTop: "50px" }}>Movie not found.</p>;
    }

    return (
        <div className="movie-detail">
            <button className="back-btn" onClick={() => navigate(-1)}>⬅ Back</button>
            <div className="movie-detail-content">
                <img src={movie.img} alt={movie.title} className="detail-img" />
                <div className="detail-info">
                    <h2 className="detail-title">{movie.title}</h2>
                    <p className="detail-desc">{movie.description}</p>
                    <p><strong>Status:</strong> <span className="released">Released</span></p>
                </div>
            </div>
        </div>
    );
};

export default MovieDetail;
