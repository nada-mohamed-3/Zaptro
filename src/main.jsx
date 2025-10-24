import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ClerkProvider } from "@clerk/clerk-react";
import { DataProvider } from "./Context/DataContext.jsx";
import { CartProvider } from "./Context/CartContext.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Scroll } from "lucide-react";
import ScrollToTop from "react-scroll-to-top";
import LocationProvider from "./Context/LocationContext.jsx";
;




// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

createRoot(document.getElementById("root")).render(
  <DataProvider>
    <CartProvider>
      <LocationProvider>
            <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <App />
        <ScrollToTop color="white" smooth style={{ backgroundColor:'#fa2d37', display: "flex", alignItems: "center", justifyContent: "center"}}/>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
             </ClerkProvider>
      </LocationProvider>
    </CartProvider>
  </DataProvider>
);
