import { useState } from "react"
import { addDoc } from "firebase/firestore";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function AddNewUser({usersCollectionRef,getUserList}) {
  const navigate = useNavigate()
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(today.getDate()).padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}`;

        console.log(formattedDate);

    //  y-m-d

    const [newUserData,setnewUserData] = useState({
        Username:"samadhan",
        added_date:formattedDate,
        status:"Active"
    })
    const {Username,added_date,status} = newUserData;

    const handleInputChange = (e) => {
        setnewUserData((prevValues) => ({
          ...prevValues,
          [e.target.name]: e.target.value
        }));
      };

      const handleFormSubmit = async(e)=>{
          e.preventDefault();
        try {
           if(Username == "" || added_date == "" ){
                   return 
           }
            await addDoc(usersCollectionRef,{
                Username,
                added_date,
                status,
                userId:auth?.currentUser?.uid
            })
            getUserList()
            navigate('/dashboard')
            toast.success("User Created")
        } catch (error) {
            console.log(error)
            toast.error("please Login")
            navigate("/login")
        }

      }
  return (
    <div className="flex bg-black h-screen text-white  flex-col items-center justify-center gap-y-3 mb-4">
      <div className="sm:w-[500px] sm:border flex flex-col justify-center items-center py-10 sm:px-2 rounded-md">
       <h1 className="text-2xl">Add New User</h1>
        <form className="flex flex-col gap-y-4 text-black" onSubmit={handleFormSubmit}>

        <div className="flex flex-col justify-start gap-y-2">
             <label htmlFor="username">UserName</label>
             <input type="text"  value={Username} className='p-2 rounded-sm w-72 focus:outline-none' id="username" name="Username" onChange={handleInputChange}/>
        </div>

        <div className="flex flex-col justify-start gap-y-2">
             <label htmlFor="added_date">Date</label>
             <input type="date"  value={added_date} className='p-2 rounded-sm w-72 focus:outline-none' name="added_date" id="added_date" onChange={handleInputChange} />
        </div>
         
         <div className="flex flex-col justify-start gap-y-2">
                <label htmlFor="status">Status</label>
                <select name="status" id="status" value={status} className='p-2 rounded-sm w-72 focus:outline-none' onChange={handleInputChange}>
                    <option className="p-2" value="Active">Active</option>
                    <option className="p-2" value="InActive">InActive</option>
                </select>
         </div>
          <button type="submit" className="border border-white py-2 px-4 hover:bg-white text-white rounded-md hover:text-black">ADD USER</button>
        </form>

      </div>
    </div>
  )
}

export default AddNewUser