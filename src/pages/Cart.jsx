import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { removeFromCart } from '../store/slices/cartSlice';

function Cart() {
  const dispatch = useDispatch();
  const { items, total } = useSelector(state => state.cart);

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <Link to="/" className="btn btn-primary">
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      
      <div className="card mb-6">
        {items.map(item => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center p-4 border-b dark:border-gray-700 last:border-0"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-24 object-cover rounded"
            />
            <div className="ml-4 flex-grow">
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Quantity: {item.quantity}
              </p>
              <p className="font-bold">Rs.{(item.price * item.quantity).toFixed(2)}</p>
            </div>
            <button
              onClick={() => dispatch(removeFromCart(item.id))}
              className="text-red-500 hover:text-red-700"
            >
              Remove
            </button>
          </motion.div>
        ))}
      </div>

      <div className="flex items-center justify-between mb-8">
        <div className="text-xl font-bold">
          Total: Rs.{total.toFixed(2)}
        </div>
        <Link to="/checkout" className="btn btn-primary">
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}

export default Cart