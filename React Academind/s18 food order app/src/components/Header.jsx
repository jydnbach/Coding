import logo from '../assets/logo.jpg';

export default function Header({ itemCount, handleClick }) {
  return (
    <header id="main-header">
      <div id="title">
        <img src={logo} alt="logo" />
        <h1>REACTFOOD</h1>
      </div>
      <nav>
        <button onClick={handleClick}>Cart {itemCount}</button>
      </nav>
    </header>
  );
}
