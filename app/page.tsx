"use client";
import React, { useState, useEffect } from "react";
import { Box, Button, Card, Typography, Modal, TextField } from "@mui/material";
import { CircularProgress } from "@mui/joy";
import {
  removeFromPantry,
  retrieveFromPantry,
  updatePantry,
} from "./functions/crud";
import recipeSuggestions from "./functions/ai";
import { Form } from "./components/Form";
import Nav from "./components/Nav";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase";
import { useRouter } from "next/navigation";

export type PantryItem = {
  name: string;
  uid: string | undefined;
  count: number;
};

export default function Home() {
  const [pantryItems, setPantryItems] = useState<PantryItem[]>([]);
  const [filterPantryItems, setFilterPantryItems] = useState<PantryItem[]>([]);
  const [displayModal, setDisplayModal] = useState<boolean>(false);
  const [displayRecipeModal, setDisplayRecipeModal] = useState<boolean>(false);
  const [submissionType, setSubmissionType] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [recipes, setRecipes] = useState<string | null>("");

  // Keep track of the user's current authentication status.
  const [authenticated, loading, loading_error] = useAuthState(auth);

  const router = useRouter();

  // Filter function that will allow user to easily
  // search for items in the pantry based on the
  // current keyword's characters matching the exact 
  // same characters of the item name.
  //
  // If there is no keyword added to the search bar,
  // then it will retrieve the updated list of pantry
  // items once more from the database.
  useEffect(() => {
    if (searchTerm != "") {
      const filteredItems: PantryItem[] = pantryItems.filter(
        (item) =>
          item.name.substring(0, searchTerm.length).toLowerCase() ==
          searchTerm.substring(0, searchTerm.length).toLowerCase()
      );
      setFilterPantryItems(filteredItems);
    } else {
      retrieveFromPantry(setPantryItems, auth.currentUser?.uid);
    }
  }, [searchTerm, auth.currentUser?.uid]);

  return (
    <>
      {!loading ? (
        !loading_error ? (
          authenticated ? (
            <Box>
              <Nav />
              <div className="flex items-center justify-center font-sans space-x-16 mt-32 mb-16 min-h-screen text-black rounded-2xl p-5 ml-10 mr-10">
                <div className="flex flex-col justify-center text-center space-y-5">
                  <Typography
                    variant="h2"
                    fontFamily="sans-serif"
                    fontWeight="900"
                  >
                    My Pantry
                  </Typography>
                  <TextField
                    type="text"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border-2 p-2 md:ml-20 md:mr-20 mr-10 ml-10 font-sans"
                    placeholder="Filter items by search"
                  />
                  {pantryItems.length != 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-4 justify-between text-center">
                      {searchTerm.length == 0 ? (
                        <>
                          {pantryItems.map((item, i) => (
                            <Box
                              key={i}
                              paddingTop={3}
                              paddingBottom={3}
                              marginLeft={2}
                              marginRight={2}
                            >
                              <Card className="p-5">
                                <Typography variant="h5">
                                  {`${
                                    item.name[0].toUpperCase() +
                                    item.name.slice(1)
                                  }`}
                                </Typography>
                                <Typography variant="body1">
                                  {item.count}
                                </Typography>
                                <Button
                                  variant="contained"
                                  onClick={() => {
                                    removeFromPantry(
                                      setPantryItems,
                                      item.name,
                                      item.count,
                                      auth.currentUser?.uid
                                    );
                                  }}
                                  className="bg-black rounded-3xl mt-6 pl-4 pr-4 pt-3 pb-3 ml-3 mr-3 font-sans"
                                >
                                  <Typography
                                    variant="h5"
                                    fontFamily="sans-serif"
                                  >
                                    -
                                  </Typography>
                                </Button>
                                <Button
                                  variant="contained"
                                  onClick={() => {
                                    updatePantry(
                                      setPantryItems,
                                      item.name,
                                      auth.currentUser?.uid
                                    );
                                  }}
                                  className="bg-black rounded-3xl mt-6 pl-6 pr-6 pt-3 pb-3 ml-3 mr-3 font-sans"
                                >
                                  <Typography
                                    variant="h5"
                                    fontFamily="sans-serif"
                                  >
                                    +
                                  </Typography>
                                </Button>
                              </Card>
                            </Box>
                          ))}
                          <Box
                            paddingTop={3}
                            paddingBottom={3}
                            marginLeft={2}
                            marginRight={2}
                          >
                            <Card variant="outlined" className="p-5">
                              <Button
                                variant="contained"
                                className="bg-black rounded-3xl pl-14 pr-14 pt-4 pb-4 font-sans"
                                onClick={() => {
                                  setDisplayModal(true);
                                  setSubmissionType("add");
                                  setTitle("Add Item");
                                }}
                              >
                                <Typography variant="h1">+</Typography>
                              </Button>
                            </Card>
                          </Box>
                        </>
                      ) : (
                        <>
                          {filterPantryItems.map((item, i) => (
                            <Box
                              key={i}
                              paddingTop={3}
                              paddingBottom={3}
                              marginLeft={2}
                              marginRight={2}
                            >
                              <Card className="p-5">
                                <Typography variant="h5">
                                  {`${
                                    item.name[0].toUpperCase() +
                                    item.name.slice(1)
                                  }`}
                                </Typography>
                                <Typography variant="body1">
                                  {item.count}
                                </Typography>
                                <Button
                                  variant="contained"
                                  onClick={() => {
                                    removeFromPantry(
                                      setPantryItems,
                                      item.name,
                                      item.count,
                                      auth.currentUser?.uid
                                    );
                                  }}
                                  className="bg-black rounded-3xl mt-6 pl-4 pr-4 pt-3 pb-3 ml-3 mr-3 font-sans"
                                >
                                  <Typography
                                    variant="h5"
                                    fontFamily="sans-serif"
                                  >
                                    -
                                  </Typography>
                                </Button>
                                <Button
                                  variant="contained"
                                  onClick={() => {
                                    updatePantry(
                                      setFilterPantryItems,
                                      item.name,
                                      auth.currentUser?.uid
                                    );
                                  }}
                                  className="bg-black rounded-3xl mt-6 pl-6 pr-6 pt-3 pb-3 ml-3 mr-3 font-sans"
                                >
                                  <Typography
                                    variant="h5"
                                    fontFamily="sans-serif"
                                  >
                                    +
                                  </Typography>
                                </Button>
                              </Card>
                            </Box>
                          ))}
                          <Box
                            paddingTop={3}
                            paddingBottom={3}
                            marginLeft={2}
                            marginRight={2}
                          >
                            <Card variant="outlined" className="p-5">
                              <Button
                                variant="contained"
                                className="bg-black rounded-3xl pl-14 pr-14 pt-4 pb-4 font-sans"
                                onClick={() => {
                                  setDisplayModal(true);
                                  setSubmissionType("add");
                                  setTitle("Add Item");
                                }}
                              >
                                <Typography variant="h1">+</Typography>
                              </Button>
                            </Card>
                          </Box>
                        </>
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-row justify-center items-center space-y-20">
                      {searchTerm.length == 0 ? (
                        <Box
                          paddingTop={3}
                          paddingBottom={3}
                          marginLeft={2}
                          marginRight={2}
                        >
                          <Card variant="outlined" className="p-5">
                            <Button
                              variant="contained"
                              className="bg-black rounded-3xl pl-14 pr-14 pt-4 pb-4 font-sans"
                              onClick={() => {
                                setDisplayModal(true);
                                setSubmissionType("add");
                                setTitle("Add Item");
                              }}
                            >
                              <Typography variant="h1">+</Typography>
                            </Button>
                          </Card>
                        </Box>
                      ) : (
                        <p>There are no search results to be found.</p>
                      )}
                    </div>
                  )}
                  <div className="flex flex-col justify-center items-center space-y-5">
                    <Button
                      variant="contained"
                      className="bg-black rounded-3xl pl-14 pr-14 pt-4 pb-4 font-sans"
                      onClick={() => {
                        recipeSuggestions(pantryItems, setRecipes);
                        setDisplayRecipeModal(true);
                      }}
                    >
                      Generate Recipe Suggestions
                    </Button>
                  </div>
                  <Modal
                    open={displayModal}
                    onClose={() => setDisplayModal(false)}
                  >
                    <Form
                      setPantryItems={setPantryItems}
                      setDisplayModal={setDisplayModal}
                      title={title}
                      type={submissionType}
                      uid={auth.currentUser?.uid}
                    />
                  </Modal>
                  <Modal
                    open={displayRecipeModal}
                    onClose={() => setDisplayRecipeModal(false)}
                  >
                    <Box
                      fontFamily={"sans-serif"}
                      padding={5}
                      borderRadius={3}
                      bgcolor={"white"}
                      display={"flex"}
                      flexDirection={"column"}
                      justifyContent={"space-between"}
                      marginTop={4}
                      marginBottom={4}
                      marginLeft={"20%"}
                      marginRight={"20%"}
                      height={"90vh"}
                      overflow={"scroll"}
                    >
                      <div className="text-left space-y-2">
                        <Typography
                          variant="h4"
                          fontFamily={"sans-serif"}
                          fontWeight="900"
                          marginLeft={'1rem'}
                          marginRight={'1rem'}
                        >
                          Suggested Recipes
                        </Typography>
                        <br></br>
                        {recipes?.split("\n").map((content, i) => (
                          <p key={`paragraph-${i}`} className="ml-4 mr-4">
                            {content}
                          </p>
                        ))}
                        <br></br>
                      </div>
                      <Button
                        variant="contained"
                        onClick={() => setDisplayRecipeModal(false)}
                        className="bg-black rounded-3xl pl-14 pr-14 ml-64 mr-64 pt-4 pb-4 font-sans text-white"
                      >
                        Close
                      </Button>
                    </Box>
                  </Modal>
                </div>
              </div>
            </Box>
          ) : (
            router.push("/login")
          )
        ) : (
          router.push("/login")
        )
      ) : (
        <Box
          display={"flex"}
          width={"100%"}
          height={"100vh"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <CircularProgress variant="solid" />
        </Box>
      )}
    </>
  );
}
