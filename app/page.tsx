"use client";
import React, { useState, useEffect } from "react";
import { Box, Button, Card, Typography, Modal } from "@mui/material";
import { retrieveFromPantry } from "./functions/crud";
import { AddForm } from "./components/Forms";

export type PantryItem = {
  name: string,
  count: number
}

export default function Home() {
  const [pantryItems, setPantryItems] = useState<PantryItem[]>([])
  const [displayModal, setDisplayModal] = useState(true)

  useEffect(() => {
    retrieveFromPantry(setPantryItems)
  }, [])

  return (
    <Box>
      <div className="flex items-center justify-center space-x-16 text-black rounded-2xl p-5 ml-10 mr-10">
        <div className="flex flex-col justify-center text-center space-y-5">
          <Typography variant="h2" fontFamily="sans-serif">Pantry Tracker</Typography>
          <div className="grid grid-cols-3 justify-between text-center">
            {pantryItems.map((item, i) => 
                <Box key={i} paddingTop={3} paddingBottom={3}>
                  <Card className="p-5">
                    <p>{item.name}: {item.count}</p>
                  </Card>
                </Box>
            )}
          </div>
          <AddForm setPantryItems={setPantryItems} />
          <div className="flex flex-row justify-between text-center space-x-5">
            <Button variant="contained">Update</Button>
            <Button variant="contained">Remove</Button>
          </div>
        </div>
      </div>
    </Box>
  );
}
