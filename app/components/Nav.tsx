import Link from "next/link";
import React from "react";

import { auth } from "@/firebase";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { Button } from "@mui/material";
import { Route } from "@mui/icons-material";
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
    <nav className="flex fixed top-0 justify-end w-full pt-3 pb-3 text-black">
      {!authenticated ? (
        <ul className="flex flex-row justify-center space-x-6">
          <li className="p-4">
            <Link href="/login">Sign In</Link>
          </li>
          <li className="p-4">
            <Link href="/signup">Sign Up</Link>
          </li>
        </ul>
      ) : (
        <ul className="flex flex-row justify-center space-x-6">
          <li className="p-4">
            <Button variant="text" className="font-sans text-black">
              Settings
            </Button>
          </li>
          <li className="p-4">
            <Button
              variant="text"
              className="font-sans text-black"
              onClick={handleLogOut}
            >
              Log Out
            </Button>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Nav;
