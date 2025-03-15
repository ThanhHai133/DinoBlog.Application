"use client";

import Link from 'next/link';
import style from './links.module.css'
import Image from 'next/image';
import Navlink from "@/compoments/navbar/links/navLink/navLink";
import {useState} from "react";

    const links = [
        {
        title: "Homepage",
        path: "/",
    },
        {
            title: "Contact",
            path: "/Contact",
        },
        {
            title: "About",
            path: "/about",
        },
        {
            title: "Blog",
            path: "/Blog",
        }]
const Links = () => {
        const [open, setOpen] = useState(false)

    const session = true;
    const isAdmin = true;
    return (
        <div className={style.custom_container}>
            <div className={style.links}>
                {links.map((link) => (
                    <Navlink item={link} key={link.title}/>
                ))}

                {session ? (<>
                        {isAdmin && <Navlink item={{title: "Admin", path: "/admin"}}/>}
                        <button className={style.logout}>Logout</button>
                    </>
                ) : (
                    <Navlink item={{title: "Login", path: "/Login"}}/>
                )}
            </div>
            <Image className={style.menuButton} src="/menu.png" alt="Menu" width={30} height={30}
                   onClick={() => setOpen((prev) => !prev)}
                />

            {
                open && (
                    <div className={style.mobileLinks}>
                        {links.map((link) => (
                            <Navlink item={link} key={link.title}/>
                        ))}
                    </div>
                )
            }
        </div>
    );
};

export default Links;