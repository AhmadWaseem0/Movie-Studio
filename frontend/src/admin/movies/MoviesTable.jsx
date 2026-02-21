// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const MoviesTable = () => {
//   const [movies, setMovies] = useState([]);
//   const token = localStorage.getItem("token");
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios
//       .get("/api/movies")
//       .then((res) => setMovies(res.data));
//   }, []);

//   const deleteMovie = async (id) => {
//     await axios.delete(`/api/movies/${id}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     setMovies(movies.filter((m) => m.id !== id));
//   };

//   return (
//     <>
//       <h3>🎞 Movies List</h3>

//       <table border="1" cellPadding="10">
//         <thead>
//           <tr>
//             <th>Poster</th>
//             <th>Title</th>
//             <th>Genre</th>
//             <th>Rating</th>
//             <th>Action</th>
//           </tr>
//         </thead>

//         <tbody>
//           {movies.map((m) => (
//             <tr key={m.id}>
//               <td>
//                 <img src={m.poster} alt={m.title} width="60" />
//               </td>
//               <td>{m.title}</td>
//               <td>{m.genre}</td>
//               <td>{m.rating}</td>
//               <td>
//                 <button onClick={() => deleteMovie(m.id)}>❌ Delete</button>
//               </td>
//               <td>
//                 <button
//                   variant="warning"
//                   size="sm"
//                   onClick={() => navigate(`/admin/movies/edit/${m.id}`)}
//                 >
//                   Edit
//                 </button>
//                 <button
//                   variant="danger"
//                   size="sm"
//                   onClick={() => deleteMovie(m.id)}
//                   className="ms-2"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </>
//   );
// };

// export default MoviesTable;

import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MoviesTable = () => {
  const [movies, setMovies] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/movies")
      .then((res) => setMovies(res.data))
      .catch((err) => console.log(err));
  }, []);

  const deleteMovie = async (id) => {
    await axios.delete(`/api/movies/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setMovies(movies.filter((m) => m.id !== id));
  };

  return (
    <>
      <h3>🎞 Movies List</h3>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Poster</th>
            <th>Title</th>
            <th>Genre</th>
            <th>Rating</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {movies.map((m) => (
            <tr key={m.id}>
              <td>
                <img
                  src={`http://localhost:5000/uploads/${m.poster}`}
                  alt={m.title}
                  width="60"
                  height="50"
                />
              </td>
              <td>{m.title}</td>
              <td>{m.genre}</td>
              <td>{m.rating}</td>
              <td>
                <button onClick={() => navigate(`/admin/movies/edit/${m.id}`)}>
                  Edit
                </button>
                <button
                  onClick={() => deleteMovie(m.id)}
                  style={{ marginLeft: "10px" }}
                >
                  ❌ Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default MoviesTable;
