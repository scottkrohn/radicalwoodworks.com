import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { get } from 'lodash';

// Components
import Spinner from 'client/components/spinner/spinner';
import Snackbar from '@material-ui/core/Snackbar';
import Button from 'client/components/base/button/button';

// Actions
import { getAllContent, updateContent } from 'client/actions/content-actions';
import { verifyLogin } from 'client/actions/admin-actions';

// Selectors
import { getAllContent as getAllContentObjects, getLoading } from 'client/selectors/content-selector';

// HOC
import { withValidation } from 'client/hoc/auth';
import ContentEditor from 'client/components/content-editor/content-editor';

class AdminFaqContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedContent: null,
            notificationMessage: '',
        };
    }

    componentDidMount = () => {
        (async () => {
            try {
                await this.props.verifyLogin();
            } catch (error) {
                this.props.redirectToHome();
            }

            await this.props.getAllContent('POLICY');

            const aboutUsContent = get(this.props, 'content.0');

            if (aboutUsContent) {
                this.setState({
                    text: aboutUsContent.getContent(),
                });
            }
        })();
    };

    handleEditorChange = (content) => {
        this.setState({
            selectedContent: content,
        });
    };

    handleSave = (content, text) => {
        content.setContent(text);

        (async () => {
            try {
                await this.props.updateContent(content);
                this.handleShowNotification('Successfully saved!');
            } catch (error) {
                this.handleShowNotification('There was an error while saving!');
            }
        })();
    };

    handleShowNotification = (message) => {
        this.setState({
            showNotification: true,
            notificationMessage: message,
        });
    };

    handleHideNotification = () => {
        this.setState({
            showNotification: false,
        });
    };

    render = () => {
        const content = this.props.content || [];

        const policyContent = content.filter((contentObject) => contentObject.getCategory() === 'POLICY');

        return (
            <div className="container-fluid text-center">
                <Spinner spinning={this.props.loading}>
                    <h2>Edit FAQ</h2>
                    <div>
                        {policyContent.length > 0 &&
                            policyContent.map((contentObj) => {
                                return (
                                    <Button
                                        key={contentObj.getId()}
                                        variant="contained"
                                        color="primary"
                                        className="mt-4 ml-3 mr-3"
                                        onClick={() => this.handleEditorChange(contentObj)}
                                    >
                                        EDIT {contentObj.getType()}
                                    </Button>
                                );
                            })}
                    </div>

                    <div className="mt-4">
                        {this.state.selectedContent && (
                            <ContentEditor
                                handleSave={this.handleSave}
                                content={this.state.selectedContent}
                            />
                        )}
                    </div>

                    <Snackbar
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                        open={this.state.showNotification}
                        autoHideDuration={3000}
                        onClose={this.handleHideNotification}
                        message={<span>{this.state.notificationMessage}</span>}
                    />
                </Spinner>
            </div>
        );
    };
}

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
)(withValidation(AdminFaqContainer));
