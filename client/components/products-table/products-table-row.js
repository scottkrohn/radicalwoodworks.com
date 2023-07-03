import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Components
import TableRow from '@components/table/table-row';
import TableCell from '@components/table/table-cell';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import Modal, { ModalContent, ModalTrigger } from '@components/modal/modal';
import Button from '@components/button/button';
import MissingImage from '@components/missing-image/missing-image';

// Styles
import styles from '@components/products-table/products-table.scss';


// Constants
import IMAGES from 'client/constants/image-constants';

const ProductsTableRow = ({ handleDeleteProduct, product }) => {
  
  const iconClasses = classNames(styles.Cell, styles.Icons);
  const primaryImageUrl = product.getPrimaryImageUrl();

  return (
    <React.Fragment>
      <TableRow hover className={styles.ProductsTableRowContainer}>
        <TableCell className={styles.Cell}>
          {primaryImageUrl ? (
            <img
              className={styles.TableImage}
              src={IMAGES.getFullUrl(primaryImageUrl)}
            />
          ) : (
            <MissingImage className={styles.TableImage} />
          )}
        </TableCell>
        <TableCell className={styles.Cell}>
          <span className={styles.Text}>{product.getTitle()}</span>
        </TableCell>
        <TableCell className={styles.Cell}>
          <span className={styles.Text}>${product.getFormattedPrice()}</span>
        </TableCell>
        <TableCell className={styles.Cell}>
          <span className={styles.Text}>
            ${product.getFormattedShippingPrice()}
          </span>
        </TableCell>
        <TableCell className={styles.Cell}>
          <span className={styles.Text}>
            {product.getIncludeShippingInPrice() ? 'Yes' : 'No'}
          </span>
        </TableCell>
        <TableCell className={styles.Cell}>
          <span className={styles.Text}>
            ${product.getFormattedFinalPrice()}
          </span>
        </TableCell>
        <TableCell className={iconClasses}>
          <div className={styles.Icons}>
            <Link href={`/admin-product/${product.getId()}`}>
              <FontAwesomeIcon icon={faEdit} className={styles.ActionIcon} />
            </Link>
          </div>
          <Modal headerLabel="Delete Product">
            <ModalTrigger>
              {({ hide, show }) => {
                return (
                  <FontAwesomeIcon
                    onClick={() => show()}
                    icon={faTrash}
                    className={styles.ActionIcon}
                  />
                );
              }}
            </ModalTrigger>
            <ModalContent>
              {({ hide }) => {
                return (
                  <div className={'flex flex-dir-col'}>
                    Are you sure you want to delete this product?
                    <div className="mt-4 flex justify-content-evenly">
                      <Button
                        className="flex-basis-33"
                        danger
                        onClick={() => handleDeleteProduct(product)}
                      >
                        Yes
                      </Button>
                      <Button className="flex-basis-33" onClick={hide}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                );
              }}
            </ModalContent>
          </Modal>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

ProductsTableRow.propTypes = {
  product: PropTypes.object,
  handleDeleteProduct: PropTypes.func,
};

export default ProductsTableRow;
