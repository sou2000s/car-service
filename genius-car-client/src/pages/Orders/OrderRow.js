import React, { useEffect, useState } from 'react';

const OrderRow = ({order , handleDelete , handleStatusUpdate}) => {
    const {serviceName ,_id , phone , price, customer, email , service , status} = order;
    console.log(order);
    const [orderServices , serOrderServices] = useState({})
  useEffect(()=>{
    fetch(`http://localhost:5000/services/${service}`)
    .then(res => res.json())
    .then(data => serOrderServices(data))
  } , [service])

  console.log(order);

//   const handleDelete = (id) =>{
//       const agree = window.confirm('are you sure?')

//       if(agree){
//         fetch(`http://localhost:5000/orders/${id}` , {
//             method:"DELETE"
//         })
//         .then(res => res.json())
//         .then(data => console.log(data))
//       }
//   }
    return (
        <tr>
        <th>
        <button className="btn btn-circle btn-outline" onClick={()=>handleDelete(_id)}>
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
</button>
        </th>
        <td>
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className=" rounded w-24 h-24">
                <img src={orderServices.img} alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div className="font-bold">{customer}</div>
              <div className="text-sm opacity-50">{phone}</div>
            </div>
          </div>
        </td>
        <td>
         {serviceName}
          <br/>
          <span className="badge badge-ghost badge-sm">${price}</span>
        </td>
        <td>Purple</td>
        <th>
          <button onClick={()=>handleStatusUpdate(_id)} className="btn btn-ghost btn-xs">{status ? status : "pending"}</button>
        </th>
      </tr>
    );
};

export default OrderRow;