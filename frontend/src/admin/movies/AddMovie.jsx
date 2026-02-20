// import { useState } from "react";
// import axios from "axios";

// const AddMovie = () => {
//     const [title, setTitle] = useState("");
//     const [genre, setGenre] = useState("");
//     const [poster, setPoster] = useState("");
//     const [rating, setRating] = useState("");

//     const token = localStorage.getItem("token");

//     const submitMovie = async (e) => {
//         e.preventDefault();

//         await axios.post(
//             "http://localhost:5000/api/movies",
//             { title, genre, poster, rating },
//             {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             }
//         );

//         alert("🎉 Movie Added");
//         window.location.reload();
//     };

//     return (
//         <form onSubmit={submitMovie}>
//             <h3>➕ Add New Movie</h3>

//             <input placeholder="Movie Title" onChange={e => setTitle(e.target.value)} />
//             <input placeholder="Genre" onChange={e => setGenre(e.target.value)} />
//             <input placeholder="Poster URL" onChange={e => setPoster(e.target.value)} />
//             <input placeholder="Rating" onChange={e => setRating(e.target.value)} />

//             <button>Add Movie</button>
//         </form>
//     );
// };

// export default AddMovie;

// import { useState } from "react";
// import axios from "axios";

// const AddMovie = () => {
//   const [title, setTitle] = useState("");
//   const [genre, setGenre] = useState("");
//   const [poster, setPoster] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const [rating, setRating] = useState("");

//   const token = localStorage.getItem("token");

//   const handleImage = (e) => {
//     const file = e.target.files[0];
//     setPoster(file);
//     setPreview(URL.createObjectURL(file));
//   };

//   const submitMovie = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("genre", genre);
//     formData.append("poster", poster);
//     formData.append("rating", rating);

//     await axios.post("http://localhost:5000/api/movies", formData, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "multipart/form-data",
//       },
//     });

//     alert("🎉 Movie Added");
//     window.location.reload();
//   };

//   return (
//     <form onSubmit={submitMovie}>
//       <h3>➕ Add New Movie</h3>

//       <input
//         placeholder="Movie Title"
//         onChange={(e) => setTitle(e.target.value)}
//       />
//       <input placeholder="Genre" onChange={(e) => setGenre(e.target.value)} />

//       <input type="file" accept="image/*" onChange={handleImage} />

//       {preview && (
//         <img
//           src={preview}
//           alt="preview"
//           width="120"
//           style={{ display: "none", margin: "10px 0" }}
//         />
//       )}

//       <input placeholder="Rating" onChange={(e) => setRating(e.target.value)} />

//       <button>Add Movie</button>
//     </form>
//   );
// };

// export default AddMovie;
// import { useState } from "react";
// import axios from "axios";

// const AddMovie = () => {
//   const [title, setTitle] = useState("");
//   const [genre, setGenre] = useState("");
//   const [poster, setPoster] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const [rating, setRating] = useState("");
//   const [category, setCategory] = useState("");

//   const token = localStorage.getItem("token");

//   const handleImage = (e) => {
//     const file = e.target.files[0];
//     setPoster(file);
//     setPreview(URL.createObjectURL(file));
//   };

//   const submitMovie = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("genre", genre);
//     formData.append("poster", poster);
//     formData.append("rating", rating);
//     formData.append("category", category);

//     await axios.post("http://localhost:5000/api/movies", formData, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "multipart/form-data",
//       },
//     });

//     alert("🎉 Movie Added");
//     window.location.reload();
//   };

//   return (
//     <form className="p-2" onSubmit={submitMovie}>
//       <h3>➕ Add New Movie</h3>

//       <input
//         placeholder="Movie Title"
//         onChange={(e) => setTitle(e.target.value)}
//         className="m-2"
//       />

//       <input
//         placeholder="Genre"
//         onChange={(e) => setGenre(e.target.value)}
//         className="m-2"
//       />

//       {/* Category Select */}
//       <select onChange={(e) => setCategory(e.target.value)} className="m-2">
//         <option value="">Select Category</option>

//         <option value="upcoming">UPCOMING</option>
//         <option value="top">TOP RATED</option>
//         <option value="pop">POPULAR</option>
//       </select>

//       <input
//         type="file"
//         accept="image/*"
//         onChange={handleImage}
//         className="m-2"
//       />

//       {preview && (
//         <img
//           src={preview}
//           alt="preview"
//           width="120"
//           style={{ display: "none", margin: "10px 0" }}
//         />
//       )}

//       <input
//         placeholder="Rating"
//         onChange={(e) => setRating(e.target.value)}
//         className="m-2"
//       />

//       <button>Add Movie</button>
//     </form>
//   );
// };

// export default AddMovie;


import { useState } from "react";
import axios from "axios";

const AddMovie = () => {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [poster, setPoster] = useState(null);
  const [preview, setPreview] = useState(null);
  const [rating, setRating] = useState("");
  const [category, setCategory] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");

  const token = localStorage.getItem("token");

  // Image preview
  const handleImage = (e) => {
    const file = e.target.files[0];
    setPoster(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  // Submit movie
  const submitMovie = async (e) => {
    e.preventDefault();

    if (!poster) {
      alert("Poster image is required");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("genre", genre);
    formData.append("poster", poster);
    formData.append("rating", rating);
    formData.append("category", category);
    formData.append("youtubeUrl", youtubeUrl);

    try {
      await axios.post("http://localhost:5000/api/movies", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("🎉 Movie Added Successfully");

      // reset form
      setTitle("");
      setGenre("");
      setPoster(null);
      setPreview(null);
      setRating("");
      setCategory("");
      setYoutubeUrl("");
    } catch (error) {
      console.error(error);
      alert("Error adding movie");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add New Movie</h2>

      <form onSubmit={submitMovie}>
        {/* Title */}
        <input
          type="text"
          placeholder="Movie Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={inputStyle}
          required
        />

        {/* Genre */}
        <input
          type="text"
          placeholder="Genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          style={inputStyle}
          required
        />

        {/* Category */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={inputStyle}
          required
        >
          <option value="">Select Category</option>
          <option value="upcoming">Upcoming</option>
          <option value="top">Top Rated</option>
          <option value="pop">Popular</option>
        </select>

        {/* Rating */}
        <input
          type="number"
          step="0.1"
          placeholder="Rating (e.g. 4.5)"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          style={inputStyle}
          required
        />

        {/* YouTube URL */}
        <input
          type="text"
          placeholder="YouTube Trailer URL"
          value={youtubeUrl}
          onChange={(e) => setYoutubeUrl(e.target.value)}
          style={inputStyle}
        />

        {/* Poster Upload */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImage}
          style={inputStyle}
          required
        />

        {/* Image Preview */}
        {preview && (
          <img
            src={preview}
            alt="Preview"
            style={{
              width: "150px",
              marginTop: "10px",
              display: "none",
            }}
          />
        )}

        <button type="submit" style={buttonStyle}>
          Add Movie
        </button>
      </form>
    </div>
  );
};

const inputStyle = {
  display: "block",
  margin: "10px 0",
  padding: "10px",
  width: "300px",
};

const buttonStyle = {
  padding: "10px 20px",
  background: "black",
  color: "white",
  border: "none",
  cursor: "pointer",
  marginTop: "10px",
};

export default AddMovie;