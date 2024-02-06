import { useState } from "react"
import {  doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import toast from "react-hot-toast";

function UpdateUser({editUserData,setOpenFlag,getUserList}) {
       

    //  y-m-d
    console.log(editUserData,'edituser')
    const {Username,added_date,status,id} = editUserData

    const [newUserData,setnewUserData] = useState({
        Username:Username,
        added_date:added_date,
        status:status
    })
    // const {Username,added_date,status} = newUserData;

    const handleInputChange = (e) => {
        setnewUserData((prevValues) => ({
          ...prevValues,
          [e.target.name]: e.target.value
        }));
      };

      const handleFormSubmit = async (e) => {
        if(Username == "" || added_date == "" ){
          return 
  }
        console.log(id)
        e.preventDefault();
        await updateDoc(doc(db, "users", id), {
          Username: newUserData.Username,
          added_date: newUserData.added_date,
          status: newUserData.status,
        });
        getUserList()
        toast.success("User Updated Successfully")
        setOpenFlag(false)
        
      };

  return (
    <div className="flex flex-col h-screen bg-black text-white items-center justify-center gap-y-3 mb-4">
        <form className="flex flex-col justify-center items-center gap-y-4 sm:border sm:border-white p-4 rounded sm:w-[500px]" onSubmit={handleFormSubmit}>
         <h1 className="text-2xl">Update User</h1>

        <div className="flex flex-col justify-start gap-y-2">
             <label htmlFor="username">UserName</label>
             <input type="text"  defaultValue={Username} className='p-2 text-black rounded-sm w-72 focus:outline-none' id="username" name="Username" onChange={handleInputChange}/>
        </div>

        <div className="flex flex-col justify-start gap-y-2">
             <label htmlFor="added_date">Date</label>
             <input type="date"  defaultValue={added_date} className='p-2 rounded-sm text-black w-72 focus:outline-none' name="added_date" id="added_date" onChange={handleInputChange} />
        </div>
         
         <div className="flex flex-col justify-start gap-y-2 text-black">
                <label htmlFor="status">Status</label>
                <select name="status" id="status" defaultValue={status} className='p-2 rounded-sm w-72 focus:outline-none' onChange={handleInputChange}>
                    <option className="p-2" value="Active">Active</option>
                    <option className="p-2" value="InActive">InActive</option>
                </select>
         </div>
         <div className="flex justify-between gap-x-4">
          <button type="button" onClick={()=>setOpenFlag(false)} className="border rounded bg-red-600 hover:bg-cyan-100 hover:text-black border-white px-6 py-2">Cancel</button>
          <button type="submit" className="border bg-green-500 rounded hover:bg-cyan-100 hover:text-black border-white px-6 py-2">Submit</button>

         </div>
        </form>
    </div>
  )
}

export default UpdateUser