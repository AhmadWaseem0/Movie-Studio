import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Upcoming_movieSlider.css";
import AQuietPlace from "../../Assets/AQuietPlace.jpg";
import LifttoLove from "../../Assets/LifttoLove.jpg";
import elixir from "../../Assets/images (3).jpeg";
import stolen from "../../Assets/images.jpeg";
import TheAmateur from "../../Assets/TheAmateur.jpg";
import hunt from "../../Assets/venom.jpg";



const movies = [
    { title: "A Quiet Place: Day One", img: AQuietPlace, description: "A young woman named Sam finds herself trapped in New York City during the early stages of an invasion by alien creatures with ultra-sensitive hearing." },
    { title: "Lift to Love", img: LifttoLove, description: "A chance encounter on Valentine's Day brings Hannah and Finn together as they race through New York City to return a lost engagement ring and save one couple's special day." },
    { title: "The Elixir", img: elixir, description: "A mysterious scientist..." },
    { title: "Stolen Hearts", img: stolen, description: "A story of love and betrayal..." },
    { title: "The Amateur", img: TheAmateur, description: "When his supervisors at the CIA refuse to take action after his wife is killed in a London terrorist attack, a decoder takes matters into his own hands." },
    { title: "The Hunt", img: hunt, description: "A hunter faces his demons..." }
];

const Upcoming_movieSlider = () => {
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
                <h5 className="movie-heading">UPCOMING</h5>
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

export default Upcoming_movieSlider;
