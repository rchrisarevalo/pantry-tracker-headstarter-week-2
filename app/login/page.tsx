"use client";
import { useEffect, useState } from "react";
import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import { auth } from "@/firebase";
import {
  useSignInWithEmailAndPassword,
  useAuthState,
} from "react-firebase-hooks/auth";
import Nav from "../components/Nav";
import { useRouter } from "next/navigation";
import { CircularProgress } from "@mui/joy";
import Link from "next/link";
import Footer from "../components/Footer";
import ReactGA from 'react-ga4';

type LoginForm = {
  email: string;
  password: string;
};

const Login = () => {
  const [login, setLogin] = useState<LoginForm>({
    email: "",
    password: "",
  });
  const [signIn, user, sign_in_loading, sign_in_error] =
    useSignInWithEmailAndPassword(auth);
  const [authenticated, loading, loading_error] = useAuthState(auth);
  const [submitted, setSubmitted] = useState<boolean>(false);

  useEffect(() => {
    ReactGA.send({hitType: 'pageview', page: '/login', title: 'Sign In Page'})
  }, [])

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSubmitted(true);

    const res = await signIn(login.email, login.password);

    if (res) {
      setTimeout(() => {
        router.push("/pantry");
      }, 3000);
    } else {
      throw new Error("Invalid username and/or password. Please try again.");
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
                <p className="font-sans">Sign In</p>
              </Typography>
              <br></br>
              <i className="font-light text-center text-1xl max-sm:mr-10 max-sm:ml-10">
                Sign in with your credentials to access your pantry.
              </i>
              <form className="pt-5 p-5 mt-5" onSubmit={handleLogin}>
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
                  required
                  onChange={(e) =>
                    setLogin({ ...login, email: e.target.value })
                  }
                ></TextField>
                <br></br>
                <br></br>
                <TextField
                  sx={{
                    input: {
                      backgroundColor: "white",
                      borderRadius: 1,
                    },
                  }}
                  className="min-w-96 max-sm:min-w-80"
                  type="password"
                  placeholder="Password"
                  required
                  onChange={(e) =>
                    setLogin({ ...login, password: e.target.value })
                  }
                ></TextField>
                <br></br>
                <br></br>
                <Box
                  display={"flex"}
                  flexDirection={"row"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  width={"100%"}
                >
                  <Button
                    variant="contained"
                    type="submit"
                    className="bg-black rounded-3xl mt-6 pl-10 pr-10 pt-3 pb-3 font-sans"
                  >
                    Sign In
                  </Button>
                  <Button
                    variant="contained"
                    type="submit"
                    className="bg-black rounded-3xl mt-6 pl-10 pr-10 pt-3 pb-3 font-sans"
                  >
                    <Link href="/signup">Sign Up</Link>
                  </Button>
                </Box>
              </form>
              {!submitted ? (
                <></>
              ) : !sign_in_loading ? (
                !sign_in_error ? (
                  <Alert severity="success">Success! Logging in...</Alert>
                ) : (
                  <Alert severity="error">
                    Invalid username and/or password. Please try again.
                  </Alert>
                )
              ) : (
                <CircularProgress variant="solid" />
              )}
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
          <CircularProgress variant="solid" />
        </Box>
      )}
    </>
  );
};

export default Login;
