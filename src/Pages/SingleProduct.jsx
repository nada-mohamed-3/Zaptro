import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../assets/Loading4.webm";
import Breadcrums from "../Components/Breadcrums";
import { IoCartOutline } from "react-icons/io5";
import { useCart } from "../Context/CartContext";




function SingleProduct() {
  const [quantity, setQuantity] = useState(1);


  const {addToCart} = useCart()

  const params = useParams();
  console.log(params);

  const [singleProduct, setsingleProduct] = useState("");

  const SingleProduct = async () => {
    try {
      const res = await axios.get(
        `https://fakestoreapi.com/products/${params.id}`
      );
      console.log(res);
      const product = res.data;
      product.discount = Math.floor(Math.random() * 41) + 10; //خصم عشوائي   بين 10% و 50%.
      setsingleProduct(product);
    } 
    catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    SingleProduct();
  }, []);

  

  const discount = singleProduct.discount;
  const finalPrice = singleProduct.price - (singleProduct.price * discount) / 100;

  return (
    <>
      {
        singleProduct ? 
        (
          
          <div className="px-4 pb-4 md:px-0">
            <Breadcrums title={singleProduct.title}/>
            
            <div className="max-w-6xl mx-auto md:p-6 grid grid-cols-1 md:grid-cols-2 gap-10">
                 {/* product image */}
                <div className="w-full">
                   <img 
                     src={singleProduct.image} 
                     alt={singleProduct.title} 
                     className="rounded-2xl w-full object-cover"
                     />
                </div>

                {/* product details */}
                <div className="flex flex-col gap-6">
                     
                     <h1 className="md:text-3xl text-xl font-bold text-gray-800">
                          {singleProduct.title}
                      </h1>
                    
                    <div className="text-gray-700">
                      {singleProduct.category?.toUpperCase()} /
                    </div>  

                   <p className='text-xl text-red-500 font-bold'>${singleProduct.price} <span className='line-through text-gray-700'>${finalPrice.toFixed(2)}</span> <span className='bg-red-500 text-white px-4 py-2 rounded-full'>{discount}% discount</span></p>
                   
                   <p className="text-gray-600">
                       {singleProduct.description}
                   </p>

                   {/* qunatity selector */}
                    <div className='flex items-center gap-4'>
                         <label className='text-sm font-medium text-gray-700'>Quantity:</label>
                         <input 
                            type="number" 
                            min={1}

                            value={quantity} 
                            onChange={(e) => setQuantity(Number(e.target.value))} // ✅ تحديث الكمية
                            
                            className='w-20 border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-red-500'/>
                    </div>

                     <div className='flex gap-4 mt-4'>
                          <button 
                              onClick={()=>addToCart({ ...singleProduct, quantity })} 
                              className='px-6 flex gap-2 py-2 text-lg bg-red-500 text-white rounded-md cursor-pointer'>
                              <IoCartOutline className='w-6 h-6'/> 
                              Add to Cart
                          </button>
                      </div>
                </div>
            </div> 
          </div> 
        ) 
        : 
        (
          <div className="flex items-center justify-center h-screen">
            <video autoPlay loop muted>
              <source src={Loading} type="video/webm" />
            </video>
          </div>
        )
      }
    </>
  );
}

export default SingleProduct;
