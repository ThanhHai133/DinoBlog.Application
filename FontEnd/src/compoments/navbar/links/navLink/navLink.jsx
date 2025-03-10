"use client";

import styles from './navLink.module.css'
import Link from "next/link";
import { usePathname } from  "next/navigation"
const Navlink = ({item}) => {
    const pathName = usePathname() ;
    return (
        <Link href={item.path} className={`${styles.custom_container} ${pathName === item.path && styles.active
        }`}
              >
            {item.title}</Link>
    );
};

export default Navlink;