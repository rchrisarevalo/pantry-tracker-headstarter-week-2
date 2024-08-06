import Link from "next/link";
import React from "react";

import { auth } from "@/firebase";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

import DensityMediumOutlinedIcon from "@mui/icons-material/DensityMediumOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import navToggle from "../functions/nav_toggle";

const Nav = () => {
  const [authenticated] = useAuthState(auth);
  const [signOut, loading, error] = useSignOut(auth);

  const router = useRouter();

  const handleLogOut = async () => {
    const res = await signOut();

    if (res) {
      router.push("/login");
    } else {
      throw new Error("Failed to sign out.");
    }
  };

  return (
    <nav className="z-10 flex fixed top-0 justify-between w-full pt-3 pb-3 bg-black text-white">
      {!authenticated ? (
        <>
          <ul className="flex flex-row justify-center space-x-6">
            <li className="p-4">
              <Typography variant="h5" className="font-sans font-semibold">
                <Link href="/">FoodPantryInventory</Link>
              </Typography>
            </li>
          </ul>
          <ul className="max-sm:hidden flex flex-row items-center justify-center space-x-6">
            <li className="p-4">
              <Button
                variant="text"
                className="font-sans text-white"
                onClick={() => router.push("/")}
              >
                Home
              </Button>
            </li>
            <li className="p-4">
              <Button
                variant="text"
                className="font-sans text-white"
                onClick={() => router.push("/login")}
              >
                Sign In
              </Button>
            </li>
            <li className="p-4">
              <Button
                variant="text"
                className="font-sans text-white"
                onClick={() => router.push("/signup")}
              >
                Sign Up
              </Button>
            </li>
          </ul>
          <ul className="hidden max-md:flex flex-row items-center justify-center space-x-6">
            <li>
              <Button
                variant="contained"
                className="bg-transparent pt-4 pb-4 mr-1"
                onClick={navToggle}
              >
                <DensityMediumOutlinedIcon />
              </Button>
            </li>
          </ul>
          <ul
            id="mobile-nav"
            className="hidden fixed max-md:flex flex-col min-h-screen left-full min-w-full bg-black items-center justify-evenly gap-2"
          >
            <li className="p-1 mt-3 absolute top-0 right-0">
              <Button
                variant="contained"
                onClick={navToggle}
                className="bg-transparent pt-4 pb-4"
              >
                <CloseOutlinedIcon />
              </Button>
            </li>
            <li className="p-4">
              <Button
                variant="text"
                className="font-sans text-white"
                onClick={() => router.push("/")}
              >
                Home
              </Button>
            </li>
            <li className="p-4">
              <Button
                variant="text"
                className="font-sans text-white"
                onClick={() => router.push("/login")}
              >
                Sign In
              </Button>
            </li>
            <li className="p-4">
              <Button
                variant="text"
                className="font-sans text-white"
                onClick={() => router.push("/signup")}
              >
                Sign Up
              </Button>
            </li>
          </ul>
        </>
      ) : (
        <>
          <ul className="flex flex-row justify-center space-x-6">
            <li className="p-4">
              <Typography variant="h5" className="font-sans">
                <Link href="/pantry">FoodPantryInventory</Link>
              </Typography>
            </li>
          </ul>
          <ul className="flex flex-row justify-center space-x-6">
            {/* <li className="p-4">
              <Button variant="text" className="font-sans text-white">
                Settings
              </Button>
            </li> */}
            <li className="p-4">
              <Button
                variant="text"
                className="font-sans text-white"
                onClick={handleLogOut}
              >
                Log Out
              </Button>
            </li>
          </ul>
        </>
      )}
    </nav>
  );
};

export default Nav;
