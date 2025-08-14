import { createSlice } from "@reduxjs/toolkit";

const updateTotal = (basket) => {
  let totalCount = 0;
  let totalPrice = 0;

  basket.forEach((product) => {
    totalCount += product.count;
    totalPrice += product.price * product.count;
  });

  return { totalCount, totalPrice };
};

const loadBasket = () => {
  return { basket: [], totalCount: 0, totalPrice: 0 };
};

const saveBasket = (basket) => {
};

const productSlice = createSlice({
  name: "product",
  initialState: loadBasket(),
  reducers: {
    addProduct: (state, { payload }) => {
      const existingProduct = state.basket.find(
        (item) => item.id === payload.id
      );

      if (!existingProduct) {
        state.basket.push(payload);
        const { totalCount, totalPrice } = updateTotal(state.basket);
        state.totalCount = totalCount;
        state.totalPrice = totalPrice;
        saveBasket(state.basket);
      }
    },

    delProduct: (state, { payload }) => {
      state.basket = state.basket.filter((product) => product.id !== payload);
      const { totalCount, totalPrice } = updateTotal(state.basket);
      state.totalCount = totalCount;
      state.totalPrice = totalPrice;
      saveBasket(state.basket);
    },

    addProductCount: (state, { payload }) => {
      const productIndex = state.basket.findIndex(
        (product) => product.id === payload
      );

      if (productIndex !== -1) {
        state.basket[productIndex].count += 1;
        const { totalCount, totalPrice } = updateTotal(state.basket);
        state.totalCount = totalCount;
        state.totalPrice = totalPrice;
        saveBasket(state.basket);
      }
    },

    delProductCount: (state, { payload }) => {
      const productIndex = state.basket.findIndex(
        (product) => product.id === payload
      );

      if (productIndex !== -1 && state.basket[productIndex].count > 1) {
        state.basket[productIndex].count -= 1;
        const { totalCount, totalPrice } = updateTotal(state.basket);
        state.totalCount = totalCount;
        state.totalPrice = totalPrice;
        saveBasket(state.basket);
      }
    },

    deleteAll: (state) => {
      state.basket = [];
      state.totalCount = 0;
      state.totalPrice = 0;
      saveBasket([]);
    },
  },
});

export const {
  addProduct,
  addProductCount,
  delProduct,
  delProductCount,
  deleteAll,
} = productSlice.actions;

export default productSlice.reducer;
