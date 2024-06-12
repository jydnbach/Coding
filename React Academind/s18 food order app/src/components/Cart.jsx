import { useContext } from 'react';

import { useFetch } from '../hooks/useFetch';
import { fetchOrders } from '../http';

import { CartContext } from '../store/CartContext';
import Modal from './UI/Modal';
import { formatPrice } from '../util/formatting';
import Button from './UI/Button';
import UserProgressContext from '../store/UserProgressContext';

export default function Cart({}) {
  const { items } = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  const { fetchedData: orders, isLoading, error } = useFetch(fetchOrders, []);

  function handleDecrement(itemId) {
    updateCartItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.id === itemId && item.quantity > 0) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
    });
  }

  function handleIncrement(itemId) {
    updateCartItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.id === itemId) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
    });
  }

  // total price calculation
  let totalPrice = 0;
  for (let item of items) {
    totalPrice += Number(item.price * item.quantity);
  }

  return (
    <Modal
      open={open}
      className="cart"
      open={userProgressCtx.progress === 'cart'}
    >
      <h2>Your Cart</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id} className="cart-item">
            <p>
              {item.name} - {item.quantity}
            </p>
            <div>
              <button onClick={() => handleDecrement(item.id)}>-</button>
              <p>{item.quantity}</p>
              <button onClick={() => handleIncrement(item.id)}>+</button>
            </div>
          </li>
        ))}
      </ul>
      <p className="cart-total">{formatPrice(totalPrice)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={userProgressCtx.progress === ''}>
          Close
        </Button>
        <Button>Go to Checkout</Button>
      </p>
    </Modal>
  );
}
