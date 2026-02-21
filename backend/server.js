const express = require("express");

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const cors = require("cors");
const movieRoutes = require("./routes/movieRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api", require("./routes/userRoutes"));
app.use("/api/movies", movieRoutes);
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
    res.send("Backend is running ✅");
});

// Use Railway PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);
});