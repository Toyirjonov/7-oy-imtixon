import { useEffect, useState } from "react";
import formatNumber from "./hooks/formatNumber";

function App() {
  const BASE_URL = "https://json-api.uz/api/project/dessertss/desserts";
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(BASE_URL).then((data) =>
      data
        .json()
        .then((data) => setData(data))
        .catch((error) => console.log(error.message))
    );
  }, []);

  console.log(data);

  return (
    <>
      <main className="main">
        <div className="container">
          <section className="card">
            <div className="menu-left">
              <h1 className="menu-left-title">Desserts</h1>
              <ul className="products-list" id="products-list">
                {data &&
                  data.data &&
                  data.data.map((item) => {
                    return (
                      <li key={item.id} className="product-item">
                        <div className="product-top">
                          <img
                            className="product-image"
                            src={item.image.desktop}
                            alt={item.name}
                            width="250"
                            height="240"
                          />
                          <button className="add-to-cart-btn">
                            <img
                              src="../public/images/icon-add-to-cart.svg"
                              alt="add to cart icon"
                              width="20"
                              height="20"
                            />
                            <p className="btn-title">Add to Cart</p>
                          </button>
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
              <h2 className="menu-right-title">Your Cart (0)</h2>
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
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

export default App;
