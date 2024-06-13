import { useContext } from 'react';

import Button from './UI/Button';
import CartContext from '../store/CartContext';
import logoImg from '../assets/logo.jpg';
import UserProgressContext from '../store/UserProgressContext';

export default function Header({}) {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const totalCartItems = cartCtx.items.reduce((totalNum, item) => {
    return totalNum + item.quantity;
  }, 0);

  function handleShowCart() {
    userProgressCtx.showCart();
  }

  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="logo" />
        <h1>FOODIE DELIVERY</h1>
      </div>
      <nav>
        <Button textOnly onClick={handleShowCart}>
          Cart ({totalCartItems})
        </Button>
      </nav>
    </header>
  );
}
