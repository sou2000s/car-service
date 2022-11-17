import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import ServiceCard from './ServiceCard';

const Services = () => {

    const [services , setServices] = useState([]);
   const [isAscd , setIsAscd] = useState(true)
  const [search , setSearch] = useState('')
  const srearchRef = useRef()
  const handleSearch = () =>{
    setSearch(srearchRef.current.value);
  }

    useEffect(()=>{
        fetch(`http://localhost:5000/services?search=${search}&order=${isAscd ? "asc" : 'desc'}`)
        .then(res => res.json())
        .then(data => setServices(data))
    } , [isAscd , search])
    return (
        <div>
            <button onClick={()=> setIsAscd(!isAscd)}>{isAscd ? 'Hign to low' : "Low to high"}</button>
         

            <div className='text-center'>
                <p className='text-2xl text-orange-500'>Services</p>
                <h1 className='text-4xl text-black'>Our Service Area</h1>
                <p>the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. </p>
                <input type="text" ref={srearchRef} name="" id="" />  
                <button onClick={handleSearch}> Search</button>
            </div>

         <div className='grid gap-6 md:grid-cols-3'>
         {services.map(service => <ServiceCard key={service._id} service={service}></ServiceCard>)}
         </div>
        </div>
    );
};

export default Services;