import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';

const Products = () => {
    const [products , setProducts] = useState([]);

    useEffect(()=>{
        fetch('products.json')
        .then(res => res.json())
        .then(data=> setProducts(data))
    } , [])
    return (
        <div className='my-10'>
           <div className='text-center mb-12'>
           <h1 className='text-orange-600 text-center'>Popular Products</h1>
            <h1 className='text-5xl '>Browse Our Products</h1>
            <p>the majority have suffered alteration in some form, by injected humour, <br /> or randomised words which don't look even slightly believable. </p>
           </div>

          <div className='grid grid-cols-3 gap-5'>
            {
                products.map(product => <ProductCard key={product.id} product={product}></ProductCard>)
            }
          </div>

        </div>
    );
};

export default Products;