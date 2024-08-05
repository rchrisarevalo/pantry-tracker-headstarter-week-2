"use client";
import React, { useEffect, useState } from "react";
import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import {
  useCreateUserWithEmailAndPassword,
  useAuthState,
} from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import Nav from "../components/Nav";
import { useRouter } from "next/navigation";
import { CircularProgress } from "@mui/joy";
import Footer from "../components/Footer";
import ReactGA from 'react-ga4';

type SignUpForm = {
  email: string;
  password: string;
};

const SignUp = () => {
  const [form, setForm] = useState<SignUpForm>({
    email: "",
    password: "",
  });
  const [createUser, user, creating_loading, creating_error] = useCreateUserWithEmailAndPassword(auth);
  const [authenticated, loading, loading_error] = useAuthState(auth);
  const [submitted, setSubmitted] = useState<boolean>(false)

  useEffect(() => {
    ReactGA.send({hitType: 'pageview', page: '/signup', title: 'Sign Up Page'})
  }, [])

  const router = useRouter();

  const handleForm = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSubmitted(true)
    const res = await createUser(form.email, form.password);
    
    if (res) {
      setTimeout(() => {
        router.push("/pantry")
      }, 3000)
    } else {
      throw new Error("Failed to create account. Please try again.")
    }
  };

  return (
    <>
      {!loading ? (
        !loading_error ? (
          !authenticated ? (
            <Box
              display={"flex"}
              width={"100%"}
              height={"100vh"}
              flexDirection={"column"}
              justifyContent={"center"}
              alignItems={"center"}
              className="bg-gradient-to-r from-stone-500 text-white to-amber-200"
            >
              <Nav />
              <Typography
                variant="h2"
                fontFamily={"sans-serif"}
                fontWeight={"700"}
              >
                <p className="font-sans">Sign Up</p>
              </Typography>
              <br></br>
              <i className="font-light text-center text-1xl max-sm:mr-10 max-sm:ml-10">
                Create an account by providing your email address and
                password.
              </i>
              <form className="pt-5 p-10 mt-5" onSubmit={handleSignUp}>
                <TextField
                  sx={{
                    input: {
                      backgroundColor: "white",
                      borderRadius: 1,
                    },
                  }}
                  className="min-w-96 max-sm:min-w-80"
                  type="email"
                  placeholder="Email"
                  name="email"
                  onChange={handleForm}
                  required
                ></TextField>
                <br></br>
                <br></br>
                <TextField
                  sx={{
                    input: {
                      backgroundColor: "white",
                      borderRadius: 1
                    },
                  }}
                  className="min-w-96 max-sm:min-w-80"
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
                    className="bg-black rounded-3xl mt-6 pl-10 pr-10 pt-3 pb-3 font-sans"
                  >
                    Sign Up
                  </Button>
                </Box>
              </form>
              {!submitted ?
                <></>
                :
                !creating_loading ?
                  !creating_error ?
                    <Alert severity="success">Successfully created account! Logging in...</Alert>
                    :
                    <Alert severity="error">Error creating account. Please try again.</Alert>
                  :
                  <CircularProgress variant="solid" />
              }
              <Box
                position={'fixed'}
                bottom={0}
                width={'100%'}
              >
                <Footer />
              </Box>
            </Box>
          ) : (
            router.push("/pantry")
          )
        ) : (
          router.push("/pantry")
        )
      ) : (
        <Box
          display={"flex"}
          width={"100%"}
          height={"100vh"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          className="bg-gradient-to-r from-stone-500 text-white to-amber-200"
        >
          <CircularProgress variant="solid" sx={{color: 'white'}} />
        </Box>
      )}
    </>
  );
};

export default SignUp;
