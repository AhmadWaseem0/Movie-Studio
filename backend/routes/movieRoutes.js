const express = require("express");
const router = express.Router();
const db = require("../config/db");

const multer = require("multer");
const path = require("path");

// storage setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

// ADD MOVIE WITH IMAGE
// router.post("/", upload.single("poster"), (req, res) => {
//     const { title, genre, rating, category } = req.body;
//     const poster = req.file.filename;

//     const sql = "INSERT INTO movies (title, genre, poster, rating, category) VALUES (?, ?, ?, ?, ?)";

//     db.query(sql, [title, genre, poster, rating, category], (err, result) => {
//         if (err) return res.status(500).json(err);
//         res.json({ message: "Movie added successfully" });
//     });
// });


// router.post("/", upload.single("poster"), (req, res) => {
//     const { title, genre, rating, category } = req.body;
//     console.log("BODY:", req.body);   // 👈 add this

//     if (!req.file) {
//         return res.status(400).json({ message: "Image required" });
//     }

//     const poster = req.file.filename;

//     const sql = "INSERT INTO movies (title, genre, poster, rating, category) VALUES (?, ?, ?, ?, ?)";

//     db.query(sql, [title, genre, poster, rating, category], (err, result) => {
//         if (err) {
//             console.log(err);
//             return res.status(500).json(err);
//         }
//         res.json({ message: "Movie added successfully" });
//     });
// });

router.post("/", upload.single("poster"), (req, res) => {
    const { title, genre, rating, category, youtubeUrl } = req.body;

    if (!req.file) {
        return res.status(400).json({ message: "Image required" });
    }

    const poster = req.file.filename;

    const sql = `
    INSERT INTO movies (title, genre, poster, rating, category, youtubeUrl)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

    db.query(
        sql,
        [title, genre, poster, rating, category, youtubeUrl],
        (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json(err);
            }
            res.json({ message: "Movie added successfully" });
        }
    );
});


// 1️⃣ ADD MOVIE (POST)
// router.post("/", (req, res) => {
//     const { title, genre, poster, rating } = req.body;

//     const sql = "INSERT INTO movies (title, genre, poster, rating) VALUES (?, ?, ?, ?)";

//     db.query(sql, [title, genre, poster, rating], (err, result) => {
//         if (err) return res.status(500).json(err);
//         res.json({ message: "Movie added successfully" });
//     });
// });

// // 2️⃣ GET ALL MOVIES (LIST)
// router.get("/", (req, res) => {
//     db.query("SELECT * FROM movies", (err, results) => {
//         if (err) return res.status(500).json(err);
//         res.json(results);
//     });
// });

// 2️⃣ GET TOP RATED MOVIES
router.get("/top-rated", (req, res) => {
    db.query(
        "SELECT * FROM movies WHERE category='top' ORDER BY rating DESC",
        (err, result) => {
            if (err) return res.status(500).json(err);
            res.json(result);
        }
    );
});




router.get("/popular", (req, res) => {
    db.query("SELECT * FROM movies WHERE category='pop' ORDER BY id DESC", (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
});



router.get("/upcoming", (req, res) => {
    db.query("SELECT * FROM movies WHERE category='upcoming' ORDER BY id DESC", (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
});


// 3️⃣ DELETE MOVIE
router.delete("/:id", (req, res) => {
    const { id } = req.params;

    db.query("DELETE FROM movies WHERE id = ?", [id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Movie deleted successfully" });
    });
});



// Update movie with optional new poster
router.put("/:id", upload.single("poster"), (req, res) => {
    const { id } = req.params;
    const { title, genre, rating, category } = req.body;
    let poster = req.body.poster; // default: old poster

    if (req.file) {
        poster = req.file.filename; // new poster uploaded
    }

    const sql =
        "UPDATE movies SET title=?, genre=?, poster=?, rating=?, category=? WHERE id=?";

    db.query(sql, [title, genre, poster, rating, category, id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Movie updated successfully" });
    });
});

// 4️⃣ UPDATE MOVIE (EDIT)
// router.put("/:id", (req, res) => {
//     const { id } = req.params;
//     const { title, genre, poster, rating } = req.body;

//     const sql = "UPDATE movies SET title=?, genre=?, poster=?, rating=? WHERE id=?";

//     db.query(sql, [title, genre, poster, rating, id], (err, result) => {
//         if (err) return res.status(500).json(err);
//         res.json({ message: "Movie updated successfully" });
//     });
// });

// 5️⃣ SEARCH MOVIES
router.get("/search", (req, res) => {
    const { q, genre } = req.query;

    let sql = "SELECT * FROM movies WHERE 1=1";
    let params = [];

    if (q) {
        sql += " AND title LIKE ?";
        params.push(`%${q}%`);
    }

    if (genre && genre !== "All") {
        sql += " AND genre = ?";
        params.push(genre);
    }

    db.query(sql, params, (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// 6️⃣ GET MOVIE BY ID (FOR EDIT PAGE)
router.get("/:id", (req, res) => {
    const { id } = req.params;

    db.query(
        "SELECT * FROM movies WHERE id = ?",
        [id],
        (err, results) => {
            if (err) return res.status(500).json(err);
            res.json(results);
        }
    );
});




router.get("/", (req, res) => {
    db.query("SELECT * FROM movies", (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result); // result is an array of objects
    });
});


module.exports = router;