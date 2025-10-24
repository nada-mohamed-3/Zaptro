import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItem, setCartItem] = useState([]);

  const addToCart = (product) => {
    const itemInCart = cartItem.find((item) => item.id === product.id);

    if (itemInCart) {
      // Increase quantity if already in cart  زياده العدد اذا كان المنتج موجود بالفعل
      const updatadCart = cartItem.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItem(updatadCart);
      toast.success("Product quantity increased!")
    } 
    else {
      //Add new ietm with quantity 1
      setCartItem([...cartItem, { ...product, quantity: 1 }]);
      toast.success("Product added to cart");
    }
  };

  const updateQuantity = (cartItem, productId, action) => {
    setCartItem(
      cartItem
        .map((item) => {
          if (item.id === productId) {
            let newUnit = item.quantity;

            if (action === "increase") {
              newUnit += 1;
              toast.success("Quantity is increased!")
            } else if (action === "decrease") {
              newUnit -= 1;
              toast.success("Quantity is decreased!")
            }
            return newUnit > 0 ? { ...item, quantity: newUnit } : null;
          }
          return item;

          // remove item qunatity 0
        }).filter((item) => item != null)
    );
  };

   const deleteItem = (productId) => {
        setCartItem(cartItem.filter(item => item.id !== productId))
        toast.success("Product is deleted from cart!")
    }//يعني هترجع كل العناصر ما عدا اللي id بتاعه = productId

  return (
    <CartContext.Provider
      value={{ cartItem, setCartItem, addToCart, updateQuantity, deleteItem }}
    >
      {children}
    </CartContext.Provider>
  );
};
export const useCart = () => useContext(CartContext);

// setCartItem([...cartItem, product])
//بيعمل نسخة من الـ cartItem
//وبعدين بيضيف المنتج الجديد (product) في آخر الـ array.
//وفي الآخر بيحدّث الـ state باستخدام setCartItem.
// console.log(cartItem);

// quantity
//تمنع تكرار نفس الـ product في السلة.
//تقدر تعرضها للمستخدم بسهولة

// لو عايز المنتج يتشال لما الكمية توصل صفر
// ، لازم تستخدم .filter
//  بعد الـ
// .map:
