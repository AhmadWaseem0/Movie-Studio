const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.getAllUsers = (req, res) => {
    db.query("SELECT id, name, email FROM users", (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
};

exports.addUser = (req, res) => {
    const { name, email } = req.body;
    db.query(
        "INSERT INTO users (name, email) VALUES (?, ?)",
        [name, email],
        (err) => {
            if (err) return res.status(500).json(err);
            res.json({ message: "User added" });
        }
    );
};

/* ================= AUTH ================= */

exports.signup = async (req, res) => {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
        "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
        [name, email, hashedPassword],
        (err) => {
            if (err) return res.status(500).json(err);
            res.json({ message: "Signup successful" });
        }
    );
};

exports.login = (req, res) => {
    const { email, password } = req.body;

    db.query(
        "SELECT * FROM users WHERE email = ?",
        [email],
        async (err, result) => {
            if (result.length === 0)
                return res.status(401).json("User not found");

            const user = result[0];
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch)
                return res.status(401).json("Wrong password");

            const token = jwt.sign(
                { id: user.id },
                "SECRET_KEY",
                { expiresIn: "1d" }
            );

            res.json({
                token,
                user: { id: user.id, name: user.name, email: user.email }
            });
        }
    );
};
