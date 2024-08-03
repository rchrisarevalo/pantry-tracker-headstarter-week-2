import Link from "next/link";
import React from "react";

const Nav = () => {
    return (
        <nav className="flex fixed top-0 justify-end w-full pt-3 pb-3 text-black">
            <ul className="flex flex-row justify-center space-x-6">
                <li className="p-4"><Link href="/">Home</Link></li>
                <li className="p-4"><Link href="/login">Sign In</Link></li>
                <li className="p-4"><Link href="/signup">Sign Up</Link></li>
            </ul>
        </nav>
    )
}

export default Nav;