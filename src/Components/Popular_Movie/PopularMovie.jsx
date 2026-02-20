import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./PopularMovie.css";
import thewitcher from "../../Assets/The Witcher.jpg";
import heartofstone from "../..//Assets/Heart Of Stone.jpg";
import companion from "../../Assets/Companion.jpg";
import PrinceofPersia from "../../Assets/Prince of Persia.jpg";
import darkshadow from "../../Assets/The-Revenant.jpg";
import hunt from "../../Assets/venom.jpg";




const movies = [
    { title: "The Witcher", img: thewitcher, description: "Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts." },
    { title: "Heart of Stone", img: heartofstone, description: "An intelligence operative for a shadowy global peacekeeping agency races to stop a hacker from stealing its most valuable and dangerous weapon." },
    { title: "Prince of Persia", img: PrinceofPersia, description: "A young fugitive prince and princess must stop a villain who unknowingly threatens to destroy the world with a special dagger that enables the magic sand inside to reverse time." },
    { title: "Companion", img: companion, description: "A weekend getaway with friends at a remote cabin turns into chaos after it's revealed that one of the guests is not what they seem." },
    { title: "Dark Shadow", img: darkshadow, description: "A hunter faces his demons..." },
    { title: "The Hunt", img: hunt, description: "A hunter faces his demons..." }
];

const PopularMovie = () => {
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
                <h5 className="movie-heading">POPULAR</h5>
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

export default PopularMovie;
