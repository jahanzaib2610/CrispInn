import { createSlice } from '@reduxjs/toolkit';
import { mockFoodItems } from '../../data/mockData';

const initialState = {
  items: mockFoodItems,
  categories: ['Pizza', 'Burgers', 'Sandwiches', 'Wings', 'Starters', 'Drinks'],
  selectedCategory: 'all',
  searchQuery: '',
  salesData: {
    daily: Array.from({ length: 24 }, () => Math.floor(Math.random() * 50)),
    weekly: Array.from({ length: 7 }, () => Math.floor(Math.random() * 200)),
    monthly: Array.from({ length: 30 }, () => Math.floor(Math.random() * 500)),
    yearly: Array.from({ length: 12 }, () => Math.floor(Math.random() * 5000)),
  },
};

const foodSlice = createSlice({
  name: 'food',
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    addFoodItem: (state, action) => {
      state.items.push(action.payload);
    },
    updateFoodItem: (state, action) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteFoodItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    addCategory: (state, action) => {
      if (!state.categories.includes(action.payload)) {
        state.categories.push(action.payload);
      }
    },
    updateSalesData: (state, action) => {
      state.salesData = { ...state.salesData, ...action.payload };
    },
  },
});

export const {
  setCategory,
  setSearchQuery,
  addFoodItem,
  updateFoodItem,
  deleteFoodItem,
  addCategory,
  updateSalesData,
} = foodSlice.actions;
export default foodSlice.reducer;