import React from "react";
import parts from '../../../assets/images/about_us/parts.jpg'
import person from '../../../assets/images/about_us/person.jpg'
const About = () => {
  return (
    <div className="hero  my-20">
      <div className="hero-content flex-col lg:flex-row">
          <div className="w-1/2 relative">
          <img
          alt=""
          src={person}
          className=" w-full h-4/5 rounded-lg shadow-2xl"
        />
          <img
          alt=""
          src={parts}
          className=" absolute w-3/5 right-5 top-1/2 rounded-lg shadow-2xl"
        />
         
          </div>
        <div className="w-1/2">
        <p className="text-2xl font-bold text-orange-600"> About us</p>
          <h1 className="text-5xl font-bold">We are qualified <br /> & of experience <br /> in this field</h1>
          <p className="py-6">
          There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.  <br />

          <br />
          the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. 
          </p>
          <button className="btn btn-primary">Get More info</button>
        </div>
      </div>
    </div>
  );
};

export default About;
