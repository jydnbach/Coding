import { useState } from 'react';
import Cart from './components/Cart';
import Header from './components/Header';
import Meals from './components/Meals';
import { MealsProvider } from './context/MealsContext';

function App() {
  // Manage modal open & close
  const [cartIsOpen, setCartIsOpen] = useState(false);

  function openModal() {
    setCartIsOpen(true);
  }

  function handleCloseCart() {
    setCartIsOpen(false);
  }
  ////////////////

  return (
    <>
      <MealsProvider>
        <Cart open={cartIsOpen} closeCart={handleCloseCart}></Cart>
        <Header handleClick={openModal} />
        <Meals />
      </MealsProvider>
    </>
  );
}

export default App;
