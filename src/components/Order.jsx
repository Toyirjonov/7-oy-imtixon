import { useDispatch } from "react-redux";
import { deleteAll } from "../app/features/productSlice";
import formatNumber from "../hooks/formatNumber";

const OrderConfirmedIcon = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M21 32.121L13.5 24.6195L15.6195 22.5L21 27.879L32.3775 16.5L34.5 18.6225L21 32.121Z"
      fill="#1EA575"
    />
    <path
      d="M24 3C19.8466 3 15.7865 4.23163 12.333 6.53914C8.8796 8.84665 6.18798 12.1264 4.59854 15.9636C3.0091 19.8009 2.59323 24.0233 3.40352 28.0969C4.21381 32.1705 6.21386 35.9123 9.15077 38.8492C12.0877 41.7861 15.8295 43.7862 19.9031 44.5965C23.9767 45.4068 28.1991 44.9909 32.0364 43.4015C35.8736 41.812 39.1534 39.1204 41.4609 35.667C43.7684 32.2135 45 28.1534 45 24C45 18.4305 42.7875 13.089 38.8493 9.15076C34.911 5.21249 29.5696 3 24 3ZM24 42C20.4399 42 16.9598 40.9443 13.9997 38.9665C11.0397 36.9886 8.73256 34.1774 7.37018 30.8883C6.0078 27.5992 5.65134 23.98 6.34587 20.4884C7.04041 16.9967 8.75474 13.7894 11.2721 11.2721C13.7894 8.75473 16.9967 7.0404 20.4884 6.34587C23.98 5.65133 27.5992 6.00779 30.8883 7.37017C34.1774 8.73255 36.9886 11.0397 38.9665 13.9997C40.9443 16.9598 42 20.4399 42 24C42 28.7739 40.1036 33.3523 36.7279 36.7279C33.3523 40.1036 28.7739 42 24 42Z"
      fill="#1EA575"
    />
  </svg>
);

export const Order = ({ product, setOrder }) => {
  const dispatch = useDispatch();

  const handleNewOrder = () => {
    dispatch(deleteAll());
    setOrder(false);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setOrder(false);
    }
  };

  return (
    <section
      className="order__confirmed-wrapper"
      onClick={handleOverlayClick}
      role="dialog"
      aria-labelledby="order-title"
      aria-modal="true"
    >
      <div className="order__confirmed">
        <div className="order__confirmed-info">
          <OrderConfirmedIcon />
          <div className="order__confirmed-info-texts">
            <h2 id="order-title" className="order__confirmed-info-texts-title">
              Order Confirmed
            </h2>
            <p className="order__confirmed-info-texts-description">
              We hope you enjoy your food!
            </p>
          </div>
        </div>

        <div className="order__confirmed-list-wrapper">
          <ul className="order__confirmed__active__list">
            {product.basket.map((cartItem, index) => (
              <li key={cartItem.id} className="order__confirmed__active__item">
                <div className="order__confirmed__active__item-wrapper">
                  <img
                    className="order__confirmed__active__image"
                    width="50"
                    height="50"
                    src={
                      cartItem.image?.thumbnail ||
                      cartItem.image?.desktop ||
                      cartItem.image
                    }
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
                {index < product.basket.length - 1 && <hr className="hr" />}
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
          onClick={handleNewOrder}
          type="button"
        >
          Start New Order
        </button>
      </div>
    </section>
  );
};
