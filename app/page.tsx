"use client";
import React, { useState, useEffect } from "react";
import { Box, Button, Card, Typography } from "@mui/material";
import Nav from "./components/Nav";
import { retrieveFromPantry } from "./functions/db_ops";

export type PantryItem = {
  name: string,
  count: number
}

export default function Home() {
  const [pantryItems, setPantryItems] = useState<PantryItem[]>([])

  useEffect(() => {
    retrieveFromPantry(setPantryItems)
  }, [])

  return (
    <Box>
      <Nav />
      <div className="flex items-center justify-center space-x-16 text-black rounded-2xl p-5 ml-10 mr-10">
        <div className="flex flex-col justify-center text-center space-y-5">
          <Typography variant="h2" fontFamily="sans-serif">Pantry Tracker</Typography>
          {pantryItems.map((item, i) => 
              <Box paddingTop={3} paddingBottom={3}>
                <p key={i}>{item.name}: {item.count}</p>
              </Box>
          )}
        </div>
      </div>
    </Box>
  );
}
