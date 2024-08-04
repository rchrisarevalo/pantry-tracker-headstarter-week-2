import Link from "next/link";
import React from "react";

import { auth } from "@/firebase";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

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
              <Typography variant="h5" fontFamily={"sans-serif"}>
                <Link href="/">FoodPantryInventory</Link>
              </Typography>
            </li>
          </ul>
          <ul className="flex flex-row items-center justify-center space-x-6">
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
              <Typography variant="h5" fontFamily={"sans-serif"}>
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
