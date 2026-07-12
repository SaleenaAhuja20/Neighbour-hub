import { useState } from "react";

export default function ProviderAvailability() {

  const [days, setDays] = useState([
    { day: "Monday", available: true },
    { day: "Tuesday", available: true },
    { day: "Wednesday", available: false },
    { day: "Thursday", available: true },
    { day: "Friday", available: true },
    { day: "Saturday", available: true },
    { day: "Sunday", available: false },
  ]);

  const toggle = (index:number)=>{

    const updated=[...days];

    updated[index].available=!updated[index].available;

    setDays(updated);

  }

  return(

<div className="min-h-screen bg-[#F4F6FA] ml-[270px] p-8">

<h1 className="text-4xl font-black text-[#111C34]">
Availability
</h1>

<div className="bg-white rounded-3xl p-8 mt-8 shadow">

{

days.map((d,index)=>(

<div
key={index}
className="flex justify-between border-b py-5"
>

<h2>{d.day}</h2>

<button

onClick={()=>toggle(index)}

className={`px-5 py-2 rounded-xl ${
d.available
?
"bg-green-600 text-white"
:
"bg-red-600 text-white"
}`}

>

{d.available?"Available":"Unavailable"}

</button>

</div>

))

}

<button
className="mt-8 bg-[#111C34] text-white px-8 py-3 rounded-xl"
>

Save Availability

</button>

</div>

</div>

)

}