import axios from "axios";
import { createContext, useContext, useState } from "react";

export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [data, setData] = useState();

  // fetching all products from api
  const fetchAllProducts = async () => {
    try {
      const res = await axios.get(`https://fakestoreapi.com/products`);
      // console.log(res);
      const productsData = res.data;
      setData(productsData);
    } catch (err) {
      console.log(err);
    }
  };


  // Categories
  const getUniqueCategories = (data, property) => {
    let newVal = data?.map((curElem) => {
      return curElem[property];
    });
    newVal = ["All", ...new Set(newVal)];
    return newVal;
  };
  const categoryOnlyData = getUniqueCategories(data, "category");
  // console.log(categoryOnlyData);
  // const categoryOnlyData = getUniqueCategories(data, "brand");
  





  return (
    <DataContext.Provider
      value={{ data, setData, fetchAllProducts, categoryOnlyData}}
    >
      {children}
    </DataContext.Provider>
  );
};

export const getData = () => useContext(DataContext);
