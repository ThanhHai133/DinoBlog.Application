import Image from "next/image";
import styles from "./home.module.css";

const Home = () => {
    return (
        <div className={styles.container}>
            <div className={styles.textContainer}>
                <h1 className={styles.title}>Welcome To Dino Blog.</h1>
                <p className={styles.desc}>
                    Here, you can ask questions and view articles about solutions or algorithms.
                </p>
                <div className={styles.buttons}>
                    <button className={styles.button}>Learn More</button>
                    <button className={styles.button}>Contact</button>
                </div>
                <div className={styles.brands}>
                    <Image src="/brands.png" alt="" fill className={styles.brandImg}/>
                </div>
            </div>
            <div className={styles.imgContainer}>
                <Image src="/hero.gif" alt="" fill className={styles.heroImg}/>
            </div>
        </div>
    );
};

export default Home;