// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Card, Button, Container, Row, Col } from "react-bootstrap";
// import { useSearchParams } from "react-router-dom"; // 👈 Ye zaroori hai

// const HomeMoviesList = () => {
//     const [movies, setMovies] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [searchParams] = useSearchParams(); // 👈 URL se data utha raha hai

//     // 👇 IMPORTANT: [searchParams] wali line dekhein
//     // Yeh wajah se jab search button dabega, ye function dubara chalega
//     useEffect(() => {
//         setLoading(true);

//         // URL se query nikaal rahe hain
//         const genre = searchParams.get("genre") || "All";
//         const q = searchParams.get("q") || "";

//         console.log("Fetching movies for:", q, genre); // Console mein check karein

//         // Search API call
//         axios.get(`/api/movies/search?q=${q}&genre=${genre}`)
//             .then(res => {
//                 setMovies(res.data);
//                 setLoading(false);
//             })
//             .catch(err => {
//                 console.log("Error:", err);
//                 setLoading(false);
//             });
//     }, [searchParams]); // 👈 Agar ye nahi hoga to search kaam nahi karega

//     return (
//         <Container style={{ padding: "40px 0" }}>
//             <h2 className="mb-4">
//                 {loading ? "Searching..." : movies.length > 0 ? "Latest Movies" : "No Movies Found"}
//             </h2>

//             <Row>
//                 {movies.map((movie) => (
//                     <Col key={movie.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
//                         <Card className="h-100 shadow-sm">
//                             <Card.Img
//                                 variant="top"
//                                 src={movie.poster}
//                                 style={{ height: "300px", objectFit: "cover" }}
//                                 alt={movie.title}
//                             />
//                             <Card.Body>
//                                 <Card.Title>{movie.title}</Card.Title>
//                                 <Card.Text>
//                                     <strong>Genre:</strong> {movie.genre}<br />
//                                     <strong>Rating:</strong> ⭐ {movie.rating}
//                                 </Card.Text>
//                                 <Button
//                                     variant="primary"
//                                     href={`/movies/${movie.title}`}
//                                 >
//                                     View Details
//                                 </Button>
//                             </Card.Body>
//                         </Card>
//                     </Col>
//                 ))}
//             </Row>
//         </Container>
//     );
// };

// export default HomeMoviesList;

import React, { useEffect, useState } from "react";
import api from "../api/axios"; // path adjust if needed
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";

const HomeMoviesList = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchParams] = useSearchParams();

    useEffect(() => {
        setLoading(true);

        const genre = searchParams.get("genre") || "All";
        const q = searchParams.get("q") || "";

        api.get(`/movies/search?q=${q}&genre=${genre}`)
            .then(res => {
                setMovies(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.log("Error:", err);
                setLoading(false);
            });

    }, [searchParams]);

    return (
        <Container style={{ padding: "40px 0" }}>
            <h2 className="mb-4">
                {loading
                    ? "Searching..."
                    : movies.length > 0
                        ? "Latest Movies"
                        : "No Movies Found"}
            </h2>

            <Row>
                {movies.map((movie) => (
                    <Col key={movie.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                        <Card className="h-100 shadow-sm">
                            <Card.Img
                                variant="top"
                                src={movie.poster}
                                style={{ height: "300px", objectFit: "cover" }}
                                alt={movie.title}
                            />
                            <Card.Body>
                                <Card.Title>{movie.title}</Card.Title>
                                <Card.Text>
                                    <strong>Genre:</strong> {movie.genre}<br />
                                    <strong>Rating:</strong> ⭐ {movie.rating}
                                </Card.Text>
                                <Button
                                    variant="primary"
                                    href={`/movies/${movie.title}`}
                                >
                                    View Details
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default HomeMoviesList;