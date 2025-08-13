import { createSlice } from "@reduxjs/toolkit";

const updateTotel = (bascet) => {
  let totalCount = 0;
  let totalPrice = 0;
  bascet.map((product) => {
    totalCount += product.count;
    totalPrice += product.price * product.count;
  });
  return { totalCount, totalPrice };
};

const loadBasket = () => {
  try {
    const saved = localStorage.getItem("basket");
    if (saved) {
      const bascet = JSON.parse(saved);
      const { totalCount, totalPrice } = updateTotel(bascet);
      return { bascet, totalCount, totalPrice };
    }
  } catch {}
  return { bascet: [], totalCount: 0, totalPrice: 0 };
};

const saveBasket = (bascet) => {
  try {
    localStorage.setItem("basket", JSON.stringify(bascet));
  } catch {}
};

const product = createSlice({
  name: "product",
  initialState: loadBasket(),
  reducers: {
    addProduct: (state, { payload }) => {
      state.bascet = [...state.bascet, payload];
      const { totalCount, totalPrice } = updateTotel(state.bascet);
      state.totalCount = totalCount;
      state.totalPrice = totalPrice;
      saveBasket(state.bascet);
    },
    delProduct: (state, { payload }) => {
      state.bascet = state.bascet.filter((product) => product.id != payload);
      const { totalCount, totalPrice } = updateTotel(state.bascet);
      state.totalCount = totalCount;
      state.totalPrice = totalPrice;
      saveBasket(state.bascet);
    },
    addProductCount: (state, { payload }) => {
      state.bascet = state.bascet.map((product) => {
        if (product.id == payload) {
          return { ...product, count: product.count + 1 };
        } else {
          return product;
        }
      });
      const { totalCount, totalPrice } = updateTotel(state.bascet);
      state.totalCount = totalCount;
      state.totalPrice = totalPrice;
      saveBasket(state.bascet);
    },
    delProductCount: (state, { payload }) => {
      state.bascet = state.bascet.map((product) => {
        if (product.id == payload) {
          return { ...product, count: product.count - 1 };
        } else {
          return product;
        }
      });
      const { totalCount, totalPrice } = updateTotel(state.bascet);
      state.totalCount = totalCount;
      state.totalPrice = totalPrice;
      saveBasket(state.bascet);
    },
    deleteAll: (state) => {
      state.bascet = [];
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
} = product.actions;
export default product.reducer;
