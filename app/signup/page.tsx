"use client";
import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { auth } from '../../firebase'
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
  const [createUser] = useCreateUserWithEmailAndPassword(auth)
  const [error, setError] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")

  const handleForm = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({...form, [e.target.name]: e.target.value})
  }

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setError(false)

    try {
      const res = await createUser(form.email, form.password)
    } catch {
      setError(true)
      setErrorMsg("Failed to register user. The account may exist or the email may be invalid. Please try again.")
      console.error("Failed to create a user.")
    }
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
      <form className="pt-5 p-10 mt-5" onSubmit={handleSignUp}>
        <TextField
          type="text"
          placeholder="First Name"
          name="f_name"
          onChange={handleForm}
          required
        ></TextField>
        <br></br>
        <br></br>
        <TextField
          type="text"
          placeholder="Last Name"
          name="l_name"
          onChange={handleForm}
          required
        ></TextField>
        <br></br>
        <br></br>
        <TextField
          type="email"
          placeholder="Email"
          name="email"
          onChange={handleForm}
          required
        ></TextField>
        <br></br>
        <br></br>
        <TextField
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleForm}
          required
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
            type="submit"
            className="bg-black rounded-3xl mt-6 pl-7 pr-7 pt-3 pb-3 font-sans"
          >
            Sign Up
          </Button>
        </Box>
      </form>
    </Box>
  );
};


export default SignUp;