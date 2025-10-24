// خطوات عمل Context للـ Location
//1. اعملي ملف Context جديد (مثلًا LocationContext.jsx)
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

// 1️⃣ إنشاء context
const LocationContext = createContext();

// 2️⃣ Provider
export function LocationProvider({ children }) {
  const [location, setLocation] = useState(null);

  const getLocation = async () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

      try {
        const res = await axios.get(url, {
          headers: {
            "User-Agent": "my-react-app", // مهم مع Nominatim
          },
        });
        setLocation(res.data.address);
      } catch (err) {
        console.error(err);
      }
    });
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <LocationContext.Provider value={{ location }}>
      {children}
    </LocationContext.Provider>
  );
}

// 3️⃣ Hook للاستخدام في أي مكان
// export function useLocationContext() {
//   return useContext(LocationContext);
// }


//2. لفي بس Navbar بالـ Provider (في App.jsx):
import { NavbarProvider } from "./NavbarContext";
import Navbar from "./Components/Navbar";

// ...
<BrowserRouter>
  <NavbarProvider>
    <Navbar />
  </NavbarProvider>
  <Routes>
    {/* باقي الصفحات */}
  </Routes>
</BrowserRouter>


//3. استخدميه جوه Navbar (أو أي Component)
import { MapPin } from "lucide-react";
import { FaCaretDown } from "react-icons/fa";
import { useLocationContext } from "../LocationContext";

function Navbar() {
  const { location } = useLocationContext();

  return (
    <div className="flex gap-2 items-center">
      <MapPin className="text-red-500" />
      {location ? (
        <div className="-space-y-2">
          <p>{location.country}</p>
          <p>{location.state}</p>
        </div>
      ) : (
        "Add Address"
      )}
      <FaCaretDown />
    </div>
  );
}

export default Navbar;
