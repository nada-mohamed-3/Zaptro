import { createContext, useContext, useState } from "react";
import { getData } from "./DataContext";



export const ProductContext = createContext();


export default function ProducProvidert({children}) {
      const { data, fetchAllProducts } = getData();
    
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [categroy, setCategroy] = useState("All");
    const [priceRange, setPriceRange] = useState([0, 5000]);

    const pageHandler = (selectedPage) => {
       setPage(selectedPage);
       window.scrollTo(0, 0);
  };
  const handleCategoryChange = (e) => {
    setCategroy(e.target.value);
    setPage(1);
    setOpenFilter(false);
  };

  const filteredData = data?.filter((item) => {
    return (
      item.title.toLowerCase().includes(search.toLowerCase()) &&
      (categroy === "All" || item.category === categroy) &&
      // (brand === "All" || item.brand === brand) &&
      item.price >= priceRange[0] &&
      item.price <= priceRange[1]
    );
  });

  const dynamicPage = Math.ceil(filteredData?.length / 8);
  return (
    <>
      <ProductContext.Provider value={{pageHandler, page, dynamicPage,handleCategoryChange}}>
        {children}
      </ProductContext.Provider>
    </>
  )
}
export const getProduct = () => useContext(ProductContext);
