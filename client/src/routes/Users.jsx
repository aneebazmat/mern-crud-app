import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Users() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/users")
            .then((response) => setUsers(response.data))
            .catch((error) => console.error("Error fetching users:", error));
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:5000/users/${id}`)
            .then(() => {
                setUsers(users.filter(user => user._id !== id));
            })
            .catch((error) => console.error("Error deleting user:", error));
    };

    return (
        <div className="users container mt-5 text-center ">
            <div className="users-header">
                <div>
                    <p className="users-header__eyebrow">User Management</p>
                    <h2 className="users-header__title">Manage your users</h2>
                    <p className="users-header__text">Keep all user records in one place and update them quickly.</p>
                </div>
                <Link to="/create" className="btn btn-primary users-create-btn">Create User</Link>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Age</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.age}</td>
                            <td>
                                <Link to={`/update/${user._id}`} className="btn btn-primary users-create-btn">Update</Link>
                                <button onClick={() => handleDelete(user._id)} className="btn btn-danger users-create-btn">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Users;