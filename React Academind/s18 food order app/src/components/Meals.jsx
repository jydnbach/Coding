import { useContext } from 'react';
import { formatPrice } from '../util/formatting';
import { useFetch } from '../hooks/useFetch';
import { fetchMeals } from '../http';
import Button from './UI/Button';
import { CartContext } from '../store/CartContext';

export default function Meals({}) {
  const { addItem } = useContext(CartContext);
  const { fetchedData: meals, isLoading, error } = useFetch(fetchMeals, []);

  function handleAddMealToCart(meal) {
    addItem(meal);
  }

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
                  <Button
                    onClick={() => handleAddMealToCart(meal)}
                    className="button"
                  >
                    Add to Cart
                  </Button>
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
