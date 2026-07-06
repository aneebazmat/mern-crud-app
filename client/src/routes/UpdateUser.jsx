import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function UpdateUser() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:5000/users/${id}`)
            .then((response) => {
                const user = response.data;
                setName(user.name);
                setEmail(user.email);
                setAge(user.age);
            })
            .catch((error) => {
                console.error("Error fetching user:", error);
                setIsError(true);
                setMessage("Unable to load the user for editing.");
            });
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage("");
        setIsError(false);

        axios.put(`http://localhost:5000/users/${id}`, { name, email, age })
            .then(() => {
                setMessage("User updated successfully!");
                setTimeout(() => navigate("/"), 500);
            })
            .catch((error) => {
                console.error("Error updating user:", error);
                setIsError(true);
                setMessage(error.response?.data?.error || "Failed to update user.");
            });
    };

    return (
        <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
            <div className="mx-auto flex max-w-2xl items-center justify-center">
                <form className="w-full rounded-2xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/80" onSubmit={handleSubmit}>
                    <div className="mb-6 text-left">
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">User Profile</p>
                        <h2 className="mt-2 text-3xl font-semibold text-slate-800">Update User</h2>
                        <p className="mt-2 text-sm text-slate-500">Edit the user information below.</p>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label htmlFor="name" className="mb-1 block text-sm text-left font-medium text-slate-700">Name</label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} id="name" className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200" placeholder="Enter full name" />
                        </div>

                        <div>
                            <label htmlFor="email" className="mb-1 block text-sm text-left font-medium text-slate-700">Email</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} id="email" className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200" placeholder="Enter email address" />
                        </div>

                        <div>
                            <label htmlFor="age" className="mb-1 block text-sm text-left font-medium text-slate-700">Age</label>
                            <input type="number" value={age} onChange={(e) => setAge(e.target.value)} id="age" className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200" placeholder="Enter age" />
                        </div>
                    </div>

                    {message ? <p className={`mt-4 text-sm ${isError ? "text-red-600" : "text-green-600"}`}>{message}</p> : null}

                    <button type="submit" className="mt-6 w-full rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700">Update User</button>
                </form>
            </div>
        </div>
    );
}

export default UpdateUser;