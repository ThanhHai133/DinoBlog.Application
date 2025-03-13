"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

export default function LoginForm() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const onSubmit = async (data) => {
        setLoading(true);
        setErrorMessage("");
        setSuccessMessage("");

        try {
            const response = await fetch("http://127.0.0.1:8000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(data),
            });

            console.log("Status Code:", response.status);
            console.log("Headers:", response.headers);

            const result = await response.json(); // Chắc chắn response là JSON
            console.log("Response Data:", result);

            if (!response.ok) throw new Error(result.message || "Đăng nhập thất bại");

            localStorage.setItem("token", result.token);
            setSuccessMessage("Đăng nhập thành công!");
        } catch (error) {
            console.error("Lỗi:", error);
            setErrorMessage(error.message);
        }

        setLoading(false);
    };

    return (
        <div className="d-flex vh-50 align-items-center justify-content-center">
            {/* Khung chứa ảnh và form */}
            <div className="d-flex shadow-lg rounded-4 overflow-hidden"
                 style={{ width: '800px', background: 'white' }}>

                {/* Ảnh động Login */}
                <div className="d-flex align-items-center justify-content-center p-4"
                     style={{ width: '50%', background: '#f8f9fa' }}>
                    <img
                        src="/Login.jpg"
                        alt="Login Animation"
                        className="img-fluid"
                        style={{ maxWidth: '100%', height: 'auto', objectFit: 'contain' }}
                    />
                </div>

                {/* Form Đăng Nhập */}
                <div className="p-4" style={{ width: '50%' }}>
                    <h3 className="text-center text-primary mb-4">Đăng Nhập</h3>
                    {errorMessage && <div className="alert alert-danger text-center">{errorMessage}</div>}
                    {successMessage && <div className="alert alert-success text-center">{successMessage}</div>}

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Email</label>
                            <input
                                type="email"
                                className="form-control rounded-pill px-3 py-2 border-primary"
                                {...register("email", { required: "Vui lòng nhập email" })}
                            />
                            {errors.email && <p className="text-danger">{errors.email.message}</p>}
                        </div>

                        <div className="mb-3">
                            <label className="form-label fw-bold">Mật khẩu</label>
                            <input
                                type="password"
                                className="form-control rounded-pill px-3 py-2 border-primary"
                                {...register("password", { required: "Vui lòng nhập mật khẩu" })}
                            />
                            {errors.password && <p className="text-danger">{errors.password.message}</p>}
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-100 rounded-pill py-2 fw-bold"
                            disabled={loading}
                        >
                            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                        </button>
                    </form>

                    <p className="text-center mt-3 text-muted">
                        Chưa có tài khoản? <a href="#" className="text-primary">Đăng ký ngay</a>
                    </p>
                </div>

            </div>
        </div>
    );
}
