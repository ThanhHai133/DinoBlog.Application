"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

export default function LoginForm() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const router = useRouter();

    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        console.log("All cookies:", document.cookie); // Debug
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(";").shift();
        return null;
    };

    const onSubmit = async (data) => {
        setLoading(true);
        setErrorMessage("");
        setSuccessMessage("");

        try {
            // Lấy CSRF cookie
            const csrfResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/sanctum/csrf-cookie`, {
                method: "GET",
                credentials: "include",
            });

            if (!csrfResponse.ok) {
                throw new Error("Không thể lấy CSRF cookie từ server");
            }

            // Chờ để đảm bảo cookie được thiết lập
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Debug response headers
            console.log("CSRF Response Headers:", [...csrfResponse.headers.entries()]);

            // Lấy XSRF-TOKEN
            const xsrfToken = getCookie("XSRF-TOKEN");
            console.log("XSRF-TOKEN:", xsrfToken);
            if (!xsrfToken) {
                throw new Error("Không tìm thấy XSRF-TOKEN trong cookie");
            }

            // Gọi API đăng nhập
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "X-XSRF-TOKEN": decodeURIComponent(xsrfToken),
                },
                credentials: "include",
                body: JSON.stringify(data),
            });

            const contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                throw new Error("Server trả về dữ liệu không hợp lệ");
            }

            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.message || "Đăng nhập thất bại");
            }

            localStorage.setItem("token", result.token);
            setSuccessMessage("Đăng nhập thành công!");
            setTimeout(() => {
                router.push("/admin/user");
            }, 1000);
        } catch (error) {
            console.error("Lỗi:", error);
            setErrorMessage(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="d-flex vh-50 align-items-center justify-content-center">
            <div className="d-flex shadow-lg rounded-4 overflow-hidden" style={{ width: "800px", background: "white" }}>
                <div className="d-flex align-items-center justify-content-center p-4" style={{ width: "50%", background: "#f8f9fa" }}>
                    <img
                        src="/Login.jpg"
                        alt="Login Animation"
                        className="img-fluid"
                        style={{ maxWidth: "100%", height: "auto", objectFit: "contain" }}
                    />
                </div>
                <div className="p-4" style={{ width: "50%" }}>
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