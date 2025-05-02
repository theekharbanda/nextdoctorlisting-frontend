
"use client"
import { useEffect, useMemo, useState } from 'react';

const FILTER_CONFIG = {
  experiences: ["0-5", "5-10", "10-15", "15-20"],
  fees: ["100-500", "500-1000", "1000+"],
  language: ["Hindi", "English", "Punjabi", "Marathi", "Tamil"],
};


export default function Home() {

  const [doctors,setDoctors] = useState([]);
  const [filter, setfilter] = useState({
    experiences: [],
    fees: [],
    languages: []
  });

  useEffect(()=>{
    const fetchDoctors= async()=>{
      try{
        const res = await fetch('http://localhost:8080/api/doctors', {
          method: "POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify(filter)
        });
        if (!res.ok) throw new Error("Failed to fetch data.");
        const data = await res.json();
        setDoctors(data); 
      }catch(error){
        console.log(res);
        console.log("Error ....");
      }
    }
    fetchDoctors();
  },[filter])
  

  


  const handleFilter = (category, value) => {
    setfilter(prev => {
      const updatedCategory = prev[category].includes(value)
        ? prev[category].filter(item => item !== value)
        : [...prev[category], value];

      return {
        ...prev,
        [category]: updatedCategory
      }
    });
  }


  return (
    <div className="h-screen w-full">
      <div className="w-full h-full grid grid-cols-12 border">
        <div className="col-span-3 flex justify-center items-center h-full ">
          <div className="flex flex-col gap-5 p-5">
            <div className="filter1">
              <div className="text-xl font-bold mb-1">
                Experience
              </div>
              <div className="flex flex-col gap-2">
                {FILTER_CONFIG.experiences.map((range, idx) => (
                  <label key={idx} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4"
                      checked={filter.experiences.includes(range)}
                      onChange={() => handleFilter('experiences', range)}
                    />
                    <span className="text-sm">{range} years</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="filter2">
              <div className="text-xl font-bold mb-1">
                Fees
              </div>
              <div className="flex flex-col gap-2">
                {FILTER_CONFIG.fees.map((range, idx) => (
                  <label key={idx} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4"
                      checked={filter.fees.includes(range)}
                      onChange={() => handleFilter('fees', range)}
                    />
                    <span className="text-sm">{range}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="filter3">
              <div className="text-xl font-bold mb-1">
                Langauge
              </div>
              <div className="flex flex-col gap-2">
                {FILTER_CONFIG.language.map((range, idx) => (
                  <label key={idx} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4"
                      checked={filter.languages.includes(range)}
                      onChange={() => handleFilter('languages', range)}
                    />
                    <span className="text-sm">{range}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-9 flex flex-col overflow-hidden ">
          <div className="h-20 ">
            <div className="text-xl font-semibold">
              Consult General Physicians Online - Internal Medicine Specialists
            </div>
          </div>
          <div className="flex-1 overflow-y-auto ">
            <div className="flex flex-col gap-3">
              {doctors?.length === 0 && (
                <div className="text-center text-gray-500 mt-4">No doctors match the selected filters.</div>
              )}
              {doctors?.map(doctor => (
                <div key={doctor.id} className="w-200 border rounded-xl h-30 overflow-hidden shadow-md hover:shadow-lg transition-all">
                  <div className="grid grid-cols-12 h-full">
                    <div className="col-span-3 flex justify-center items-center  h-full">
                      <div className="w-20 h-20 bg-gray-300 rounded-full"></div>
                    </div>
                    <div className="col-span-6 flex flex-col justify-center px-4 gap-1">
                      <h2 className="text-lg font-semibold">{doctor.name}</h2>
                      <p className="text-gray-500 text-sm">{doctor?.specialization} | {doctor.experience} years Experience | {doctor.languages.join(",")} | {doctor.fees}</p>
                    </div>
                    <div className="col-span-3 flex justify-center items-center px-2">
                      <button className="w-40 bg-transparent outline px-4 py-2 rounded hover:cursor-pointer">
                        Consult Online
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>



        </div>
      </div>
    </div>
  );
}
