import { useContext } from 'react';
import logo from '../assets/logo.jpg';
import { MealsContext } from '../context/MealsContext';

export default function Header({ itemCount, handleClick }) {
  const { totalNumItems } = useContext(MealsContext);

  return (
    <header id="main-header">
      <div id="title">
        <img src={logo} alt="logo" />
        <h1>FOODIE DELIVERY</h1>
      </div>
      <nav>
        <button onClick={handleClick} className="button">
          Cart {totalNumItems()}
        </button>
      </nav>
    </header>
  );
}
