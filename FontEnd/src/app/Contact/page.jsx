import styles from './contact.module.css'
import Image from 'next/image';
const ContactPage = () => {
    return (
        <div className={styles.container}>
            <div className={styles.imgContainer}>
                    <Image src="/contact.png" alt="" fill className={styles.img} />
            </div>
            <div className={styles.formContainer}>
            <form className={styles.form}>
                <input type="text" placeholder="Name and surname"/>
                <input type="text" placeholder="Email Address"/>
                <input type="text" placeholder="Phone Number(optional)"/>
                <textarea name="" id="" cols="30" rows="10" placeholder="Message"/>
                <button type="submit">Send</button>
            </form>
            </div>
        </div>
    );
};

export default ContactPage;
