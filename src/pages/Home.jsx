import { ThemeContext } from "../context/theme.context.jsx";
import { useContext } from "react";



export default function Home(){
    const { theme, toggleTheme } = useContext(ThemeContext);
    return (
        <>
        <h1 
        className="text-2xl font-normal text-center text-green-500">
            Welcome to the Home Page
        </h1>
        <button className="border p-2 rounded-lg cursor-pointer hover:bg-gray-500 hover:text-white" onClick={toggleTheme}>
            Toggle Theme: {theme}
        </button>
        </>
    )
}