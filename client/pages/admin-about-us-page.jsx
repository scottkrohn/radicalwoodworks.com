import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

// Components
import Spinner from '@components/spinner/spinner';
import ContentEditor from '@components/content-editor/content-editor';
import PageHeader from '@components/page-header/page-header';
import Notification from '@components/notification/notification';

// Actions
import { verifyLogin } from 'client/actions/admin-actions';
import { getAllContent, updateContent } from 'client/actions/content-actions';

// Selectors
import { getLoading, getAboutContent } from 'client/selectors/content-selector';

// HOC
import { withAuthValidation } from 'client/hoc/auth';

const AdminAboutUs = ({
  loading,
  content,
  contentType,
  updateContent,
  getAllContent,
}) => {
  const [notificationContent, setNotificationContent] = useState({});
  useEffect(() => {
    if (isEmpty(content) || contentType !== 'ABOUT') {
      getAllContent('ABOUT');
    }
  }, []);

  const handleSave = (content, text) => {
    content.setContent(text);

    (async () => {
      try {
        await updateContent(content);
        setNotificationContent({
          header: 'Success!',
          message: 'Update successfully saved!',
          showing: true,
        });
      } catch (error) {
        setNotificationContent({
          header: 'Error',
          message:
            'There was an error while saving this update, please try again.',
          showing: true,
        });
      }
    })();
  };

  return (
    <div className="container-fluid text-center">
      <PageHeader headerText="Edit About Us" showButton={false} />
      <Spinner spinning={loading}>
        {content && <ContentEditor handleSave={handleSave} content={content} />}
      </Spinner>
      <Notification
        content={notificationContent}
        hide={() => setNotificationContent({ showing: false })}
      />
    </div>
  );
};

AdminAboutUs.propTypes = {
  verifyLogin: PropTypes.func,
  redirectToHome: PropTypes.func,
  getAllContent: PropTypes.func,
  content: PropTypes.object,
  loading: PropTypes.bool,
  updateContent: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    content: getAboutContent(state),
    loading: getLoading(state),
  };
};

const mapActionsToProps = {
  verifyLogin,
  getAllContent,
  updateContent,
};

export default {
  component: connect(
    mapStateToProps,
    mapActionsToProps
  )(withAuthValidation(AdminAboutUs)),
  loadData: (store) => store.dispatch(getAllContent('ABOUT')),
};
