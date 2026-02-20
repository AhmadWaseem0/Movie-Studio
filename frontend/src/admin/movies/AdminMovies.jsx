import AddMovie from "./AddMovie";
import MoviesTable from "./MoviesTable";

const AdminMovies = () => {
  return (
    <div style={{ padding: "90px 20px" }}>
      <h2>🎬 MovieStudio – Admin Panel</h2>
      <AddMovie />
      <MoviesTable />
    </div>
  );
};

export default AdminMovies;
