import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Order } from "./components/Order";
import formatNumber from "./hooks/formatNumber";

import {
  addProduct,
  addProductCount,
  delProductCount,
  delProduct,
} from "./app/features/productSlice";

function App() {
  const BASE_URL = "https://json-api.uz/api/project/dessertss/desserts";
  const [data, setData] = useState(null);
  const [order, setOrder] = useState(false);
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);

  useEffect(() => {
    fetch(BASE_URL).then((data) =>
      data
        .json()
        .then((data) => setData(data))
        .catch((error) => console.log(error.message))
    );
  }, []);

  return (
    <>
      <main className="main">
        <div className="container">
          <section className="card">
            <div className="menu-left">
              <h1 className="menu-left-title">Desserts</h1>
              <ul className="products-list" id="products-list">
                {data &&
                  data.data.map((item) => {
                    const inBascet = product.bascet.find(
                      (i) => i.id == item.id
                    );
                    console.log(inBascet);
                    return (
                      <li
                        key={item.id}
                        className={`product-item ${inBascet ? "active" : ""}`}
                      >
                        <div className="product-top">
                          <img
                            className="product-image"
                            src={item.image.desktop}
                            alt={item.name}
                            width="250"
                            height="240"
                          />
                          {inBascet ? (
                            <div className="add-to-cart-btn active">
                              <button
                                className="quantity-btn"
                                onClick={() =>
                                  inBascet.count > 1
                                    ? dispatch(delProductCount(inBascet.id))
                                    : dispatch(delProduct(inBascet.id))
                                }
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="10"
                                  height="2"
                                  fill="none"
                                  viewBox="0 0 10 2"
                                >
                                  <path
                                    fill="#fff"
                                    d="M0 .375h10v1.25H0V.375Z"
                                  />
                                </svg>
                              </button>
                              <span className="quantity">{inBascet.count}</span>
                              <button
                                className="quantity-btn"
                                onClick={() =>
                                  dispatch(addProductCount(item.id))
                                }
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="10"
                                  height="10"
                                  fill="none"
                                  viewBox="0 0 10 10"
                                >
                                  <path
                                    fill="#fff"
                                    d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"
                                  />
                                </svg>
                              </button>
                            </div>
                          ) : (
                            <button
                              className="add-to-cart-btn"
                              onClick={() => {
                                dispatch(
                                  addProduct({
                                    id: item.id,
                                    name: item.name,
                                    count: 1,
                                    price: item.price,
                                    image: item.image,
                                  })
                                );
                              }}
                            >
                              <img
                                src="../public/images/icon-add-to-cart.svg"
                                alt="add to cart icon"
                                width="20"
                                height="20"
                              />
                              <p className="btn-title">Add to Cart</p>
                            </button>
                          )}
                        </div>
                        <div className="product-bottom">
                          <p className="product-type">{item.category}</p>
                          <p className="product-name">{item.name}</p>
                          <p className="product-price">
                            {formatNumber(item.price)}
                          </p>
                        </div>
                      </li>
                    );
                  })}
              </ul>
            </div>
            <div className="menu-right">
              <h2 className="menu-right-title">
                Your Cart ({product.totalCount})
              </h2>
              {product.bascet.length === 0 ? (
                <>
                  <img
                    className="menu-right-image"
                    src="../public/images/illustration-empty-cart.svg"
                    alt=""
                    width="128"
                    height="128"
                  />
                  <p className="menu-right-description">
                    Your added items will appear here
                  </p>
                </>
              ) : (
                <div className="cart-content">
                  <div className="cart-items">
                    {product.bascet.map((cartProduct) => (
                      <div key={cartProduct.id} className="cart-item">
                        <div className="cart-item-info">
                          <div className="cart-item-name">
                            {cartProduct.name}
                          </div>
                          <div className="cart-item-details">
                            <span className="cart-item-quantity">
                              {cartProduct.count}x
                            </span>
                            <span className="cart-item-price">
                              @ {formatNumber(cartProduct.price)}
                            </span>
                            <span className="cart-item-total">
                              {formatNumber(
                                cartProduct.price * cartProduct.count
                              )}
                            </span>
                          </div>
                        </div>
                        <button
                          className="remove-item-btn"
                          onClick={() => dispatch(delProduct(cartProduct.id))}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="10"
                            height="10"
                            fill="none"
                            viewBox="0 0 10 10"
                          >
                            <path
                              fill="#CAAFA7"
                              d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"
                            />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="cart-total">
                    <p>Order Total</p>
                    <span className="total-price">
                      {formatNumber(product.totalPrice)}
                    </span>
                  </div>

                  <div className="carbon-neutral">
                    <svg
                      width="21"
                      height="20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8 18.5L2.5 13L3.91 11.59L8 15.67L16.59 7.09L18 8.5L8 18.5Z"
                        fill="#1ea575"
                      />
                    </svg>
                    <p>
                      This is a <strong>carbon-neutral</strong> delivery
                    </p>
                  </div>

                  <button
                    className="confirm-order-btn"
                    onClick={() => setOrder(true)}
                  >
                    Confirm Order
                  </button>
                </div>
              )}
            </div>
          </section>
          {order && <Order product={product} setOrder={setOrder} />}
        </div>
      </main>
    </>
  );
}

export default App;
