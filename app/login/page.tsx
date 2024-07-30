'use client'
import { Box, FormControl, InputLabel, Input, Button, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'

type Credentials = {
    username: string,
    password: string
}

const Login = () => {

    const [form, setForm] = useState<Credentials>({
        username: "",
        password: ""
    })

    const handleSubmission = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        console.log("This form was submitted!")
    }

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    return (
        <Box 
            height={500}
            width={500}
            display="flex"
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            color={"black"}
            gap={4}
            p={2}
            className="space-y-5 rounded-2xl"
        >
            <h1 className="font-extrabold text-3xl">Log In</h1>
            <form onSubmit={handleSubmission}>
                <FormControl className="w-60">
                    <FormControl>
                        <TextField required placeholder="Username" id="username-input" name="username" onChange={handleFormChange} />
                    </FormControl>
                    <br></br>
                    <FormControl>
                        <TextField required placeholder="Password" type="password" name="password" onChange={handleFormChange} id="password-input" />
                    </FormControl>
                </FormControl>
                <Box
                    height={100}
                    width={250}
                    display={"flex"}
                    flexDirection={"row"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                >
                    <Button variant="contained" type="submit" className="p-3 pl-6 pr-6 bg-black rounded-3xl">Log In</Button>
                    <Button variant="contained" className="p-3 pl-6 pr-6 bg-black rounded-3xl">Sign Up</Button>
                </Box>
            </form>
        </Box>
    )
}

export default Login
