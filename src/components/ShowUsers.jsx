import { deleteDoc,doc } from "firebase/firestore";
import { db } from "../config/firebase";
import { useEffect, useState } from "react";
import UpdateUser from "./UpdateUser";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Sort from "./Sort";
import toast from "react-hot-toast";
import { RotatingLines } from "react-loader-spinner";
import { FaChevronUp,FaChevronDown } from "react-icons/fa6";
function ShowUsers({users,getUserList,setUsers,Loading}) {
  const navigate = useNavigate()
const [openFlag,setOpenFlag] = useState(false)
const [editUserData,setEditUserData] = useState(null)
const [sortData,setSortData] = useState([])
const [originalUsers, setOriginalUsers] = useState([]);

  useEffect(() => {
    // Update the originalUsers when users prop changes
    setOriginalUsers(users);
    setSortData(users)
    console.log("users:",users,"sordData:",sortData)
  }, [users]);

const [search,setSearch] = useState("")

    const handleDelete = async(id)=>{
          await deleteDoc(doc(db,"users",id))
          toast.success("User Deleted")
          getUserList();
    }


 const handleUpdateUser = (user)=>{
       setEditUserData(user)
       setOpenFlag(true)
 }

 const handleSort = (option)=>{

  let sortedList = [...originalUsers];
     if (option === 'A-Z') {
     
       sortedList = sortedList.sort((a, b) =>
        a.Username.toUpperCase().localeCompare(b.Username.toUpperCase())
      );
      setSortData(sortedList)
    }
    else if (option === 'Z-A') {
     
       sortedList = sortedList.sort((a, b) =>
        b.Username.toUpperCase().localeCompare(a.Username.toUpperCase())
      );
      setSortData(sortedList)
      
    }
    else if (option === 'Active' || option === 'InActive') {
     
      const filteredUsers = originalUsers.filter((user) => user.status === option);
      sortedList = filteredUsers.sort((a, b) =>
        a.Username.toUpperCase().localeCompare(b.Username.toUpperCase())
      );
     
      setSortData(sortedList)
    }
  }

  const handleAscSort = ()=>{
    const sortedList = sortData.slice().sort((a, b) => {
      return new Date(a.added_date) - new Date(b.added_date);
  });
  setSortData(sortedList);
  console.log(sortedList,'asc sort')
  }
  const handleDescSort = () => {
    // Toggle the sort order
    const sortedList = sortData.slice().sort((a, b) => {
        return new Date(b.added_date) - new Date(a.added_date);
    });
    setSortData(sortedList);
    // setSortOrder('desc');
};

  if(openFlag == true){
    return <UpdateUser editUserData={editUserData} setOpenFlag={setOpenFlag} getUserList={getUserList}/>
 }
 if(Loading){
  return ( <div className='flex justify-center items-center h-[600px]'>
  <RotatingLines
  visible={true}
  height="96"
  width="96"
  color="black"
  strokeWidth="5"
  animationDuration="0.75"
  ariaLabel="rotating-lines-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />
</div>)
 }
 
  return (
    <div className="w-11/12 m-auto mt-4 flex flex-col justify-center items-center">
    <div className="flex justify-between items-center w-[1000px]">
          <input type="text" placeholder="search" className="border border-black rounded px-2 py-1 w-[250px]" value={search} onChange={(e)=>setSearch(e.target.value)}/>
          <div>
             <Sort handleSort={handleSort} users={users} setUsers={setUsers}/>
          </div>
          <button onClick={()=>navigate('/addnew')} className="flex justify-start bg-slate-700 text-white py-2 px-4">Add New User</button>
    </div>
    <Table className="border-collapse border-2 border-slate-500  w-[1000px] m-auto mt-8">
    <Thead className="bg-[#334054] text-white rounded-lg">
      <Tr className="text-center rounded-lg h-12">
        <Th className="border border-slate-600">Username</Th>
        <Th className="border flex items-center justify-center gap-x-2 h-12 border-slate-600">Date <div className="flex flex-col -gap-y-4"><FaChevronUp onClick={handleAscSort}/><FaChevronDown onClick={handleDescSort}/></div></Th>
        <Th className="border border-slate-600">Status</Th>
        <Th className="border border-slate-600">Actions</Th>

      </Tr>
    </Thead>
    <Tbody>
     
      {
        
       sortData.filter((user)=>{
                  return search.toLowerCase() ===''
                     ? user 
                     : user.Username.toLowerCase().includes(search) || user.added_date.toLowerCase().includes(search) || user.status.toLowerCase().includes(search) ;
                }).map((user)=>{
           return (
           <Tr key={user.id} className="text-center text-[#7e8ca1] bg-[#1e293b]">
               <Td className="border border-slate-600">{user.Username}</Td>
               <Td className="border border-slate-600">{user.added_date}</Td>
               <Td className="border border-slate-600">{user.status}</Td>
               <Td className="flex flex-row  border h-12 border-slate-600 items-center text-center justify-items-center ps-4 w-full gap-x-2">
                   <FaRegEdit onClick={()=>handleUpdateUser(user)} className="cursor-pointer"/>
                   <MdDeleteOutline onClick={()=>handleDelete(user.id)} className="cursor-pointer"/>
                  
               </Td>
           </Tr>
           )
         })
      }
     
      
    </Tbody>
  </Table>

    </div>
  
  )
}

export default ShowUsers