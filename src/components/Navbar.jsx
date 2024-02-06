import { signOut } from "firebase/auth"
import { Link, useNavigate } from "react-router-dom"
import { auth } from "../config/firebase"


function Navbar({isLoggedIn,setIsLoggedIn}) {
  const navigate = useNavigate()
  const handleLogOut =async()=>{
    await signOut(auth)
    setIsLoggedIn(false)
    navigate('/login')
}
  return (
    <div className="bg-black text-white m-auto h-12 flex items-center">
    <div className="w-11/12 m-auto  flex justify-between items-center">
       <span className="text-2xl">Weather App</span>
        <div className="flex text-[18px] items-center gap-x-8">
            <Link to={'/'}>Home</Link>
            <Link to={'/dashboard'}>Dashboard</Link>   
        </div>
        <div className="text-[18px]">
           {
            isLoggedIn !== true ? <Link to={'/login'}>Login</Link> : <button onClick={handleLogOut}>Logout</button>
           }
            
            
        </div>
    </div>

    </div>
  )
}

export default Navbar