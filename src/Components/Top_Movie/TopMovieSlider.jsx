import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./TopMovieSlider.css";
import afterburn from "../../Assets/images (1).jpeg";
import ourfault from "../../Assets/images (2).jpeg";
import OneBattleAfterAnother from "../../Assets/One Battle After Another.jpg";
import stolen from "../../Assets/images.jpeg";
import darkshadow from "../../Assets/The-Revenant.jpg";
import hunt from "../../Assets/venom.jpg";



const movies = [
    { title: "Afterburn", img: afterburn, description: "A young couple faces..." },
    { title: "Our Fault", img: ourfault, description: "A young couple faces..." },
    { title: "One Battle After Another", img: OneBattleAfterAnother, description: "When their evil enemy resurfaces after 16 years, a group of ex-revolutionaries reunite to rescue the daughter of one of their own." },
    { title: "Stolen Hearts", img: stolen, description: "A story of love and betrayal..." },
    { title: "Dark Shadow", img: darkshadow, description: "A hunter faces his demons..." },
    { title: "The Hunt", img: hunt, description: "A hunter faces his demons..." }
];

const TopMovieSlider = () => {
    const sliderRef = useRef(null);
    const navigate = useNavigate();
    let isDown = false;
    let startX;
    let scrollLeft;

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
            <div className="movie-header">
                <h5 className="movie-heading">TOP RATED</h5>
                <button className="view-more">VIEW MORE</button>
            </div>
            <div className="header-underline"></div>

            <div
                className="movie-slider-container"
                ref={sliderRef}
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
            >
                {movies.map((movies, index) => (
                    <div
                        className="movie-card"
                        key={index}
                        onClick={() => navigate(`/movies/${encodeURIComponent(movies.title)}`, { state: movies })}
                    >
                        <img src={movies.img} alt={movies.title} className="movie-img" />
                        <div className="movie-overlay">
                            <h6 className="movie-title">{movies.title}</h6>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopMovieSlider;
