import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../assets/Loading4.webm";
import { ChevronLeft } from "lucide-react";
import ProductListView from "../Components/ProductListView";



function CategoryProduct() {
  
  const params = useParams();
  const nav = useNavigate()
  
  const [searchData, setSearchData] = useState([]);


  const category = params.category;
  console.log(category);

  // const getFilteredData = async () => {
  //   try {
  //     const res = await axios.get(`https://fakestoreapi.com/products/category/${category}`);
  //     const data = res.data;
  //     setSearchData(data);
  //   }
  //    catch (err) {
  //     console.log(err);
  //   }
  // };


  const getFilteredData = async () => {
  try {
    let res;
    if (category.toLowerCase() === "all") {
      res = await axios.get("https://fakestoreapi.com/products");
    } 
    else {
      res = await axios.get(`https://fakestoreapi.com/products/category/${category}`);
    }
    setSearchData(res.data);
  } 
  catch (err) {
    console.log(err);
  }
};



  useEffect(() => {
    getFilteredData();
    window.scrollTo(0, 0);
  }, []);



  return (
    <div>
        {
           searchData.length > 0 ? 
           (
             <div className="max-w-6xl mx-auto mt-10 mb-10 px-4">
                  
                  <button onClick={()=> nav('/')} className="bg-gray-800 mb-5 text-white px-3 py-1 rounded-md cursor-pointer flex gap-1 items-center">
                      <ChevronLeft/>
                        Back
                  </button>


                  {
                    searchData.map((product, index)=>{
                      return (
                        <ProductListView key={index} product={product}/>
                      )
                    })
                  }
             </div>
           ) 
           : 
           (
              <div className="flex items-center justify-center h-[400px]">
                   <video autoPlay loop muted>
                      <source src={Loading} type="video/webm" />
                  </video> 
              </div>
           )
        }
    </div>
  )
}

export default CategoryProduct;
