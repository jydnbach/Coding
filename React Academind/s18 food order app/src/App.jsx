import { useState } from 'react';
import Cart from './components/Cart';
import Header from './components/Header';
import Meals from './components/Meals';
import { MealsProvider } from './context/MealsContextAndHook';
import { fetchMeals, fetchOrders } from './http';

function App() {
  const [cartIsOpen, setCartIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  function openModal() {
    setCartIsOpen(true);
  }

  function handleCloseCart() {
    setCartIsOpen(false);
  }

  function handleAddItem(addedItem) {
    setCartItems((prevItems) => {
      return [...prevItems, addedItem];
    });
  }

  return (
    <>
      <MealsProvider fetchFn={fetchOrders}>
        <Cart open={cartIsOpen} closeCart={handleCloseCart}></Cart>
        <Header handleClick={openModal} itemCount={cartItems.length} />
      </MealsProvider>
      <MealsProvider fetchFn={fetchMeals}>
        <Meals addItem={handleAddItem} />
      </MealsProvider>
    </>
  );
}

export default App;
