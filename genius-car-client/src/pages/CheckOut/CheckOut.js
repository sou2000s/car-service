import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';

const CheckOut = () => {
    const service = useLoaderData()
   const {price} = service;
    const {user} = useContext(AuthContext)
    

    const handlePlaceOrder = e => {
        e.preventDefault()
        const form = e.target;
        const name = `${form.firstName.value} ${form.lastName.value}`;
        const email = user?.email || "register";
        const phone = form.phone.value;
        const message = form.message.value;

        const order = {
            service:service._id ,
            serviceName:service.title,
            price,
            customer: name,
            email,
            phone,
            message
        }
  
        //   if(phone.length > 10){
        //     alert('phone number shouldbe 10 charecters or longer')
        //   }


        fetch('http://localhost:5000/orders' , {
            method:"POST",
            headers: {
                'content-type' : 'application/json',
                authorization: `Bearer ${localStorage.getItem('jwt')}`
            },
            body:JSON.stringify(order)
        })
        .then(res => res.json())
        .then(data=> {
            if(data.acknowledged){
                form.reset()
                alert('order placed')
            }
        })
        .catch(er=> console.error(er))

    }
    return (
        <div>
            
            <form  onSubmit={handlePlaceOrder}>
            <h2 className="text-4xl">Your order:{service.title}</h2>
            <h2 className="text-3xl">Price{service.price}</h2>
            <div className='grid md:grid-cols-2'>
            <input type="text"  name='firstName'  placeholder="Type here" className="input input-bordered input-accent w-full max-w-xs" />
            <input type="text"  name='lastName' placeholder="Type here" className="input input-bordered input-accent w-full max-w-xs" />
            <input type="text"  name='phone'  placeholder="Type here" className="input input-bordered input-accent w-full max-w-xs"  required/>
            <input type="email"  name='email' placeholder="Type here" defaultValue={user?.email} readOnly className="input input-bordered input-accent w-full max-w-xs" />
            </div>
            <textarea className="textarea textarea-bordered h-24 w-60" name='message' placeholder="messages"></textarea>
             
            <input className='btn btn-accent ml-10' type="submit" value="place your order" />
            </form>
        </div>
    );
};

export default CheckOut;