import { useEffect } from 'react';
import {getData } from '../Context/DataContext';
import { useNavigate } from 'react-router-dom';

function Category() {

const {categoryOnlyData} = getData()
const nav = useNavigate() 
   
  return (
    <div className='bg-[#101829]'>
       <div className="max-w-7xl mx-auto flex flex-wrap gap-4 items-center justify-center md:justify-around py-7 px-4">
            {
              categoryOnlyData.map((items, index)=>{
                   return <div key={index}>
                        <button 
                         onClick={()=>nav(`/category/${items}`)}
                           className="uppercase text-white bg-gradient-to-r from-red-500  to-purple-500 px-3 py-1 rounded-md cursor-pointer">
                             {items}
                          </button>
                   </div>   
              })
            }
       </div>
    </div>
  )
}

export default Category
