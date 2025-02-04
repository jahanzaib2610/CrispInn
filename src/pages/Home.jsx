import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { setSearchQuery } from "../store/slices/foodSlice";
import { FaSearch } from "react-icons/fa"; // Import Search Icon

function Home() {
  const dispatch = useDispatch();
  const { items, categories, searchQuery } = useSelector((state) => state.food);
  console.log(items);
  
  const [searchInput, setSearchInput] = useState(searchQuery);
  const navigate = useNavigate();

  // ** Filter items based on search query **
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // const featuredItems = filteredItems.filter(item => item.discount).slice(0, 3);
  const featuredItems = filteredItems.filter((item) => item.discount > 0);

  const itemsByCategory = categories.reduce((acc, category) => {
    acc[category] = filteredItems.filter(
      (item) => item.category.toLowerCase() === category.toLowerCase()
    );
    return acc;
  }, {});

  return (
    <div>
      {/* Search Bar */}
      <div className="mb-8">
        <div className="max-w-md mx-auto relative">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => {
              const value = e.target.value.trim().toLowerCase();
              setSearchInput(value);
              dispatch(setSearchQuery(value)); // Dispatch search query on every keypress
            }}
            placeholder="Search for food..."
            className="w-full px-4 py-2 pl-10 rounded-lg border dark:border-gray-700 dark:bg-gray-800"
          />
          <FaSearch
            size={18}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          />
        </div>
      </div>

      {/* Featured Items Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Featured Deals</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredItems.length > 0 ? (
            featuredItems.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.05 }}
                className="card relative overflow-hidden"
                onClick={() => navigate(`/food/${item.id}`)}
              >
                {item.discount && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded-full">
                    {item.discount}% OFF
                  </div>
                )}
                <img
                  loading="lazy"
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-lg font-bold">
                        ${(item.price * (1 - item.discount / 100)).toFixed(2)}
                      </span>
                      {item.discount && (
                        <span className="ml-2 text-sm line-through text-gray-500">
                          ${item.price}
                        </span>
                      )}
                    </div>
                    <Link to={`/food/${item.id}`} className="btn btn-primary">
                      Order Now
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-center text-gray-500">
              No featured items found.
            </p>
          )}
        </div>
      </section>

      {/* Categories Section */}
      {Object.keys(itemsByCategory)
        .filter((category) => itemsByCategory[category])
        .map((category) => (
          <section key={category} className="mb-12">
            <h2 className="text-2xl font-bold mb-6">{category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {itemsByCategory[category] &&
              itemsByCategory[category].length > 0 ? (
                itemsByCategory[category].map((item) => (
                  <motion.div
                    key={item.id}
                    whileHover={{ scale: 1.05 }}
                    className="card"
                    onClick={() => navigate(`/food/${item.id}`)}
                  >
                    <img
                      loading="lazy"
                      src={item.image}
                      alt={item.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-xl font-semibold mb-2">
                        {item.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {item.ingredients.join(", ")}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold">${item.price}</span>
                        <Link
                          to={`/food/${item.id}`}
                          className="btn btn-primary"
                        >
                          Order Now
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <p className="text-center text-gray-500">
                  No items found in this category.
                </p>
              )}
            </div>
          </section>
        ))}
    </div>
  );
}

export default Home;
