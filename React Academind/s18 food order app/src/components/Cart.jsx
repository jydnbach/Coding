import { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useContext } from 'react';
import { MealsContext } from '../context/MealsContext';
import { useFetch } from '../hooks/useFetch';
import { fetchOrders } from '../http';

function Cart({ open, closeCart }) {
  const { cartItems, updateCartItems } = useContext(MealsContext);
  const { fetchedData: orders, isLoading, error } = useFetch(fetchOrders, []);

  const dialog = useRef();

  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open]);

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
  for (let item of cartItems) {
    totalPrice += Number(item.price * item.quantity);
  }

  return createPortal(
    <dialog className="modal cart" ref={dialog} onClose={closeCart}>
      <h2>Your Cart</h2>
      <ul>
        {cartItems.map((order) => (
          <li key={order.id} className="cart-item">
            <p>{order.name}</p>
            <div>
              <button onClick={() => handleDecrement(order.id)}>-</button>
              <p>{order.quantity}</p>
              <button onClick={() => handleIncrement(order.id)}>+</button>
            </div>
          </li>
        ))}
      </ul>
      <p className="cart-total">{totalPrice}</p>
      <p className="modal-actions">
        <button onClick={closeCart} className="text-button">
          Close
        </button>
        <button className="button">Go to Checkout</button>
      </p>
    </dialog>,
    document.getElementById('modal')
  );
}

export default Cart;
