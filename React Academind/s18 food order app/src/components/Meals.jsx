import { useContext } from 'react';
import { MealsContext } from '../context/MealsContextAndHook';
import { formatPrice } from '../util/formatting';

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
            <article>
              <img src={`http://localhost:3000/${meal.image}`} />
              <div>
                <h3>{meal.name}</h3>
                <p className="meal-item-price">{formatPrice(meal.price)}</p>
                <p className="meal-item-description">{meal.description} </p>
                <p className="meal-item-actions">
                  <button onClick={() => addItem(meal)} className="button">
                    Add to Cart
                  </button>
                </p>
              </div>
            </article>
          </li>
        ))
      ) : (
        <div>no meals</div>
      )}
    </ul>
  );
}
