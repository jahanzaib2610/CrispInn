import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { addToCart } from '../store/slices/cartSlice';

function FoodDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const item = useSelector(state => 
    state.food.items.find(item => item.id === parseInt(id))
  );

  if (!item) {
    return <div>Food item not found</div>;
  }

  const handleAddToCart = () => {
    dispatch(addToCart(item));
    toast.success('Added to cart!');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto"
    >
      <div className="card">
        <div className="md:flex">
          <div className="md:w-1/2">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-[400px] object-cover"
            />
          </div>
          <div className="p-6 md:w-1/2">
            <h1 className="text-3xl font-bold mb-4">{item.name}</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Category: {item.category}
            </p>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Ingredients:</h2>
              <ul className="list-disc list-inside">
                {item.ingredients.map((ingredient, index) => (
                  <li key={index} className="text-gray-600 dark:text-gray-400">
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-center justify-between mb-6">
              <span className="text-2xl font-bold">${item.price}</span>
              <button onClick={handleAddToCart} className="btn btn-primary">
                Add to Cart
              </button>
            </div>
            <button
              onClick={() => navigate(-1)}
              className="text-gray-600 dark:text-gray-400 hover:underline"
            >
              ← Back to Menu
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default FoodDetails