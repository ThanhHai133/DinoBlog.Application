import Link from 'next/link';
import Links from "@/compoments/navbar/links/Links";
import style from "./navbar.module.css"
const Navbar = () => {
    return (
        <div className={style.custom_container}>
           <Link href="/" className={style.logo}>Dino Blogs</Link>
            <div>
              <Links/>
            </div>
        </div>
    );
};

export default Navbar;