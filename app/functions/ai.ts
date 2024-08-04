import OpenAI from "openai";
import { PantryItem } from "../page";
import React from "react";

const recipeSuggestions = async (
  pantry_items: PantryItem[],
  setRecipes: React.Dispatch<React.SetStateAction<string | null>>
) => {
  try {
    // NOTE: .env file already configured locally
    // and is not included in repository.
    //
    // Create a new OpenAI instance to access
    // the API to generate recipe suggestions.
    const client: OpenAI = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      dangerouslyAllowBrowser: true,
    });

    // Set the state variable pertaining to setRecipes to
    // "Processing information..." to let the user know that
    // their recommended recipes are currently being processed
    // with their current pantry items.
    setRecipes("Processing information...");

    // Access the prompt from the .env file.
    let prompt: string | undefined = process.env.AI_PROMPT;

    // Create a string variable to store the item names
    // from the pantry.
    let recipes: string = "";

    // Concatenate the item names from the pantry
    // into the recipe string.
    pantry_items.forEach((item) => {
      recipes += `${item.name.toLowerCase()}: ${item.count}, `;
    });

    // Remove the extra whitespace and comma.
    recipes = recipes.slice(0, recipes.length - 2);

    // Include the list of recipes into the AI
    // prompt.
    prompt += ` ${recipes}`;

    // Provide the prompt to the OpenAI API prompt.
    const chatCompletion: OpenAI.Chat.Completions.ChatCompletion =
      await client.chat.completions.create({
        messages: [{ role: "user", content: `${prompt}` }],
        model: "gpt-4o-mini",
        temperature: 0.45,
      });

    // Store the response from the OpenAI API.
    let msg: string | null = chatCompletion.choices[0].message?.content;

    console.log(msg);

    // Update the state variable in the user's pantry page
    // providing the list of recipes that they can make
    // based on the items in their pantry.
    setRecipes(msg);
  } catch {
    // Lets the user that an error has occurred accessing the API.
    console.error("There was a problem accessing the API.");
    setRecipes("There was an error loading the API.");
  }
};

export default recipeSuggestions;