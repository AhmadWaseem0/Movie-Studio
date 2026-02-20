const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    // 1️⃣ Header se token lo
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "No token, access denied" });
    }

    // 2️⃣ "Bearer TOKEN" se token nikaalo
    const token = authHeader.split(" ")[1];

    try {
        // 3️⃣ Token verify karo
        const decoded = jwt.verify(token, "SECRET_KEY");

        // 4️⃣ User info request me attach karo
        req.user = decoded;

        // 5️⃣ Aage jaane do
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = authMiddleware;
