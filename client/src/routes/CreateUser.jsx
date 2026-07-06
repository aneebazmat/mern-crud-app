import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
    

function CreateUser() {
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [age, setAge] = React.useState("");
    const [message, setMessage] = React.useState("");
    const [isError, setIsError] = React.useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage("");
        setIsError(false);

        axios.post("http://localhost:5000/create-user", { name, email, age })
            .then((response) => {
                console.log("User created:", response.data);
                setMessage("User created successfully!");
                setTimeout(() => navigate("/"), 500);
            })
            .catch((error) => {
                console.error("Error creating user:", error);
                setIsError(true);
                setMessage(error.response?.data?.error || "Failed to create user. Please try again.");
            });
    };

    return (
        <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
            <form className="w-full rounded-2xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/80" onSubmit={handleSubmit}>
                <div className="mb-6 text-left">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">User Profile</p>
                    <h2 className="mt-2 text-3xl font-semibold text-slate-800">Create User</h2>
                    <p className="mt-2 text-sm text-slate-500">Fill in the user information below.</p>
                </div>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="name" className="mb-1 block text-sm text-left font-medium text-slate-700">Name</label>
                        <input 
                            type="text" 
                            id="name" 
                            className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200" 
                            placeholder="Enter full name" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="mb-1 block text-sm text-left font-medium text-slate-700">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200" 
                            placeholder="Enter email address" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="age" className="mb-1 block text-sm text-left font-medium text-slate-700">Age</label>
                        <input 
                            type="number" 
                            id="age" 
                            className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200" 
                            placeholder="Enter age" 
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                        />
                    </div>
                </div>
                {message ? (
                    <p className={`mt-4 text-sm ${isError ? "text-red-600" : "text-green-600"}`}>{message}</p>
                ) : null}

                <button type="submit" className="mt-6 w-full rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition pointer-cursor hover:bg-indigo-700">Create User</button>
            </form>
        </div>
    );
}

export default CreateUser;