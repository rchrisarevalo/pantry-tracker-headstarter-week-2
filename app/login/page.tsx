"use client";
import { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import Nav from "../components/Nav";
import Link from "next/link";

type LoginForm = {
  email: string;
  password: string;
};

const Login = () => {
  const [login, setLogin] = useState<LoginForm>({
    email: "",
    password: "",
  });

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
        Sign In
      </Typography>
      <form className="pt-5 p-10 mt-5">
        <TextField type="email" placeholder="Email" onChange={(e) => setLogin({...login, email: e.target.value})}></TextField>
        <br></br>
        <br></br>
        <TextField type="password" placeholder="Password" onChange={(e) => setLogin({...login, password: e.target.value})}></TextField>
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
            Sign In
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Login;
