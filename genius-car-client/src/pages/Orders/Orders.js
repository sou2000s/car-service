import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../contexts/AuthProvider';
import OrderRow from './OrderRow';

const Orders = () => {
    const {user , logout} = useContext(AuthContext);
   const [orders , serOrders] = useState([])
 

  useEffect(()=>{
    fetch(`http://localhost:5000/orders?email=${user?.email}` , {
      headers : {
        authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    })
    .then(res => 
      
      {
           if(res.status === 401 || res.status === 403){
         
            return logout()
           }

        return res.json()
      })
    .then(data => serOrders(data))
  } , [user?.email , logout])


  const handleDelete = (id) =>{
    const agree = window.confirm('are you sure?')

    if(agree){
      fetch(`http://localhost:5000/orders/${id}` , {
          method:"DELETE"
      })
      .then(res => res.json())
      .then(data => {
        if(data.deletedCount){
          const remaining = orders.filter(order => order._id !== id)
          serOrders(remaining);

        }
      })
    }
}

const handleStatusUpdate = id =>{
      fetch(`http://localhost:5000/orders/${id}` , {
        method:"PATCH",
        headers: {
          'content-type' : 'application/json'
        },
        body: JSON.stringify({status:"Approved"})

      })
      .then(res => res.json())
      .then(data => {
        if(data.modifiedCount > 0){
          const remaing =  orders.filter(order => order._id !== id)
          const approving = orders.find(oder => oder._id === id)
          approving.status = "Approved"
          const newOrders = [approving , ...remaing];
          serOrders(newOrders)

        }
      })
}
    return (
        <div>
             <h2 className="text-4xl">You have {orders.length} orders</h2>
             <div className="overflow-x-auto w-full">
  <table className="table w-full">
    <thead>
      <tr>
        <th>
          <label>
            <input type="checkbox" className="checkbox" />
          </label>
        </th>
        <th>Name</th>
        <th>Product</th>
        <th>Favorite Color</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {
        orders.map(order => <OrderRow key={order._id} handleStatusUpdate={handleStatusUpdate}  handleDelete={handleDelete} order={order}></OrderRow>)
      }
      
    </tbody>
    
    
  </table>
</div>
        </div>
    );
};

export default Orders;