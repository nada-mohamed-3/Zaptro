
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const LocationContext = createContext();

export default function LocationProvider({ children }) {
  const [location, setLocation] = useState(null);
  const [openDropDown, setOpenDropDown] = useState(false);
  const [openNav, setOpenNav] = useState(false);

  const getLocation = async () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

      try {
        const res = await axios.get(url);
        setLocation(res.data.address);
      } catch (err) {
        console.error("Error getting location:", err);
      }
    });
  };

  useEffect(() => {
    getLocation();
  }, []);

  

  

  return (
    <LocationContext.Provider value={{ location, getLocation, openDropDown, setOpenDropDown ,openNav, setOpenNav }}>
      {children}
    </LocationContext.Provider>
  );
}

export const useLocationContext = () => useContext(LocationContext);

