import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from "@/compoments/navbar/Navbar";
import React from "react";
import Footer from "@/compoments/footer/Footer";
import 'bootstrap/dist/css/bootstrap.min.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Tuturial',
  description: 'Next.js starter app',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <body className={inter.className}>
        {/* <ClientSideProviderTest> */}
        <div className="custom_container">
            <Navbar />
                {children}
            <Footer />
        </div>
        {/* </ClientSideProviderTest> */}
        </body>
        </html>
    );
}