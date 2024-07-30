import React from "react";

const Nav = () => {
    return (
        <nav className="grid grid-cols-2 fixed top-0 w-full items-center justify-center bg-slate-400">
            <ul className="flex flex-row space-x-6">
                <li className="p-4 pr-5 pl-5">Home</li>
                <li className="p-4 pr-5 pl-5">About</li>
                <li className="p-4 pr-5 pl-5">FAQ</li>
            </ul>
            <ul className="flex flex-row justify-end space-x-6">
                <li className="p-4 pr-5 pl-5">Home</li>
                <li className="p-4 pr-5 pl-5">About</li>
                <li className="p-4 pr-5 pl-5">FAQ</li>
            </ul>
        </nav>
    )
}

export default Nav;