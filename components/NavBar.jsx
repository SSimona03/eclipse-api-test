import React from "react"
import '../app/globals.css'
import Image from "next/image"

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="nav-container">

                <Image
                    className="pl-5"
                    src="/logo-lg.svg"
                    width={100}
                    height={100}
                    alt="Website Logo"
                />
                <div className="menu mt-3">
                    <div className="menu-mobile text-right"><i className=" fa-solid fa-bars fa-lg"></i></div>
                    <ul className="menu-items text-right">
                        <li>TVs</li>
                        <li>Appliances</li>
                        <li>Computers</li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;