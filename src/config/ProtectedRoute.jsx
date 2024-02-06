import { useEffect } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"


function ProtectedRoute({children,isLoggedIn}) {
    const navigate = useNavigate()
    if(isLoggedIn){
        return children
    }
  else{
    useEffect(()=>{
        navigate('/login')
        toast.error('Please login')
    },[])
  }
}

export default ProtectedRoute