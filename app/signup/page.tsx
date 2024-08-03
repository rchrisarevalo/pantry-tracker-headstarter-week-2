"use client";
import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import Nav from "../components/Nav";
import Link from "next/link";

type SignUpForm = {
  f_name: string;
  l_name: string;
  email: string;
  password: string;
};

const SignUp = () => {
  const [form, setForm] = useState<SignUpForm>({
    f_name: "",
    l_name: "",
    email: "",
    password: "",
  });

  const handleForm = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({...form, [e.target.name]: e.target.value})
  }

  return (
    <Box
      display={"flex"}
      width={"100%"}
      height={"100vh"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Nav />
      <Typography variant="h2" fontFamily={"sans-serif"} fontWeight={"500"}>
        Sign Up
      </Typography>
      <form className="pt-5 p-10 mt-5">
        <TextField
          type="text"
          placeholder="First Name"
          name="f_name"
          onChange={handleForm}
        ></TextField>
        <br></br>
        <br></br>
        <TextField
          type="text"
          placeholder="Last Name"
          name="l_name"
          onChange={handleForm}
        ></TextField>
        <br></br>
        <br></br>
        <TextField
          type="email"
          placeholder="Email"
          name="email"
          onChange={handleForm}
        ></TextField>
        <br></br>
        <br></br>
        <TextField
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleForm}
        ></TextField>
        <br></br>
        <br></br>
        <Box
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"center"}
          alignItems={"center"}
          width={"100%"}
        >
          <Button
            variant="contained"
            className="bg-black rounded-3xl mt-6 pl-7 pr-7 pt-3 pb-3 font-sans"
          >
            <Link href="/signup">Sign Up</Link>
          </Button>
        </Box>
      </form>
    </Box>
  );
};


export default SignUp;