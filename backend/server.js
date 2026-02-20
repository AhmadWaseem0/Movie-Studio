const express = require("express");
require("dotenv").config();
const cors = require("cors");
const movieRoutes = require("./routes/movieRoutes");
const db = require("./config/db");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", require("./routes/userRoutes"));
app.use("/api/movies", movieRoutes);
app.use("/uploads", express.static("uploads"));


db.getConnection()
    .then(() => console.log("✅ MySQL Connected"))
    .catch(err => console.log("❌ DB Error:", err));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);
});