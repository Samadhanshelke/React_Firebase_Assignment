
import { useEffect, useState } from 'react'
import './App.css'
import { Auth } from './components/auth'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import {db } from './config/firebase'
import { collection, getDocs } from 'firebase/firestore'
import AddNewUser from './components/AddNewUser'
import ShowUsers from './components/ShowUsers'
import HomePage from './Pages/HomePage'
import Navbar from './components/Navbar'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { Toaster } from 'react-hot-toast'
import Sidebar from './components/Sidebar'
// import ProtectedRoute from './config/ProtectedRoute'



function App() {
  const usersCollectionRef = collection(db,"users")
   const [users,setUsers] = useState([])
   const [isLoggedIn,setIsLoggedIn] = useState(false);
   const [Loading,setLoading] = useState(true)
   const [openSidebar,setOpenSidebar] = useState(false)
// const navigate  = useNavigate()
   useEffect(() => {
    const auth = getAuth();

    // Observer to check if the user is logged in
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setIsLoggedIn(true)
      } else {
        // User is signed out
        setIsLoggedIn(false)
       
      }
    });

    // Clean up the observer on component unmount
    return () => unsubscribe();
  }, []);
 
     const getUserList = async()=>{
      try {
        const data = await getDocs(usersCollectionRef)
        const filtereddata = data.docs.map((doc)=>({
          ...doc.data(),
          id:doc.id,
        }))
        console.log(filtereddata)
        setUsers(filtereddata)  
        setLoading(false)
      } catch (error) {
        console.log(error)
      }
  }
   
    useEffect(()=>{
     getUserList()
   },[])
  
  //  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=51d2507fccc3f97cadac8826f8d8419f`
  
  return (
    <div>      
      <BrowserRouter>
      {
        openSidebar ?  <Sidebar setOpenSidebar={setOpenSidebar}/> :<Navbar setOpenSidebar={setOpenSidebar} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
      }
      
     
        <Routes>

            <Route path='/' element={<HomePage/>}/>

            <Route path='/login' element={<Auth/>}/>

            <Route path='/addnew' element={
             <AddNewUser usersCollectionRef={usersCollectionRef} getUserList={getUserList}/>           
            }/>

            <Route path='/dashboard' element={  
            <ShowUsers users={users} Loading={Loading} setUsers={setUsers} getUserList={getUserList} />        
            }/>

        </Routes>
      </BrowserRouter>
      <Toaster/>
    </div>
  )
}

export default App
