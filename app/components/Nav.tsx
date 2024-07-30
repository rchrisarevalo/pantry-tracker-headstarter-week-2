import Link from "next/link";
import React from "react";

const Nav = () => {
    return (
        <nav className="grid grid-cols-2 fixed top-0 w-full pt-3 pb-3 text-black">
            <ul className="flex flex-row justify-start space-x-6">
            </ul>
            <ul className="flex flex-row justify-end space-x-6">
                <li className="p-4 pr-5 pl-5"><Link href="/login">Sign In</Link></li>
                <li className="p-4 pr-5 pl-5"><Link href="/signup">Sign Up</Link></li>
            </ul>
        </nav>
    )
}

export default Nav;