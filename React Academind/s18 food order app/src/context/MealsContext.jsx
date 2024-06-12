import { createContext, useState } from 'react';

export const MealsContext = createContext();

export const MealsProvider = ({ children, fetchFn, initialValue = [] }) => {
  const [cartItems, setCartItems] = useState([]);

  // Manage cart
  function updateCartItems(newCartItems) {
    setCartItems(newCartItems);
  }

  // Add cart items. Keeps track of quantity as well.
  function handleAddItem(addedItem) {
    setCartItems((prevItems) => {
      const existingItems = prevItems.find((item) => item.id === addedItem.id);
      if (existingItems) {
        return prevItems.map((item) => ({
          ...item,
          quantity: item.quantity + 1,
        }));
      } else {
        return [...prevItems, { ...addedItem, quantity: 1 }];
      }
    });
  }

  // Item count
  function totalNumItems() {
    let sum = 0;
    for (let item of cartItems) {
      sum += Number(item.quantity);
    }
    return sum;
  }

  return (
    <MealsContext.Provider
      value={{
        cartItems,
        updateCartItems,
        handleAddItem,
        totalNumItems,
      }}
    >
      {children}
    </MealsContext.Provider>
  );
};
