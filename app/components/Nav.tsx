import Link from "next/link";
import React from "react";

const Nav = () => {
    return (
        <nav className="flex justify-center w-full pt-3 pb-3 text-black">
            <ul className="flex flex-row justify-center space-x-6">
                <li className="p-4 pr-5 pl-5">Add Item</li>
                <li className="p-4 pr-5 pl-5">View Items</li>
                <li className="p-4 pr-5 pl-5">Update Item</li>
                <li className="p-4 pr-5 pl-5">Remove Item</li>
            </ul>
        </nav>
    )
}

export default Nav;