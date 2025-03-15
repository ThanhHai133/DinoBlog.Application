import styles from './postCard.module.css'
import Image from 'next/image'
import Link from 'next/link'
const page = ({post}) => {
    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <div className={styles.imgContainer}>
                    <Image src= {post.img} alt="" fill className={styles.img} />
                </div>
                <span className={styles.date}>01.01.2025</span>
            </div>
            <div className={styles.bottom}>
                <h1 className={styles.title}>{post.title}</h1>
                <p className={styles.decs}>{post.body}aaaa</p>
                <Link className={styles.link} href={`/Blog/${post.slug}`}>READ MORE</Link>
            </div>
        </div>
    );
};

export default page;