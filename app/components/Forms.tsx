import { Box, Button, FormControl, TextField } from "@mui/material"
import { addToPantry } from "../functions/crud"
import React, { useState } from "react"
import { PantryItem } from "../page"

interface FormsProps {
    setPantryItems: React.Dispatch<React.SetStateAction<PantryItem[]>>
}

export const AddForm: React.FC<FormsProps> = ({setPantryItems}) => {
    const [addForm, setAddForm] = useState<PantryItem>({
        name: "",
        count: 0
    })

    const handleAddSubmission = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        addToPantry(setPantryItems, addForm)
    }

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setAddForm({...addForm, [e.target.name]: e.target.value})
    }

    return (
        <form onSubmit={handleAddSubmission}>
            <FormControl>
                <Box display={'flex'} flexDirection={'column'} marginTop={4} marginBottom={4}>
                    <TextField name="name" onChange={handleFormChange} type="text"></TextField>
                    <br></br>
                    <TextField name="count" type="number" onChange={handleFormChange}></TextField>
                    <br></br>
                    <Button variant="contained" type="submit">Add</Button>
                </Box>
            </FormControl>
        </form>
    )
}