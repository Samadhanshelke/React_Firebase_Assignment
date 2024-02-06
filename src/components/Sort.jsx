

function Sort({handleSort,users,setUsers}) {

    const handleSortChange = (e)=>{
        // setUsers(users)
        handleSort(e.target.value)
    }
  return (
    <div className="flex items-center gap-x-2">
         <label htmlFor="sort">Sort</label>
              <select name="sort" id="sort" className="border border-black rounded px-4" onChange={handleSortChange}>
                <option value="A-Z">A-Z</option>
                <option value="Z-A">Z-A</option>
                <option value="Active">Active</option>
                <option value="InActive">InActive</option>
              </select>
    </div>
  )
}

export default Sort