import { signOut } from "firebase/auth"
import { Link, useNavigate } from "react-router-dom"
import { auth } from "../config/firebase"
import { RxHamburgerMenu } from "react-icons/rx";

function Navbar({isLoggedIn,setIsLoggedIn,setOpenSidebar}) {
  const navigate = useNavigate()

  const handleLogOut =async()=>{
    await signOut(auth)
    setIsLoggedIn(false)
    navigate('/login')
}
  return (
    <div className="bg-black text-white m-auto h-12 flex items-center">
    <div className="w-11/12 m-auto flex justify-between items-center">
       <span className="text-2xl">Weather App</span>
        <div className="hidden sm:flex text-[18px] items-center gap-x-8">
            <Link to={'/'}>Home</Link>
            <Link to={'/dashboard'}>Dashboard</Link>   
        </div>
        <div className="text-[18px] flex justify-center gap-x-4 items-center">
           {
            isLoggedIn !== true ? <Link to={'/login'} className="bg-slate-800 px-4 py-1 rounded-md text-white">Login</Link> : <button onClick={handleLogOut} className="bg-slate-800 px-4 py-1 rounded-md text-white">Logout</button>
           }
           <RxHamburgerMenu className="flex sm:hidden" onClick={()=>setOpenSidebar(true)}/>
            
            
        </div>
    </div>

    </div>
  )
}

export default Navbar