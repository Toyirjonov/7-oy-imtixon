import { useDispatch } from "react-redux";
import { deleteAll } from "../app/features/productSlice";
import formatNumber from "../hooks/formatNumber";

export const Order = ({ product, setOrder }) => {
  const dispatch = useDispatch();

  return (
    <section className="order__confirmed-wrapper">
      <div className="order__confirmed">
        <div className="order__confirmed-info">
          <img
            className="order__confirmed-info-image"
            src="../public/images/icon-order-confirmed.svg"
            width="48"
            height="48"
            alt=""
          />
          <div className="order__confirmed-info-texts">
            <h2 className="order__confirmed-info-texts-title">
              Order Confirmed
            </h2>
            <p className="order__confirmed-info-texts-description">
              We hope you enjoy your food!
            </p>
          </div>
        </div>
        <div className="order__confirmed-list-wrapper">
          <ul className="order__confirmed__active__list">
            {product.bascet.map((cartItem) => (
              <li key={cartItem.id} className="order__confirmed__active__item">
                <div className="order__confirmed__active__item-wrapper">
                  <img
                    className="order__confirmed__active__image"
                    width="50"
                    height="50"
                    src={cartItem.image?.desktop || cartItem.image}
                    alt={cartItem.name}
                  />
                  <div className="order__confirmed__active__wrapper">
                    <h3 className="order__confirmed__active__title">
                      {cartItem.name}
                    </h3>
                    <div className="order__confirmed__active-info">
                      <span className="order__confirmed__active__count">
                        {cartItem.count}x
                      </span>
                      <span className="order__confirmed__active__price-wrapper">
                        @ {formatNumber(cartItem.price)}
                      </span>
                    </div>
                  </div>
                  <span className="order__confirmed__active__allPrice">
                    {formatNumber(cartItem.price * cartItem.count)}
                  </span>
                </div>
                <hr className="hr" />
              </li>
            ))}
          </ul>
          <div className="order_total">
            <h3 className="order_total__title">Order Total</h3>
            <h2 className="order_total__price_1">
              {formatNumber(product.totalPrice)}
            </h2>
          </div>
        </div>
        <button
          className="order__confirmed-btn"
          onClick={() => {
            dispatch(deleteAll());
            setOrder(false);
          }}
        >
          Start New Order
        </button>
      </div>
    </section>
  );
};
