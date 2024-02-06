import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";

function Sidebar({setOpenSidebar}) {
  return (
    <div>
            <div className="bg-black text-white m-auto h-12 flex flex-col ">
                    <div className="w-11/12 m-auto flex justify-between items-center">
                        <span className="text-2xl">Weather App</span>
                        
                        <div className="text-[18px] flex justify-center gap-x-4 items-center">         
                        <RxCross2 className="flex sm:hidden" onClick={()=>setOpenSidebar(false)}/>  
                        </div>
            </div>

                    
            </div>
            <div className="flex text-[18px] py-4 h-20 bg-black text-white flex-col items-center gap-y-2">
                            <Link to={'/'}>Home</Link>
                            <Link to={'/dashboard'}>Dashboard</Link>   
            </div>

    </div>
  )
}

export default Sidebar