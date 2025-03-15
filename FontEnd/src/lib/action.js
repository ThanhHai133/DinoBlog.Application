"use server";

import { connectToDb } from "@/lib/utils";
import { Post } from "@/lib/models";
import { revalidatePath } from "next/cache";
import { signIn, signOut } from "./auth";

export const addPost = async (formData) => {
    // Lấy dữ liệu từ formData
    const { title, desc, slug, userId } = Object.fromEntries(formData);

    try {
        // Kết nối đến cơ sở dữ liệu
        await connectToDb();
        const newPost = new Post({
            title,
            desc,
            slug,
            userId,
        });

        await newPost.save();
        console.log("saved to db");

        // Revalidate các đường dẫn sau khi thêm bài viết
        revalidatePath("/blog");
    } catch (err) {
        console.log(err);
        return { error: "Something went wrong!" };
    }
};

export const deletePost = async (formData) => {
    const { id } = Object.fromEntries(formData);

    try {
        connectToDb();

        await Post.findByIdAndDelete(id);
        console.log("deleted from db");
        revalidatePath("/blog");
        revalidatePath("/admin");
    } catch (err) {
        console.log(err);
        return { error: "Something went wrong!" };
    }
};

export const handleGithubLogin = async () => {
    try {
        await signIn("github");
    } catch (error) {
        console.error("Login error:", error);
    }
};
