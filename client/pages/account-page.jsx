import React, { useState } from 'react';
import { withAuthValidation } from 'client/hoc/auth';
import AUTH from '@constants/auth-constants';
import PageHeader from '@components/page-header/page-header';
import { connect } from 'react-redux';
import AccountEditForm from '@components/account-edit-form/account-edit-form';
import styles from './account-page.scss';
import cx from 'classnames';
import { updateAccount } from '@actions/user-actions';
import { getLoading } from '@selectors/user-selectors';
import Spinner from '@components/spinner/spinner';
import useStyles from 'isomorphic-style-loader/useStyles';

const UserPage = ({ loading, updateAccount, user }) => {
  useStyles(styles);
  const [updateSectionName, setUpdateSectionName] = useState(null);

  const changeSectionView = (name) => () => {
    setUpdateSectionName(name);
  };

  const cancelUpdateSection = () => {
    setUpdateSectionName(null);
  };

  const onUpdateAccount = (accountInfo) => {
    updateAccount(accountInfo).then(() => {
      setUpdateSectionName(null);
    });
  };

  return (
    <div className={cx('container-fluid', styles.AccountPageContainer)}>
      <Spinner spinning={loading} />
      <PageHeader
        headerText={`Welcome back, ${user.getFirstName()}`}
        showButton={false}
      />

      {!updateSectionName && (
        <div className={styles.AccountSections}>
          <div className={styles.AccountInfo}>
            <h5>Account Info</h5>
            <ul>
              <li>{user.getFullName()}</li>
              <li>{user.getUsername()}</li>
              <li>{user.getEmail()}</li>

              <li>{`${user.getAddress()} ${user.getAptSuite()}`}</li>
              <li>{user.getAddressTwo()}</li>
              <li>{`${user.getCity()}, ${user.getState()} ${user.getZip()}`}</li>
            </ul>
          </div>
          <div className={styles.AccountActions}>
            <button>My Orders</button>
            <button onClick={changeSectionView('accountInfo')}>
              Edit Account Info
            </button>
            <button>Change Password</button>
          </div>
        </div>
      )}

      {updateSectionName === 'accountInfo' && (
        <AccountEditForm
          user={user}
          onSubmit={onUpdateAccount}
          onCancel={cancelUpdateSection}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: getLoading(state),
  };
};

const mapActionsToProps = {
  updateAccount,
};

export default {
  component: connect(
    mapStateToProps,
    mapActionsToProps
  )(withAuthValidation(AUTH.USER_TYPES.CUSTOMER)(UserPage)),
};
