import React, { useEffect, useState } from "react";
import { getUsers } from "../api/userApi";

const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers()
            .then((res) => setUsers(res.data))
            .catch(() => alert("Unauthorized ❌ Login required"));
    }, []);

    return (
        <div>
            <h2>Users List</h2>

            <ul>
                {users.map((u) => (
                    <li key={u.id}>{u.name} — {u.email}</li>
                ))}
            </ul>
        </div>
    );
};

export default Users;
