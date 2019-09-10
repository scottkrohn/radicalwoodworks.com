import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cx from 'classnames';

// Components
import Spinner from 'client/components/spinner-v2/spinner-v2';
import Button from 'client/components/button/button';
import Grid from 'client/components/grid/grid';
import ContentEditor from 'client/components/content-editor/content-editor';
import PageHeader from 'client/components/page-header/page-header';

// Actions
import { getAllContent, updateContent } from 'client/actions/content-actions';
import { verifyLogin } from 'client/actions/admin-actions';

// Selectors
import { getAllContent as getAllContentObjects, getLoading } from 'client/selectors/content-selector';

// HOC
import { withAuthValidation } from 'client/hoc/auth';

// Styles
import styles from './admin-faq-container.scss';
import useStyles from 'isomorphic-style-loader/useStyles';

// TODO: Show notifications on save.

const AdminFaqContainer = (props) => {
  useStyles(styles);
  const [selectedContent, setSelectedContent] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  useEffect(() => {
    (async () => {
      try {
        await props.verifyLogin();
      } catch (error) {
        props.redirectToHome();
      }
      props.getAllContent('POLICY');
    })();
  }, []);

  const handleEditorChange = (content) => {
    setSelectedContent(content);
  };

  const handleSave = (content, text) => {
    content.setContent(text);

    (async () => {
      try {
        await props.updateContent(content);
        handleShowNotification('Successfully saved!');
      } catch (error) {
        handleShowNotification('There was an error while saving!');
      }
    })();
  };

  // TODO: Maybe I can use a custom hook here to handle showing notifications?
  const handleShowNotification = (message) => {
    setShowNotification(true);
    setNotificationMessage(message);
  };

  const handleHideNotification = () => {
    setShowNotification(false);
  };

  const content = props.content || [];
  const policyContent = content.filter((contentObject) => contentObject.getCategory() === 'POLICY');

  return (
    <div className={cx('container-fluid text-center', styles.AdminFaqContainer)}>
      <Spinner spinning={props.loading}>
        <PageHeader
          headerText="Edit FAQ"
          showButton={false}
        />
        <Grid>
          {policyContent.length > 0 &&
            policyContent.map((contentObj) => {
              return (
                <Button
                  key={contentObj.getId()}
                  primary
                  className="mt-4 ml-3 mr-3"
                  onClick={() => handleEditorChange(contentObj)}
                >
                  EDIT {contentObj.getType()}
                </Button>
              );
            })}
        </Grid>

        <div className={styles.EditorContainer}>
          {selectedContent && <ContentEditor
            handleSave={handleSave}
            content={selectedContent}
                              />}
        </div>

        {/* Replace snackbar with Notification */}
        {/* <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={showNotification}
          autoHideDuration={3000}
          onClose={handleHideNotification}
          message={<span>{notificationMessage}</span>}
        /> */}
      </Spinner>
    </div>
  );
};

AdminFaqContainer.propTypes = {
  getAllContent: PropTypes.func,
  verifyLogin: PropTypes.func,
  redirectToHome: PropTypes.func,
  loading: PropTypes.bool,
  content: PropTypes.array,
  updateContent: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    content: getAllContentObjects(state),
    loading: getLoading(state),
  };
};

const mapActionsToProps = {
  getAllContent,
  verifyLogin,
  updateContent,
};

export default {
  component: connect(
    mapStateToProps,
    mapActionsToProps
  )(withAuthValidation(AdminFaqContainer)),
};
