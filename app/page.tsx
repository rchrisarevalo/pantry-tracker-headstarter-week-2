"use client";
import React, { useState, useEffect } from "react";
import { Box, Button, Card, Typography, Modal } from "@mui/material";
import { CircularProgress } from "@mui/joy";
import { retrieveFromPantry } from "./functions/crud";
import { Form } from "./components/Form";

export type PantryItem = {
  name: string;
  count: number;
};

export default function Home() {
  const [pantryItems, setPantryItems] = useState<PantryItem[]>([]);
  const [displayModal, setDisplayModal] = useState(false);
  const [submissionType, setSubmissionType] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    retrieveFromPantry(setPantryItems);
  }, []);

  return (
    <Box>
      <div className="flex items-center justify-center space-x-16 min-h-screen text-black rounded-2xl p-5 ml-10 mr-10">
        <div className="flex flex-col justify-center text-center space-y-5">
          <Typography variant="h2" fontFamily="sans-serif" fontWeight="900">
            Pantry Tracker
          </Typography>

          {pantryItems.length != 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-4 justify-between text-center">
              {pantryItems.map((item, i) => (
                <Box
                  key={i}
                  paddingTop={3}
                  paddingBottom={3}
                  marginLeft={2}
                  marginRight={2}
                >
                  <Card className="p-5">
                    <p>
                      {item.name}: {item.count}
                    </p>
                  </Card>
                </Box>
              ))}
            </div>
          ) : (
            <div className="flex flex-row justify-center items-center space-y-20">
              <CircularProgress variant="solid" />
            </div>
          )}

          <div className="flex flex-row justify-between text-center space-x-5">
            <Button
              variant="contained"
              onClick={() => {
                setDisplayModal(true);
                setSubmissionType("add");
                setTitle("Add Item");
              }}
              className="bg-black rounded-3xl pl-6 pr-6 pt-3 pb-3"
            >
              Add
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                setDisplayModal(true);
                setSubmissionType("update");
                setTitle("Update Item");
              }}
              className="bg-black rounded-3xl pl-6 pr-6 pt-3 pb-3"
            >
              Update
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                setDisplayModal(true);
                setSubmissionType("remove");
                setTitle("Remove Item");
              }}
              className="bg-black rounded-3xl pl-6 pr-6 pt-3 pb-3"
            >
              <Typography variant="body2">Remove</Typography>
            </Button>
          </div>
          <Modal open={displayModal} onClose={() => setDisplayModal(false)}>
            <Form
              setPantryItems={setPantryItems}
              setDisplayModal={setDisplayModal}
              title={title}
              type={submissionType}
            />
          </Modal>
        </div>
      </div>
    </Box>
  );
}
