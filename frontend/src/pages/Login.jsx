// import { useState } from "react";
// import { login } from "../api/userApi";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const navigate = useNavigate();

//     const handleLogin = async (e) => {
//         e.preventDefault();

//         try {
//             const res = await login({ email, password });
//             localStorage.setItem("token", res.data.token);

//             navigate("/users");   // ✅ instant redirect
//         } catch (err) {
//             alert("Login failed");
//         }
//     };

//     return (
//         <div
//             style={{
//                 minHeight: "100vh",
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 paddingTop: "80px",
//             }}
//         >
//             <form onSubmit={handleLogin} style={{ width: "300px" }}>
//                 <h2>Login</h2>

//                 <input
//                     type="email"
//                     placeholder="Email"
//                     onChange={(e) => setEmail(e.target.value)}
//                     style={{ width: "100%", marginBottom: "10px" }}
//                 />

//                 <input
//                     type="password"
//                     placeholder="Password"
//                     onChange={(e) => setPassword(e.target.value)}
//                     style={{ width: "100%", marginBottom: "10px" }}
//                 />

//                 <button style={{ width: "100%" }}>Login</button>
//             </form>
//         </div>
//     );
// };

// export default Login;


import { useState } from "react";
import { login } from "../api/userApi";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await login({ email, password });
            localStorage.setItem("token", res.data.token);
            navigate("/users");
        } catch (err) {
            alert("Login failed");
        }
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f4f6f9",
                paddingTop: "80px",
            }}
        >
            <div
                style={{
                    width: "400px",
                    background: "#fff",
                    padding: "30px",
                    borderRadius: "10px",
                    boxShadow: "0 0 15px rgba(0,0,0,0.1)",
                }}
            >
                <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
                    Login
                </h2>

                <form onSubmit={handleLogin}>
                    <div style={{ marginBottom: "15px" }}>
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "8px",
                                marginTop: "5px",
                                borderRadius: "5px",
                                border: "1px solid #ccc",
                            }}
                            required
                        />
                    </div>

                    <div style={{ marginBottom: "20px" }}>
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "8px",
                                marginTop: "5px",
                                borderRadius: "5px",
                                border: "1px solid #ccc",
                            }}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        style={{
                            width: "100%",
                            padding: "10px",
                            backgroundColor: "#198754",
                            color: "#fff",
                            border: "none",
                            borderRadius: "5px",
                            fontWeight: "bold",
                            cursor: "pointer",
                        }}
                    >
                        Login
                    </button>
                </form>

                <p style={{ textAlign: "center", marginTop: "15px" }}>
                    Don't have an account?{" "}
                    <Link to="/signup">Signup</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
