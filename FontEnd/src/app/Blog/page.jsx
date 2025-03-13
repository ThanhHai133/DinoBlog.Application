"use client"; // Bắt buộc để dùng useEffect

import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";

const getData = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user`);


    if (!res.ok) {
        throw new Error("Failed to fetch users.");
    }
    return res.json();
};

const UserPage = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        getData()
            .then(setUsers)
            .catch((err) => {
                console.error(err);
                setError(err.message);
            });
    }, []);

    if (error) return <p className="text-danger">Lỗi: {error}</p>;
    if (users.length === 0) return <p>Loading...</p>;

    return (
        <div className="mt-4">
            <div className="row">
                <div className="mb-4 d-flex">
                    <div className="input-group rounded-pill border overflow-hidden" style={{ maxWidth: "300px" }}>
                        <input
                            type="text"
                            className="form-control border-0 shadow-none"
                            placeholder="Search..."
                            style={{ flex: "1", minWidth: "150px" }}
                        />
                        <button className="border-0 shadow-none">🔍</button>
                    </div>
                </div>
                <div className="mb-3">
                    <button className="btn btn-success">Create User</button>
                </div>
                {users.map((user) => (
                    <div className="col-md-3 mb-4" key={user.id}>
                        <div className="card h-100 bg-secondary text-white d-flex flex-column">
                            <div className="card-body flex-grow-1">
                                <h5 className="card-title">{user.name}</h5>
                                <p className="card-text">
                                    Email: {user.email}
                                    <br />
                                    Vai trò: {user.role_id === 1 ? "Admin" : "User"}
                                </p>
                            </div>
                            <div className="card-footer bg-transparent border-0">
                                <a href={`/user/${user.id}`} className="btn btn-light w-100">
                                    Xem Chi Tiết
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserPage;
