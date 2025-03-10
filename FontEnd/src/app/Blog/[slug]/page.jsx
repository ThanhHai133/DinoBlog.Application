import styles from './singlePost.module.css'
import Image from 'next/image'
// import PostUser from "@/compoments/postUser/postUser";
import { getPost } from "@/lib/data";
import {Suspense} from "react";
import PostUser from "@/compoments/postUser/postUser";

const getData = async (slug) => {
    const res = await fetch(`http://localhost:3000/api/blog/${slug}`);

    if (!res.ok) {
        throw new Error("Something went wrong");
    }

    return res.json();
};


const SinglePostPage = async ({params}) => {
    const {slug} = params;
    // const post = await getPost(slug);
    const post = await getData(slug);
    console.log(post);
console.log("user id blog "+ post.userId);

    if (!post) {
        return <div>Post not found</div>; // Trả về thông báo nếu không tìm thấy bài viết
    }

    return (
        <div className={styles.container}>
            {/*{post.img && (*/}
                <div className={styles.imgContainer}>
                    <Image
                        src={post.img}
                        alt=""
                        fill
                        className={styles.img}
                    />
                </div>
            {/*)}*/}
            <div className={styles.textContainer}>
                <h1 className={styles.title}>{post.title}</h1>
                <div className={styles.detail}>

                    {post && (
                        <Suspense fallback={<div>Loading...</div>}>
                            <PostUser userId={post.userId} />
                        </Suspense>
                    )}
                    <div className={styles.detailText}>
                        <span className={styles.detailTitle}>Published</span>
                        <span className={styles.detailValue}>
                      {post.createdAt.toString().slice(0,10)}
                    </span>

                    </div>
                </div>
                <div className={styles.content}>
                    {post.desc}
                </div>
            </div>
        </div>
    );
};

export default SinglePostPage;