import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Components
import Spinner from 'client/components/spinner/spinner';
import Snackbar from '@material-ui/core/Snackbar';
import Button from 'client/components/base/button/button';
import Grid from 'client/components/grid/grid';
import ContentEditor from 'client/components/content-editor/content-editor';

// Actions
import { getAllContent, updateContent } from 'client/actions/content-actions';
import { verifyLogin } from 'client/actions/admin-actions';

// Selectors
import { getAllContent as getAllContentObjects, getLoading } from 'client/selectors/content-selector';

// HOC
import { withAuthValidation } from 'client/hoc/auth';

const AdminFaqContainer = (props) => {
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
    <div className="container-fluid text-center">
      <Spinner spinning={props.loading}>
        <h2>Edit FAQ</h2>
        <Grid>
          {policyContent.length > 0 &&
            policyContent.map((contentObj) => {
              return (
                <Button
                  key={contentObj.getId()}
                  variant="contained"
                  color="primary"
                  className="mt-4 ml-3 mr-3"
                  onClick={() => handleEditorChange(contentObj)}
                  grow
                >
                  EDIT {contentObj.getType()}
                </Button>
              );
            })}
        </Grid>

        <div className="mt-4">
          {selectedContent && <ContentEditor handleSave={handleSave} content={selectedContent} />}
        </div>

        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={showNotification}
          autoHideDuration={3000}
          onClose={handleHideNotification}
          message={<span>{notificationMessage}</span>}
        />
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

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withAuthValidation(AdminFaqContainer));
