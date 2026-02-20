const express = require("express");
const cors = require("cors");
const movieRoutes = require("./routes/movieRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", require("./routes/userRoutes"));
app.use("/api/movies", movieRoutes);
app.use("/uploads", express.static("uploads"));

app.listen(5000, () => {
    console.log("Backend running on port 5000");
});
