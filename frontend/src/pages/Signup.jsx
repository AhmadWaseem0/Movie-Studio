import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Form, Button, Card } from "react-bootstrap";

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/api/signup", {
                name, email, password
            });
            alert("✅ Signup Successful! Please Login.");
            navigate("/login");
        } catch (err) {
            alert("❌ Signup Failed");
        }
    };

    return (
        <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", paddingTop: "60px" }}>
            <Card style={{ width: "400px", padding: "20px" }}>
                <Card.Body>
                    <h2 className="text-center mb-4">Create Account</h2>
                    <Form onSubmit={handleSignup}>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Your Name" onChange={(e) => setName(e.target.value)} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="name@example.com" onChange={(e) => setEmail(e.target.value)} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
                        </Form.Group>
                        <Button variant="success" type="submit" className="w-100">
                            Signup
                        </Button>
                        <div className="text-center mt-3">
                            Already have an account? <Link to="/login">Login</Link>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Signup;