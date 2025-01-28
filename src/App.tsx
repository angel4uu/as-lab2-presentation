import { useEffect, useState } from "react";
import { CountStudents, MainQuery } from "@/components";
import { getAllCareers, ProfessionalCareer } from "@/api";

function App() {
  const [careers, setCareers] = useState<ProfessionalCareer[]>([]);
  const [component, setComponent] = useState<string>("mainquery");

  useEffect(() => {
    const fetchCareers = async () => {
      try{
        const response=await getAllCareers();
        setCareers(response.data);
      }
      catch(error){
        console.log(error);
      }
    }
    fetchCareers();
  } , []);

  return (
    <div className="flex flex-col pt-16 px-72 gap-20 w-full">
      <h1 className="font-bold text-8xl">Lab02</h1>
      <div className="flex justify-between text-xl font-medium">
        <button onClick={() => setComponent("mainquery")}>Main Query</button> 
        <div>|</div>
        <button onClick={() => setComponent("countstudents")}>Count students by career</button>
      </div>
      {component === "mainquery" && <MainQuery careers={careers} />}
      {component === "countstudents" && <CountStudents />}
    </div>
  );
}

export default App;
