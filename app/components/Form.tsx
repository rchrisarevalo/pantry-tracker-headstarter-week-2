import {
  Alert,
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import { addToPantry, removeFromPantry, updatePantry } from "../functions/crud";
import React, { useState } from "react";
import { PantryItem } from "../page";

interface FormProps {
  setPantryItems: React.Dispatch<React.SetStateAction<PantryItem[]>>,
  setDisplayModal: React.Dispatch<React.SetStateAction<boolean>>,
  title: string,
  type: string
}

export const Form: React.FC<FormProps> = ({
  setPantryItems,
  setDisplayModal,
  title,
  type,
}) => {
  const [form, setForm] = useState<PantryItem>({
    name: "",
    count: 0,
  });

  const [alertTriggered, setAlertTrigged] = useState<boolean>(false);

  const handleSubmission = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (type == "add") {
      addToPantry(setPantryItems, setAlertTrigged, setDisplayModal, form);
    }
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <form
      onSubmit={handleSubmission}
      className="flex justify-center items-center min-h-screen"
    >
      <Box
        display={"flex"}
        padding={5}
        borderRadius={3}
        bgcolor={"white"}
        flexDirection={"column"}
        marginTop={4}
        marginBottom={4}
      >
        <h2 className="font-extrabold text-3xl">{title}</h2>
        <br></br>
        {(type != "remove") &&
          <TextField
            name="name"
            placeholder="Item"
            onChange={handleFormChange}
            type="text"
          ></TextField>
        }
        <br></br>
        <TextField
          name="count"
          placeholder="How many?"
          type="number"
          onChange={handleFormChange}
        ></TextField>
        <br></br>
        {((type == "add" || type == "update") && form.name != "" && form.count != 0) && (
          <Button variant="contained" type="submit" className="font-sans">
            Submit
          </Button>
        )}
        <br></br>
        <Button
          variant="contained"
          type="submit"
          className="font-sans"
          onClick={() => setDisplayModal(false)}
        >
          Close
        </Button>
        <br></br>
        {alertTriggered && (
          <Alert severity="error">
            <Typography fontFamily="sans-serif">
              Error. Please try again.
            </Typography>
          </Alert>
        )}
      </Box>
    </form>
  );
};
