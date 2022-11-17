import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import loginImage from '../../../src/assets/images/login/login.svg'
import { AuthContext } from '../../contexts/AuthProvider';
const SignUp = () => {
  const {createUser} = useContext(AuthContext);
  const navigate = useNavigate()
  const handleSignUp = (e) =>{
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    createUser(email , password)
    .then(res => {
      console.log(res.user);
      const currentUser = {
        email: email
      }
      fetch('http://localhost:5000/jwt' , {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(currentUser)
      })
      .then(res => res.json())
      .then(data => localStorage.setItem('jwt' , data.token))

   
      navigate('/')
    })

  
    .catch(error => console.log(error))
    console.log(email , password , name);
  }

    return (
        <div className=" my-10">
        <div className="hero-content ">
          <div className="text-center w-1/2 ">
             <img src={loginImage} alt="" />
             
          </div>
          <div  className="card flex-shrink-0 w-1/2 max-w-sm shadow-2xl bg-base-100">
          <h1 className="text-5xl text-center font-bold">Sign up Now</h1>
             
            <form  onSubmit={handleSignUp} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input type="text" placeholder="name" name='name' className="input input-bordered" />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="text" placeholder="email" name='email' className="input input-bordered" />
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" name='password' placeholder="password" className="input input-bordered" />
                <label className="label">
                  <Link  className="label-text-alt link link-hover" to='/login'>All ready have account? login</Link>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Sign up</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
};

export default SignUp;