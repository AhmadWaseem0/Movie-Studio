// import React, { useState } from "react";
// import {
//     Navbar,
//     Nav,
//     NavDropdown,
//     Form,
//     FormControl,
//     Button,
//     Container,
// } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";
// import { Link } from "react-router-dom";


// const MyNavbar = () => {
//     const [darkMode, setDarkMode] = useState(false);
//     const [selectedGenre, setSelectedGenre] = useState("All");
//     const [searchText, setSearchText] = useState("");

//     const navigate = useNavigate();

//     const token = localStorage.getItem("token");
//     let role = null;

//     if (token) {
//         try {
//             const decoded = jwtDecode(token);
//             role = decoded.role;
//         } catch (err) {
//             localStorage.removeItem("token");
//         }
//     }



//     const toggleDarkMode = () => setDarkMode(!darkMode);
//     const handleGenreSelect = (genre) => setSelectedGenre(genre);

//     const handleSearch = (e) => {
//         e.preventDefault();
//         navigate(`/?q=${searchText}&genre=${selectedGenre}`);
//     };

//     return (
//         <Navbar
//             collapseOnSelect
//             expand="lg"
//             bg={darkMode ? "dark" : "light"}
//             variant={darkMode ? "dark" : "light"}
//             fixed="top"
//             className="shadow-sm"
//         >
//             <Container>
//                 {/* Brand */}
//                 <Navbar.Brand href="/" className="fw-bold">
//                     🎬 MovieStudio
//                 </Navbar.Brand>

//                 <Navbar.Toggle aria-controls="responsive-navbar-nav" />
//                 <Navbar.Collapse id="responsive-navbar-nav">
//                     {/* Left navigation links */}
//                     <Nav className="me-auto">
//                         <Nav.Link href="/">Home</Nav.Link>
//                         <NavDropdown
//                             title="Movies"
//                             id="movies-dropdown"
//                             menuVariant={darkMode ? "dark" : "light"}
//                         >
//                             <NavDropdown.Item href="#popular">Popular</NavDropdown.Item>
//                             <NavDropdown.Item href="#top-rated">Top Rated</NavDropdown.Item>
//                             <NavDropdown.Item href="#upcoming">Upcoming</NavDropdown.Item>
//                         </NavDropdown>
//                         {role === "admin" && (
//                             <Nav.Link as={Link} to="/admin/movies">
//                                 🎬 Admin Movies
//                             </Nav.Link>
//                         )}

//                         <Nav.Link href="#about">About</Nav.Link>
//                     </Nav>

//                     {/* Search & Genre Section */}
//                     <Form className="d-flex align-items-center gap-2" onSubmit={handleSearch}>
//                         {/* Genre Dropdown */}
//                         <NavDropdown
//                             title={
//                                 <span style={{ color: darkMode ? "#fff" : "#000" }}>
//                                     Genre: {selectedGenre}
//                                 </span>
//                             }
//                             id="genre-dropdown"
//                             onSelect={handleGenreSelect}
//                             menuVariant={darkMode ? "dark" : "light"}
//                         >
//                             <NavDropdown.Item eventKey="All">All</NavDropdown.Item>
//                             <NavDropdown.Item eventKey="Action">Action</NavDropdown.Item>
//                             <NavDropdown.Item eventKey="Comedy">Comedy</NavDropdown.Item>
//                             <NavDropdown.Item eventKey="Drama">Drama</NavDropdown.Item>
//                             <NavDropdown.Item eventKey="Horror">Horror</NavDropdown.Item>
//                             <NavDropdown.Item eventKey="Romance">Romance</NavDropdown.Item>
//                             <NavDropdown.Item eventKey="Sci-Fi">Sci-Fi</NavDropdown.Item>
//                         </NavDropdown>

//                         {/* Search Input */}
//                         <FormControl
//                             type="search"
//                             placeholder="Search movies..."
//                             className="me-2"
//                             aria-label="Search"
//                             value={searchText}
//                             onChange={(e) => setSearchText(e.target.value)}
//                             style={{
//                                 backgroundColor: darkMode ? "#343a40" : "#fff",
//                                 color: darkMode ? "#fff" : "#000",
//                                 border: darkMode ? "1px solid #555" : "1px solid #ccc",
//                             }}
//                         />

//                         {/* Search Button */}
//                         <Button type="submit" variant={darkMode ? "outline-light" : "outline-dark"}>
//                             Search
//                         </Button>

//                         {/* Dark Mode Toggle */}
//                         <Button
//                             variant={darkMode ? "light" : "dark"}
//                             onClick={toggleDarkMode}
//                             className="ms-2 height"
//                         >
//                             {darkMode ? "☀️ Light" : "🌙 Dark"}
//                         </Button>
//                         {/* Login / Logout */}
//                         {token ? (
//                             // ✅ Agar Login hai to Logout button
//                             <Button
//                                 variant="outline-danger"
//                                 className="ms-2"
//                                 onClick={() => {
//                                     localStorage.removeItem("token");
//                                     navigate("/login");
//                                 }}
//                             >
//                                 Logout
//                             </Button>
//                         ) : (
//                             // ❌ Agar Login NAHI ho to Login aur Signup dono
//                             <>
//                                 <Button
//                                     variant="outline-primary"
//                                     className="ms-2 loginsignup"
//                                     onClick={() => navigate("/login")}
//                                 >
//                                     Login
//                                 </Button>

//                                 <Button
//                                     variant="primary"
//                                     className="ms-2 loginsignup"
//                                     onClick={() => navigate("/signup")}
//                                 >
//                                     Signup
//                                 </Button>
//                             </>
//                         )}

//                     </Form>
//                 </Navbar.Collapse>
//             </Container>
//         </Navbar>
//     );
// };

// export default MyNavbar;

import React, { useState } from "react";
import {
    Navbar,
    Nav,
    NavDropdown,
    Form,
    FormControl,
    Button,
    Container,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useRef } from "react";


const MyNavbar = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [selectedGenre, setSelectedGenre] = useState("All");
    // const [searchText, setSearchText] = useState("");
    const [searchText, setSearchText] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const searchRef = useRef(null);



    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    let role = null;

    if (token) {
        try {
            const decoded = jwtDecode(token);
            role = decoded.role;
        } catch (err) {
            localStorage.removeItem("token");
        }
    }

    // useEffect(() => {
    //     if (searchText.trim() === "") {
    //         setSearchResults([]);
    //         return;
    //     }

    //     axios
    //         .get("/api/movies")
    //         .then((res) => {
    //             const filtered = res.data.filter((movie) =>
    //                 movie.title.toLowerCase().includes(searchText.toLowerCase())
    //             );
    //             setSearchResults(filtered);
    //         });
    // }, [searchText]);

    // const goToMovie = (movie) => {
    //     setSearchText("");
    //     setSearchResults([]);
    //     navigate(`/movies/${movie.id}`, { state: movie });
    // };




    const searchMovies = () => {
        if (searchText.trim() === "") {
            setSearchResults([]);
            return;
        }

        axios
            .get(`/api/movies/search?q=${searchText}`)
            .then((res) => setSearchResults(res.data))
            .catch((err) => console.log(err));
    };
    useEffect(() => {
        const delay = setTimeout(() => {
            searchMovies();
        }, 300); // debounce

        return () => clearTimeout(delay);
    }, [searchText]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setSearchResults([]);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const goToMovie = (movie) => {
        setSearchText("");
        setSearchResults([]);
        navigate(`/movies/${movie.id}`, { state: movie });
    };

    const toggleDarkMode = () => setDarkMode(!darkMode);
    const handleGenreSelect = (genre) => setSelectedGenre(genre);

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/?q=${searchText}&genre=${selectedGenre}`);
    };

    return (
        <Navbar
            collapseOnSelect
            expand="lg"
            bg={darkMode ? "dark" : "light"}
            variant={darkMode ? "dark" : "light"}
            fixed="top"
            className="shadow-sm"
        >
            <Container>
                {/* Brand */}
                <Navbar.Brand href="/" className="fw-bold">
                    🎬 MovieStudio
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    {/* Left navigation links */}
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <NavDropdown
                            title="Movies"
                            id="movies-dropdown"
                            menuVariant={darkMode ? "dark" : "light"}
                        >
                            <NavDropdown.Item href="#popular">Popular</NavDropdown.Item>
                            <NavDropdown.Item href="#top-rated">Top Rated</NavDropdown.Item>
                            <NavDropdown.Item href="#upcoming">Upcoming</NavDropdown.Item>
                        </NavDropdown>
                        {role === "admin" && (
                            <Nav.Link as={Link} to="/admin/movies">
                                🎬 Admin Movies
                            </Nav.Link>
                        )}

                        <Nav.Link href="#about">About</Nav.Link>
                    </Nav>

                    {/* Search & Genre Section */}
                    <Form className="d-flex align-items-center gap-2" onSubmit={handleSearch}>
                        {/* Genre Dropdown */}
                        <NavDropdown
                            title={
                                <span style={{ color: darkMode ? "#fff" : "#000" }}>
                                    Genre: {selectedGenre}
                                </span>
                            }
                            id="genre-dropdown"
                            onSelect={handleGenreSelect}
                            menuVariant={darkMode ? "dark" : "light"}
                        >
                            <NavDropdown.Item eventKey="All">All</NavDropdown.Item>
                            <NavDropdown.Item eventKey="Action">Action</NavDropdown.Item>
                            <NavDropdown.Item eventKey="Comedy">Comedy</NavDropdown.Item>
                            <NavDropdown.Item eventKey="Drama">Drama</NavDropdown.Item>
                            <NavDropdown.Item eventKey="Horror">Horror</NavDropdown.Item>
                            <NavDropdown.Item eventKey="Romance">Romance</NavDropdown.Item>
                            <NavDropdown.Item eventKey="Sci-Fi">Sci-Fi</NavDropdown.Item>
                        </NavDropdown>

                        {/* Search Input */}
                        {/* <FormControl
                            type="search"
                            placeholder="Search movies..."
                            className="me-2"
                            aria-label="Search"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            style={{
                                backgroundColor: darkMode ? "#343a40" : "#fff",
                                color: darkMode ? "#fff" : "#000",
                                border: darkMode ? "1px solid #555" : "1px solid #ccc",
                            }}
                        /> */}

                        {/* Search Button */}
                        {/* <Button type="submit" variant={darkMode ? "outline-light" : "outline-dark"}>
                            Search
                        </Button> */}
                        {/* <div style={{ position: "relative" }}>
                            <FormControl
                                type="search"
                                placeholder="Search movies..."
                                className="me-2"
                                aria-label="Search"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                style={{
                                    backgroundColor: darkMode ? "#343a40" : "#fff",
                                    color: darkMode ? "#fff" : "#000",
                                    border: darkMode ? "1px solid #555" : "1px solid #ccc",
                                }}
                            />

                            {searchResults.length > 0 && (
                                <div
                                    style={{
                                        position: "absolute",
                                        top: "45px",
                                        width: "100%",
                                        background: darkMode ? "#343a40" : "#fff",
                                        border: "1px solid #ccc",
                                        zIndex: 999,
                                        borderRadius: "5px",
                                        maxHeight: "250px",
                                        overflowY: "auto",
                                    }}
                                >
                                    {searchResults.map((movie) => (
                                        <div
                                            key={movie.id}
                                            onClick={() => goToMovie(movie)}
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                padding: "10px",
                                                cursor: "pointer",
                                                borderBottom: "1px solid #eee",

                                            }}
                                        >
                                            <img
                                                src={`http://localhost:5000/uploads/${movie.poster}`}
                                                alt={movie.title}
                                                width="40"
                                                style={{ marginRight: "10px" }}
                                            />

                                            <span style={{
                                                maxWidth: "170px"
                                                , width: "100%"
                                            }}> {movie.title}</span>
                                        </div>
                                    ))}

                                </div>
                            )}
                        </div> */}


                        <div style={{ position: "relative" }} ref={searchRef}>
                            <div style={{ display: "flex" }}>
                                <FormControl
                                    type="search"
                                    placeholder="Search movies..."
                                    className="me-2"
                                    value={searchText}
                                    onChange={(e) => setSearchText(e.target.value)}
                                />

                                <Button onClick={searchMovies} type="submit" variant={darkMode ? "outline-light" : "outline-dark"}>
                                    Search
                                </Button>
                            </div>

                            {searchResults.length > 0 && (
                                <div
                                    style={{
                                        position: "absolute",
                                        top: "45px",
                                        width: "100%",
                                        background: "#fff",
                                        border: "1px solid #ccc",
                                        zIndex: 999,
                                        borderRadius: "5px",
                                        maxHeight: "250px",
                                        overflowY: "auto",
                                    }}
                                >
                                    {searchResults.map((movie) => (
                                        <div
                                            key={movie.id}
                                            onClick={() => goToMovie(movie)}
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                padding: "10px",
                                                cursor: "pointer",
                                                borderBottom: "1px solid #eee",
                                            }}
                                        >
                                            <img
                                                src={`http://localhost:5000/uploads/${movie.poster}`}
                                                alt={movie.title}
                                                width="40"
                                                style={{ marginRight: "10px" }}
                                            />
                                            <span>{movie.title}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>



                        {/* Dark Mode Toggle */}
                        <Button
                            variant={darkMode ? "light" : "dark"}
                            onClick={toggleDarkMode}
                            className="ms-2"
                        >
                            {darkMode ? "☀️ Light" : "🌙 Dark"}
                        </Button>
                        {/* Login / Logout */}
                        {token ? (
                            // ✅ Agar Login hai to Logout button
                            <Button
                                variant="outline-danger"
                                className="ms-2"
                                onClick={() => {
                                    localStorage.removeItem("token");
                                    navigate("/login");
                                }}
                            >
                                Logout
                            </Button>
                        ) : (
                            // ❌ Agar Login NAHI ho to Login aur Signup dono
                            <>
                                <Button
                                    variant="outline-primary"
                                    className="ms-2"
                                    onClick={() => navigate("/login")}
                                >
                                    Login
                                </Button>

                                <Button
                                    variant="primary"
                                    className="ms-2"
                                    onClick={() => navigate("/signup")}
                                >
                                    Signup
                                </Button>
                            </>
                        )}

                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default MyNavbar;