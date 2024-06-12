import { useState } from 'react';
import Cart from './components/Cart';
import Header from './components/Header';
import Meals from './components/Meals';
import { MealsProvider } from './context/MealsContextAndHook';
import { fetchMeals, fetchOrders } from './http';

function App() {
  const [cartIsOpen, setCartIsOpen] = useState(false);
  const [addItem, setAddItem] = useState([]);

  function openModal() {
    setCartIsOpen(true);
  }

  function handleAddItem(addedItem) {
    setAddItem((prevItems) => {
      return;
    });
  }

  return (
    <>
      <MealsProvider fetchFn={fetchOrders}>
        <Cart open={cartIsOpen}></Cart>
      </MealsProvider>
      <Header handleClick={openModal} />
      <MealsProvider fetchFn={fetchMeals}>
        <Meals addItem={handleAddItem} />
      </MealsProvider>
    </>
  );
}

export default App;
