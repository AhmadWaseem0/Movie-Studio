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

const MyNavbar = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [selectedGenre, setSelectedGenre] = useState("All");
    const [searchText, setSearchText] = useState("");

    const toggleDarkMode = () => setDarkMode(!darkMode);
    const handleGenreSelect = (genre) => setSelectedGenre(genre);

    const handleSearch = (e) => {
        e.preventDefault();
        alert(`Searching for "${searchText}" in "${selectedGenre}" genre.`);
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
                <Navbar.Brand href="#home" className="fw-bold">
                    🎬 MovieStudio
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    {/* Left navigation links */}
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <NavDropdown
                            title="Movies"
                            id="movies-dropdown"
                            menuVariant={darkMode ? "dark" : "light"}
                        >
                            <NavDropdown.Item href="#popular">Popular</NavDropdown.Item>
                            <NavDropdown.Item href="#top-rated">Top Rated</NavDropdown.Item>
                            <NavDropdown.Item href="#upcoming">Upcoming</NavDropdown.Item>
                        </NavDropdown>
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

                        {/* Search Button */}
                        <Button type="submit" variant={darkMode ? "outline-light" : "outline-dark"}>
                            Search
                        </Button>

                        {/* Dark Mode Toggle */}
                        <Button
                            variant={darkMode ? "light" : "dark"}
                            onClick={toggleDarkMode}
                            className="ms-2"
                        >
                            {darkMode ? "☀️ Light" : "🌙 Dark"}
                        </Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default MyNavbar;
