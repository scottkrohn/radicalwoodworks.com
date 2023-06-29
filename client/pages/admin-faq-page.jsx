import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cx from 'classnames';
import { isEmpty } from 'lodash';
import AUTH from '@constants/auth-constants';

// Components
import Spinner from '@components/spinner/spinner';
import Button from '@components/button/button';
import Grid from '@components/grid/grid';
import ContentEditor from '@components/content-editor/content-editor';
import PageHeader from '@components/page-header/page-header';
import Notification from '@components/notification/notification';

// Actions
import { getAllContent, updateContent } from 'client/actions/content-actions';
import { verifyLogin } from 'client/actions/admin-actions';

// Selectors
import {
  getAllContent as getAllContentObjects,
  getContentType,
  getLoading,
} from 'client/selectors/content-selector';

// HOC
import { withAuthValidation } from 'client/hoc/auth';

// Styles
import styles from './admin-faq-page.scss';


const AdminFaqContainer = ({
  content,
  contentType,
  getAllContent,
  loading,
  updateContent,
}) => {
  
  const [selectedContent, setSelectedContent] = useState(null);
  const [notificationContent, setNotificationContent] = useState({});

  useEffect(() => {
    if (isEmpty(content) || contentType !== 'POLICY') {
      getAllContent('POLICY');
    }
  }, []);

  const handleEditorChange = (content) => {
    setSelectedContent(content);
  };

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

  const policyContent = content.filter(
    (contentObject) => contentObject.getCategory() === 'POLICY'
  );

  return (
    <div
      className={cx('container-fluid text-center', styles.AdminFaqContainer)}
    >
      <Spinner spinning={loading}>
        <PageHeader headerText="Edit FAQ" showButton={false} />
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
          {selectedContent && (
            <ContentEditor handleSave={handleSave} content={selectedContent} />
          )}
        </div>
      </Spinner>

      <Notification
        content={notificationContent}
        hide={() => setNotificationContent({ showing: false })}
      />
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
    contentType: getContentType(state),
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
  )(withAuthValidation(AUTH.USER_TYPES.ADMIN)(AdminFaqContainer)),
  loadData: (store) => store.dispatch(getAllContent('POLICY')),
};
