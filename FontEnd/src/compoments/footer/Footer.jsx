import styles from './footer.module.css';
const Footer = () => {
    return (
        <div className={styles.container}>
            <div className={styles.logo}>@Zenith, @Keith </div>
            <div className={styles.text}>Have nice Day Guys</div>
        </div>
    );
};

export default Footer;