import { Button, Card } from "@mui/material";
import Nav from "./components/Nav";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-white text-black items-center justify-center space-y-5 p-24 font-roboto">
      <Nav />
      <div className="grid grid-cols-2 items-center justify-center space-x-16 text-black rounded-2xl p-5 ml-10 mr-10">
        <div className="flex flex-col justify-center text-left space-y-5">
          <h1 className="text-3xl ml-5 mr-5 text-left font-extrabold">Pantry Tracker</h1>
          <i className="ml-5 mr-5">This app will help you keep track of the number of items you store in your pantry.</i>
        </div>
        <form className="flex flex-col justify-center text-black space-y-5 p-10">
          <label className="text-left">Enter your item:</label>
          <input className="p-3 rounded-sm border-b-2 border-b-black"></input>
          <label className="text-left">How much are you going to store?</label>
          <input className="p-3 rounded-sm border-b-2 border-b-black" type="number"></input>
          <div className="flex flex-row items-center justify-center space-x-10">
            <Button variant="contained" className="p-3 pl-6 pr-6 bg-black rounded-3xl">Add Item</Button>
            <Button variant="contained" className="p-3 pl-6 pr-6 bg-black rounded-3xl">Remove Item</Button>
          </div>
        </form>
      </div>
    </main>
  );
}
