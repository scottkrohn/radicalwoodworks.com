import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { clearOrder, getOrder } from '@actions/order-actions';
import { getLoading, selectOrder } from '@selectors/order-selectors';
import { useDispatch } from 'react-redux';
import styles from '@pages/order-confirmation-page.scss';
import cx from 'classnames';
import useStyles from 'isomorphic-style-loader/useStyles';
import OrderSidebar from '@components/order-sidebar/order-sidebar';
import Spinner from '@components/spinner/spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const OrderConfirmationPage = ({ getOrder, loading, order, match }) => {
  const [orderError, setOrderError] = useState(false);
  useStyles(styles);
  const dispatch = useDispatch();
  useEffect(() => {
    const { orderId } = match.params;
    getOrder(orderId, true).catch(() => {
      setOrderError(true);
    });

    return () => {
      dispatch(clearOrder());
    };
  }, []);

  const address = order && order.getAddress();

  return (
    <div className={cx('container', styles.OrderConfirmationPage)}>
      <Spinner spinning={loading} />
      {orderError && (
        <div className={styles.SessionError}>
          <h4>
            Session expired, please view completed orders on your account page.
          </h4>
        </div>
      )}
      {order && (
        <React.Fragment>
          <FontAwesomeIcon className={styles.CheckIcon} icon={faCheckCircle} />
          <h1 className={styles.HoorayHeader}>
            Hooray, your order has been placed!
          </h1>
          <div className={styles.ConfirmationContent}>
            <div className={styles.OrderDetails}>
              <h4 className={styles.OrderDetailsHeader}>Order Details</h4>
              <div className={styles.Section}>
                <div className={styles.ShippingAddress}>
                  <div className={styles.SectionHeader}>Shipping Address</div>
                  <div>{`${address.getFirstName()} ${address.getLastName()}`}</div>
                  <div>{`${address.getAddress()}`}</div>
                  <div>{`${address.getAddressTwo()}`}</div>
                  <div>{`${address.getCity()}, ${address.getState()} ${address.getZip()}`}</div>
                </div>

                <div className={styles.PaymentMethod}>
                  <div className={styles.SectionHeader}>Payment Method</div>
                  <div>Paypal **0045</div>
                </div>
              </div>

              <div className={styles.Section}>
                <div className={styles.ShippingAddress}>
                  <div className={styles.SectionHeader}>Billing Address</div>
                  <div>{`${address.getFirstName()} ${address.getLastName()}`}</div>
                  <div>{`${address.getAddress()}`}</div>
                  <div>{`${address.getAddressTwo()}`}</div>
                  <div>{`${address.getCity()}, ${address.getState()} ${address.getZip()}`}</div>
                </div>

                <div className={styles.ShippingSpeed}>
                  <div className={styles.SectionHeader}>Shipping Timeframe</div>
                  <div>1-2 Weeks</div>
                </div>
              </div>
            </div>
            <div className={styles.Sidebar}>
              <OrderSidebar className={styles.OrderTotals} order={order} />
              <div className={styles.OrderItems}>
                <div className={styles.SectionHeader}>Order Items</div>
                {order.getItems().map((item) => {
                  const product = item.getProduct();
                  return (
                    <div
                      className={styles.ItemListContainer}
                      key={item.getId()}
                    >
                      <span className={styles.ItemTitle}>
                        {product.getTitle()}
                      </span>
                      <span
                        className={styles.ItemQuantity}
                      >{`${item.getQuantity()}x`}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    order: selectOrder(state),
    loading: getLoading(state),
  };
};

export default {
  component: connect(mapStateToProps, { getOrder })(OrderConfirmationPage),
};
