import React from 'react'
import { IoCartOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../Context/CartContext';

function ProductCard({product}) {
  // console.log(product);
  
  const navigate = useNavigate()
  
  const {addToCart} = useCart()
   
  return (
    <div className='relative border border-gray-100 bg-gray-100/50 rounded-2xl cursor-pointer hover:scale-105 hover:shadow-2xl transition-all p-2 '>
      <img 
          src={product.image} 
          alt={product.title} 
          className='bg-gray-100 aspect-auto object-contain p-4' 
          onClick={()=> navigate(`/products/${product.id}`)} />

          <h1 className='line-clamp-2 p-1 font-semibold'>
            {product.title}
          </h1>

          <p className='my-1 text-lg text-gray-800 font-bold'>
            ${product.price}
          </p>

          <button onClick={()=> addToCart(product)} className="bg-red-500 px-1 py-1 text-lg rounded-md text-white w-full cursor-pointer flex gap-2 items-center justify-center font-semibold">
            <IoCartOutline className='w-6 h-6' />
            Add To Cart
          </button>
          
    </div>
  )
}

export default ProductCard
