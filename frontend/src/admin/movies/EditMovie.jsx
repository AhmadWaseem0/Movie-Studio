// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";
// import { Form, Button, Container, Card } from "react-bootstrap";

// const EditMovie = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const token = localStorage.getItem("token");

//     const [formData, setFormData] = useState({
//         title: "", genre: "", poster: "", rating: ""
//     });

//     // Fetch current movie data
//     useEffect(() => {
//         axios.get(`/api/movies/${id}`)
//             .then(res => setFormData(res.data[0])) // Backend returns array usually
//             .catch(err => alert("Error fetching movie"));
//     }, [id]);

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await axios.put(
//                 `/api/movies/${id}`,
//                 formData,
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );
//             alert("✅ Movie Updated!");
//             navigate("/admin/movies");
//         } catch (err) {
//             alert("❌ Update Failed");
//         }
//     };

//     return (
//         <Container style={{ marginTop: "100px", maxWidth: "600px" }}>
//             <Card>
//                 <Card.Header><h3>Edit Movie</h3></Card.Header>
//                 <Card.Body>
//                     <Form onSubmit={handleSubmit}>
//                         <Form.Group className="mb-3">
//                             <Form.Label>Title</Form.Label>
//                             <Form.Control name="title" value={formData.title} onChange={handleChange} required />
//                         </Form.Group>
//                         <Form.Group className="mb-3">
//                             <Form.Label>Genre</Form.Label>
//                             <Form.Control name="genre" value={formData.genre} onChange={handleChange} required />
//                         </Form.Group>
//                         <Form.Group className="mb-3">
//                             <Form.Label>Poster URL</Form.Label>
//                             <Form.Control name="poster" value={formData.poster} onChange={handleChange} required />
//                         </Form.Group>
//                         <Form.Group className="mb-3">
//                             <Form.Label>Rating</Form.Label>
//                             <Form.Control type="number" step="0.1" name="rating" value={formData.rating} onChange={handleChange} required />
//                         </Form.Group>
//                         <Button variant="primary" type="submit">Update Movie</Button>
//                         <Button variant="secondary" onClick={() => navigate("/admin/movies")} className="ms-2">Cancel</Button>
//                     </Form>
//                 </Card.Body>
//             </Card>
//         </Container>
//     );
// };

// export default EditMovie;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";
// import { Form, Button, Container, Card } from "react-bootstrap";

// const EditMovie = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   const [formData, setFormData] = useState({
//     title: "",
//     genre: "",
//     poster: "",
//     rating: "",
//   });

//   useEffect(() => {
//     axios
//       .get(`/api/movies/${id}`)
//       .then((res) => {
//         if (res.data && res.data.length > 0) {
//           setFormData(res.data[0]);
//         } else {
//           alert("Movie not found");
//           navigate("/admin/movies");
//         }
//       })
//       .catch((err) => {
//         console.error(err);
//         alert("Error fetching movie");
//         navigate("/admin/movies");
//       });
//   }, [id, navigate]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.put(`/api/movies/${id}`, formData, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       alert("✅ Movie Updated!");
//       navigate("/admin/movies");
//     } catch (err) {
//       console.error(err);
//       alert("❌ Update Failed");
//     }
//   };

//   return (
//     <Container style={{ marginTop: "50px", maxWidth: "600px" }}>
//       <Card>
//         <Card.Header>
//           <h3>Edit Movie</h3>
//         </Card.Header>
//         <Card.Body>
//           <Form onSubmit={handleSubmit}>
//             <Form.Group className="mb-3">
//               <Form.Label>Title</Form.Label>
//               <Form.Control
//                 name="title"
//                 value={formData.title}
//                 onChange={handleChange}
//                 required
//               />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Genre</Form.Label>
//               <Form.Control
//                 name="genre"
//                 value={formData.genre}
//                 onChange={handleChange}
//                 required
//               />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Poster</Form.Label>
//               <Form.Control
//                 name="poster"
//                 value={`http://localhost:5000/uploads/${formData.poster}`}
//                 onChange={handleChange}
//                 required
//               />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Rating</Form.Label>
//               <Form.Control
//                 type="number"
//                 step="0.1"
//                 name="rating"
//                 value={formData.rating}
//                 onChange={handleChange}
//                 required
//               />
//             </Form.Group>

//             <Button variant="primary" type="submit">
//               Update Movie
//             </Button>
//             <Button
//               variant="secondary"
//               onClick={() => navigate("/admin/movies")}
//               className="ms-2"
//             >
//               Cancel
//             </Button>
//           </Form>
//         </Card.Body>
//       </Card>
//     </Container>
//   );
// };

// export default EditMovie;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Container, Card, Image } from "react-bootstrap";

const EditMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    title: "",
    genre: "",
    poster: "", // filename from backend
    rating: "",
    category: "top",
  });

  const [preview, setPreview] = useState(null); // for poster preview
  const [newPoster, setNewPoster] = useState(null); // new file

  // Fetch current movie
  useEffect(() => {
    axios
      .get(`/api/movies/${id}`)
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setFormData(res.data[0]);
          setPreview(`http://localhost:5000/uploads/${res.data[0].poster}`);
        } else {
          alert("Movie not found");
          navigate("/admin/movies");
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Error fetching movie");
        navigate("/admin/movies");
      });
  }, [id, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePosterChange = (e) => {
    const file = e.target.files[0];
    setNewPoster(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("genre", formData.genre);
      data.append("rating", formData.rating);
      data.append("category", formData.category);

      if (newPoster) {
        data.append("poster", newPoster); // only append if new poster selected
      } else {
        data.append("poster", formData.poster); // keep old poster filename
      }

      await axios.put(`/api/movies/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("✅ Movie Updated!");
      navigate("/admin/movies");
    } catch (err) {
      console.error(err);
      alert("❌ Update Failed");
    }
  };

  return (
    <Container style={{ marginTop: "50px", maxWidth: "600px" }}>
      <Card>
        <Card.Header>
          <h3>Edit Movie</h3>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Genre</Form.Label>
              <Form.Control
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="top">Top Rated</option>
                <option value="upcoming">Upcoming</option>
                <option value="pop">Popular</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Poster</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handlePosterChange}
              />
            </Form.Group>

            {preview && (
              <div className="mb-3">
                <Image src={preview} alt="poster" fluid thumbnail />
              </div>
            )}

            <Form.Group className="mb-3">
              <Form.Label>Rating</Form.Label>
              <Form.Control
                type="number"
                step="0.1"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Update Movie
            </Button>
            <Button
              variant="secondary"
              onClick={() => navigate("/admin/movies")}
              className="ms-2"
            >
              Cancel
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EditMovie;
