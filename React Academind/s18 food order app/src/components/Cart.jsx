import { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useContext } from 'react';
import { MealsContext } from '../context/MealsContextAndHook';

function Cart({ open, onClose }) {
  const { fetchedData: orders, isLoading, error } = useContext(MealsContext);

  const dialog = useRef();

  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open]);

  return createPortal(
    <>
      <dialog className="cart" ref={dialog} onClose={onClose}>
        <h2>Your Cart</h2>
        <ul>
          {orders.map((order) => (
            <li key={order.id}>{order.name}</li>
          ))}
        </ul>
      </dialog>
    </>,
    document.getElementById('modal')
  );
}

export default Cart;
