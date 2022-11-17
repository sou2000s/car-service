import React from 'react';
import Products from '../../Products/Products';
import About from '../About/About';
import Banner from '../Banner/Banner';
import Services from '../Services/Services';

const Home = () => {
    return (
        <div>
           <Banner/>
           <About/>
           <Services/>
           <div className='my-10 flex justify-around p-24 rounded-xl text-white bg-[#151515] '>
               <div>
                   <img src="https://img.icons8.com/doodle/344/apple-calendar--v1.png" className='w-8' alt="" />
                   <small>We are open monday-friday</small>
                   <p>7:00 am - 9:00 pm</p>
               </div>
               <div>
                <img src="https://img.icons8.com/plasticine/344/ringer-volume.png" className='w-8' alt="" />
                <small>Have a question?</small>
                <p>+2546 251 2658</p>
               </div>
               <div>
                <img src="https://img.icons8.com/doodle/344/user-location.png" className='w-8' alt="" />
                <small>Need a repair? our address</small>
                <p>Liza Street, New York</p>
               </div>
           </div>

           <Products/>
        </div>
    );
};

export default Home;