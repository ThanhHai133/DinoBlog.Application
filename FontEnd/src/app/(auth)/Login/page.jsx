"use client";
import { signIn } from "next-auth/react";

 const AuthButtom = () => {
    return (
        <main className="flex items-center justify-center h-screen">
            <button
                onClick={() => signIn()}
                className="px-6 py-3 text-white bg-black rounded-lg"
            >
                Đăng nhập với GitHub
            </button>
        </main>
    );
}
export default AuthButtom;

