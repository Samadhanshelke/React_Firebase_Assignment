

function DaysData({data}) {
    console.log("data indays",data?.list[0]?.dt_txt)
    const getFormattedDate = () => {
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0];
        return formattedDate;
      };
      
      // Example usage
      const formattedDate = getFormattedDate();
      console.log(formattedDate);

           data?.list?.filter((item)=>{     
               console.log(item.dt_txt.split(" ")[0] == formattedDate ,"filtered")
         })
      
     
  return (
    <div className="">
    <h1>helllo</h1>
        {/* {
           data?.list?.filter((item)=>{
            item?.dt_txt.split(" ")[0] === formattedDate
            
           })
        } */}
    </div>
  )
}

export default DaysData
