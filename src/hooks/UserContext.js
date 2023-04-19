import { createContext } from "react";
import { getAllUsers } from "../firebase/providers";

const UserContext = createContext(
    await getAllUsers()
)

export default UserContext; 