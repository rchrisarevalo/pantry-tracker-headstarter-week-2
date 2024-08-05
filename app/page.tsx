"use client";
import React, { useEffect } from "react";
import { Box, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import Nav from "./components/Nav";
import apple from "./images/apple.jpg";
import orange from "./images/orange.jpg";
import banana from "./images/banana.jpg";
import pantry_sample from "./images/pantry-sample.jpg";
import Image from "next/image";
import Footer from "./components/Footer";
import ReactGA from 'react-ga4';

const Home = () => {

  const router = useRouter()

  useEffect(() => {
    ReactGA.send({hitType: 'pageview', page: '/', title: 'Home Page'})
  }, [])

  return (
    <>
      <Nav />
      <Box
        display={"flex"}
        width={"100%"}
        height={"100vh"}
        marginTop={"7.5vh"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        className="bg-gradient-to-r from-stone-500 text-white to-amber-200"
      >
        <div className="grid grid-cols-2 items-center text-center ml-10 mr-10">
          <div className="space-y-5">
            <h1 className="font-sans text-6xl ml-4 mr-4 font-bold">
              FoodPantryInventory
            </h1>
            <h4 className="font-sans text-3xl ml-8 mr-8">
              Wanting to manage your pantry inventory in addition to knowing
              what recipes you want for breakfast, lunch, or dinner?
            </h4>
            <h4 className="font-sans text-lg ml-8 mr-8 font-light">
              <p>
                Look no further than <b>FoodPantryInventory</b>, a website which
                helps you track the amount of items in your pantry, with recipes
                being automatically suggested based on the same items currently
                stored in it!
              </p>
            </h4>
            <h4 className="font-sans text-lg ml-8 mr-8 space-y-10 font-light">
              <p>Create an account or sign in to get started today!</p>
              <div className="grid grid-cols-2 grid-rows-1 place-items-center text-center">
                <Button
                  className="bg-black rounded-3xl pl-14 pr-14 pt-4 pb-4 font-sans"
                  variant="contained"
                  onClick={() => router.push("/signup")}
                >
                  Sign Up
                </Button>
                <Button
                  className="bg-black rounded-3xl pl-14 pr-14 pt-4 pb-4 font-sans"
                  variant="contained"
                  onClick={() => router.push("/login")}
                >
                  Sign In
                </Button>
              </div>
            </h4>
          </div>
          <div className="grid grid-cols-2 place-items-center text-center">
            <Image
              src={apple}
              alt="fruit-1"
              height={100}
              width={300}
              objectFit="contain"
              style={{
                borderRadius: "20px",
                marginBottom: "20px",
                marginTop: "20px",
              }}
            ></Image>
            <Image
              src={orange}
              alt="fruit-2"
              height={100}
              width={300}
              objectFit="cover"
              style={{ borderRadius: "20px" }}
            ></Image>
            <Image
              src={banana}
              alt="fruit-3"
              height={100}
              width={300}
              objectFit="cover"
              style={{ borderRadius: "20px" }}
            ></Image>
            <Image
              src={pantry_sample}
              alt="pantry-sample"
              height={100}
              width={300}
              objectFit="cover"
              style={{ borderRadius: "20px" }}
            ></Image>
          </div>
        </div>
      </Box>
      <Footer />
    </>
  );
};

export default Home;