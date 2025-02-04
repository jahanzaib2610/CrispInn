import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  addFoodItem,
  updateFoodItem,
  deleteFoodItem,
  addCategory,
} from "../store/slices/foodSlice";
import ChartDataLabels from "chartjs-plugin-datalabels";


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

function AdminPanel() {
  const dispatch = useDispatch();
  const { items, categories, salesData } = useSelector((state) => state.food);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    image: "",
    ingredients: "",
    discount: "0",
  });
  const [newCategory, setNewCategory] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [timeRange, setTimeRange] = useState("daily");

  const chartData = {
    daily: {
      labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
      data: salesData.daily,
    },
    weekly: {
      labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      data: salesData.weekly,
    },
    monthly: {
      labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
      data: salesData.monthly,
    },
    yearly: {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      data: salesData.yearly,
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const foodItem = {
      ...formData,
      id: editingId || items.length + 1,
      price: parseFloat(formData.price),
      discount: parseFloat(formData.discount),
      ingredients: formData.ingredients.split(",").map((i) => i.trim()),
    };

    if (editingId) {
      dispatch(updateFoodItem(foodItem));
      toast.success("Food item updated!");
    } else {
      dispatch(addFoodItem(foodItem));
      toast.success("Food item added!");
    }

    setFormData({
      name: "",
      category: "",
      price: "",
      image: "",
      ingredients: "",
      discount: "0",
    });
    setEditingId(null);
  };

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (newCategory.trim()) {
      dispatch(addCategory(newCategory.trim()));
      toast.success("Category added!");
      setNewCategory("");
    }
  };

  const handleEdit = (item) => {
    setFormData({
      name: item.name,
      category: item.category,
      price: item.price.toString(),
      image: item.image,
      ingredients: item.ingredients.join(", "),
      discount: (item.discount || 0).toString(),
    });
    setEditingId(item.id);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      dispatch(deleteFoodItem(id));
      toast.success("Food item deleted!");
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Admin Panel</h1>

      {/* Sales Chart */}
      <div className="card p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Sales Overview</h2>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 rounded-lg border dark:border-gray-700 dark:bg-gray-800"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>
        <Line
          data={{
            labels: chartData[timeRange].labels,
            datasets: [
              {
                label: "Sales",
                data: chartData[timeRange].data,
                borderColor: "rgb(75, 192, 192)",
                tension: 0.1,
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "top",
              },
              title: {
                display: true,
                text: `${
                  timeRange.charAt(0).toUpperCase() + timeRange.slice(1)
                } Sales`,
              },
            },
          }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Add Category Form */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-4">Add New Category</h2>
          <form onSubmit={handleAddCategory} className="flex gap-4">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Category name"
              className="flex-grow px-4 py-2 rounded-lg border dark:border-gray-700 dark:bg-gray-800"
            />
            <button type="submit" className="btn btn-primary">
              Add Category
            </button>
          </form>
        </div>

        {/* Add/Edit Food Item Form */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-4">
            {editingId ? "Edit Food Item" : "Add New Food Item"}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                required
                className="w-full px-4 py-2 rounded-lg border dark:border-gray-700 dark:bg-gray-800"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, category: e.target.value }))
                }
                required
                className="w-full px-4 py-2 rounded-lg border dark:border-gray-700 dark:bg-gray-800"
              >
                <option value="">Select category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-2">Price</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, price: e.target.value }))
                  }
                  required
                  className="w-full px-4 py-2 rounded-lg border dark:border-gray-700 dark:bg-gray-800"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Discount (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.discount}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      discount: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-2 rounded-lg border dark:border-gray-700 dark:bg-gray-800"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Image URL
              </label>
              <input
                type="text"
                value={formData.image}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, image: e.target.value }))
                }
                required
                className="w-full px-4 py-2 rounded-lg border dark:border-gray-700 dark:bg-gray-800"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Ingredients (comma-separated)
              </label>
              <textarea
                value={formData.ingredients}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    ingredients: e.target.value,
                  }))
                }
                required
                className="w-full px-4 py-2 rounded-lg border dark:border-gray-700 dark:bg-gray-800"
              />
            </div>

            <div className="flex gap-4">
              <button type="submit" className="flex-1 btn btn-primary">
                {editingId ? "Update Item" : "Add Item"}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setFormData({
                      name: "",
                      category: "",
                      price: "",
                      image: "",
                      ingredients: "",
                      discount: "0",
                    });
                    setEditingId(null);
                  }}
                  className="btn bg-gray-200 dark:bg-gray-700"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Food Items List */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Food Items</h2>
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="card p-4">
              <div className="flex items-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="ml-4 flex-grow">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {item.category} - ${item.price}
                    {item.discount > 0 && ` (${item.discount}% OFF)`}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
