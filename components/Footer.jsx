import React from "react"
import '../app/globals.css'
import Image from "next/image"

const Footer = () => {
    return (
        <footer className="">
            <div className="footer-menu">
                <a href="#">About us</a>
                <a href="#">FAQ</a>
                <a href="#">Contact</a>
            </div>
            <div className=" mt-5 text-left text-xs md:pt-8 md:text-center">Copyright © 2009-2023 LG Electronics. All Rights Reserved</div>
        </footer>
    )
}

export default Footer;