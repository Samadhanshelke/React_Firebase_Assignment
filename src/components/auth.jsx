
import { useState } from 'react';
import {auth, googleProvider} from '../config/firebase';
import { FcGoogle } from "react-icons/fc";
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
export const Auth = ()=>{
    const navigate = useNavigate();
const [data,setData] = useState({
    email:"",
    password:""
})
const {email,password} = data
const handleInputChange = (e) => {
    setData((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value
    }));
  };


    const handleSignIn = async()=>{
        try {
           const response =  await createUserWithEmailAndPassword(auth,email,password)
            
            if(response.user){
                toast.success("SignIn Successful")
                navigate('/')
            }
        } catch (error) {
            console.log(error)
            toast.error("Please try Again")
        }
    }

    const handleSignInWithGoogle = async()=>{
            try {
                const response = await signInWithPopup(auth,googleProvider)
                if(response.user){
                    toast.success("SignIn Successful")
                    navigate('/')
                }
            } catch (error) {
                console.log(error)
                toast.error("Please try Again")
            }
    }
   
    return (
        <div className='flex bg-black  text-white h-screen items-center justify-center '>
           <div className='w-[500px] border-2 border-white flex flex-col justify-center items-center gap-y-4 p-4 rounded-md'>
           <h1 className='text-3xl'>Login</h1>
             <input type="email" className='p-2 text-black rounded-sm w-72 focus:outline-none' value={email} name="email" id="" placeholder="Email..." onChange={handleInputChange}/>
             <input type="password" className='p-2 text-black rounded-sm w-72 focus:outline-none' value={password} name="password" id="" placeholder="Password..." onChange={handleInputChange}/>
             <div className='flex gap-x-4 mt-4'>
                    <button onClick={handleSignIn} className=' bg-sky-500 text-white px-4 py-2 rounded-md text-[20px]'>Sign In</button>
                    <button onClick={handleSignInWithGoogle} className='bg-black border border-white flex text-[20px] items-center gap-x-2 px-4 py-2 rounded-md'><FcGoogle/>SignIn</button>
                    {/* <button onClick={handleLogOut}>logout</button> */}

             </div>

           </div>
        </div>
    )
}