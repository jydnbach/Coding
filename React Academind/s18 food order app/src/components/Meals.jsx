import { useContext } from 'react';
import { MealsContext } from '../context/MealsContextAndHook';

export default function Meals({ addItem }) {
  const { fetchedData: meals, isLoading, error } = useContext(MealsContext);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <ul id="meals">
      {meals.length > 0 ? (
        meals.map((meal) => (
          <li key={meal.id} className="meal-item">
            <img src={`http://localhost:3000/${meal.image}`} />
            <h3>{meal.name}</h3>
            <span className="meal-item-price">{meal.price}</span>
            <article className="meal-item-description">
              {meal.description}
            </article>
            <button onClick={() => addItem(meal)} className="button">
              Add to Cart
            </button>
          </li>
        ))
      ) : (
        <div>no meals</div>
      )}
    </ul>
  );
}
