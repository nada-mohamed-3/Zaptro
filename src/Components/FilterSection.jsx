import React from "react";
import { getData } from "../Context/DataContext";

function FilterSection({search, setSearch, categroy,setCategroy , priceRange, setPriceRange,handleCategoryChange, handleBrandChange, brand}) {
  const { categoryOnlyData } = getData();


  return (
    <div className="bg-gray-100 mt-10 p-4 rounded-md h-max hidden md:block">
      <input
        type="text"
        value={search}
        onChange={(e)=> setSearch(e.target.value)}
        placeholder="Search..."
        className="bg-white p-2 rounded-md  border-gray-400 border-2 outline-blue-500"
      />

      {/* Category only data */}
      <h1 className="mt-5 font-semibold text-xl">Category</h1>

      <div className="flex flex-col gap-2 mt-3">
        {categoryOnlyData?.map((item, index) => {
          return (
            <div key={index} className="flex gap-2">
              <input 
                  type="checkbox" 
                  name={item} 
                  value={item}
                  checked={categroy === item}
                  onChange={handleCategoryChange}
                  />
              <button className="cursor-pointer uppercase">{item}</button>
            </div>
          );
        })}
      </div>

      {/* <h1 className="mt-5 font-semibold text-xl mb-3">Select brand</h1>
      <select 
            value={categroy}
            className="bg-white w-full p-2 border-gray-200 border-2 rounded-md outline-blue-500"
            onChange={handleCategoryChange}
            > 
        {
          categoryOnlyData?.map((item, index) => {
            return <option key={index} value={item}>{item.toUpperCase()}</option>;
          })
        }
      </select> */}


      {/* price range */}
        <h1 className="mt-5 font-semibold text-xl mb-3">Price Range</h1>
         <div className="flex flex-col gap-2">
            <label>
               Price Range: ${priceRange[0]} - ${priceRange[1]}
              <input 
                    type="range" 
                    min="0" 
                    max="5000" 
                    value={priceRange[1]} 
                    onChange={(e)=>setPriceRange([priceRange[0], Number(e.target.value)])}
                    className='transition-all'
                    /> 
            </label>
          </div> 




          <button className="bg-red-500 text-white rounded-md px-2 py-2 mt-5 cursor-pointer"
                  onClick={()=>{setCategroy('All');setSearch(''); setPriceRange([0,5000]);}}   >
              Reset Filter
          </button>
    </div>
  );
}

export default FilterSection;
