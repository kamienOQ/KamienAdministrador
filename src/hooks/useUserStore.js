import { useState } from "react";
import { useSelector,useDispatch } from "react-redux"
export const useUserStore = () => {
    const dispatch = useDispatch();
    const [users,setUsers] = useState([])

    
    
}
