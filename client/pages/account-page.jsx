import React, { useState } from 'react';
import { withAuthValidation } from 'client/hoc/auth';
import AUTH from '@constants/auth-constants';
import PageHeader from '@components/page-header/page-header';
import { connect } from 'react-redux';
import AccountEditForm from '@components/account-edit-form/account-edit-form';
import ChangePasswordForm from '@components/change-password-form/change-password-form';
import styles from './account-page.scss';
import cx from 'classnames';
import { updateAccount, updatePassword } from '@actions/user-actions';
import { getLoading } from '@selectors/user-selectors';
import Spinner from '@components/spinner/spinner';

import { Link } from 'react-router-dom';
import Notification from '@components/notification/notification';

const UserPage = ({ loading, updateAccount, updatePassword, user }) => {
  
  const [updateSectionName, setUpdateSectionName] = useState(null);
  const [notificationContent, setNotificationContent] = useState({});

  const changeSectionView = (name) => () => {
    setUpdateSectionName(name);
  };

  const cancelUpdateSection = () => {
    setUpdateSectionName(null);
  };

  const onUpdateAccount = (accountInfo) => {
    updateAccount(accountInfo).then(() => {
      setUpdateSectionName(null);
      setNotificationContent({
        header: 'Account Updated',
        message: 'Account successfully updated!',
        showing: true,
      });
    });
  };

  const onPasswordUpdate = (passwordInfo) => {
    const { newPassword, currentPassword } = passwordInfo;
    return new Promise((resolve, reject) => {
      updatePassword(user.getUsername(), currentPassword, newPassword)
        .then(() => {
          setUpdateSectionName(null);
          resolve();

          setNotificationContent({
            header: 'Password Changed',
            message: 'Password successfully changed!',
            showing: true,
          });
        })
        .catch((error) => {
          reject(error);
        });
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
            <Link to="/orders" className={styles.AccountNavOption}>
              My Orders
            </Link>
            <button
              onClick={changeSectionView('accountInfo')}
              className={styles.AccountNavOption}
            >
              Edit Account Info
            </button>
            <button
              onClick={changeSectionView('changePassword')}
              className={styles.AccountNavOption}
            >
              Change Password
            </button>
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

      {updateSectionName === 'changePassword' && (
        <ChangePasswordForm
          className={styles.ChangePasswordForm}
          onSubmit={onPasswordUpdate}
          onCancel={cancelUpdateSection}
        />
      )}

      <Notification
        content={notificationContent}
        hide={() => setNotificationContent({ showing: false })}
      />
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
  updatePassword,
};

export default {
  component: connect(
    mapStateToProps,
    mapActionsToProps
  )(withAuthValidation(AUTH.USER_TYPES.CUSTOMER)(UserPage)),
};
