import { useEffect, useState } from "react";
import { getUsers } from "../api/userApi";

function Users() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers().then(res => setUsers(res.data));
    }, []);

    return (
        <div style={{ marginTop: "120px", padding: "20px" }}>
            <h1>Users Page</h1>

            {users.length === 0 ? (
                <p>No users found</p>
            ) : (
                users.map((u) => (
                    <p key={u.id}>
                        {u.name} — {u.email}
                    </p>
                ))
            )}
        </div>
    );
}

export default Users;
