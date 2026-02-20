import React from "react";
import { Carousel } from "react-bootstrap";
import Dracula from "../Assets/Dracula.jpg";

const HeroCarousel = () => {
    return (
        <div style={{ marginTop: "80px" }}> {/* Keeps space below navbar */}
            <Carousel controls={false} indicators={false} fade interval={2000}>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://images.unsplash.com/photo-1606112219348-204d7d8b94ee?auto=format&fit=crop&w=1600&q=80"
                        alt="First slide"
                        style={{ height: "500px", objectFit: "cover" }}
                    />
                    <Carousel.Caption>
                        <h3>Welcome to MovieStudio</h3>
                        <p>Discover amazing movies and explore your favorite genres.</p>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={Dracula}
                        alt="Second slide"
                        style={{
                            width: "100%",
                            height: "100vh",       // Full height of viewport
                            objectFit: "cover",    // Fill without black borders
                            objectPosition: "center" // Keep image centered
                        }}
                    />
                    <Carousel.Caption>
                        <h3>Stream Anywhere</h3>
                        <p>Enjoy watching across all your devices.</p>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://images.unsplash.com/photo-1517602302552-471fe67acf66?auto=format&fit=crop&w=1600&q=80"
                        alt="Third slide"
                        style={{ height: "500px", objectFit: "cover" }}
                    />
                    <Carousel.Caption>
                        <h3>Experience Cinema at Home</h3>
                        <p>Join thousands of movie lovers today!</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    );
};

export default HeroCarousel;




