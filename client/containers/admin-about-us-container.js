import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { get } from 'lodash';

// Components
import ReactQuill from 'react-quill';
import Button from 'client/components/base/button/button';
import Snackbar from '@material-ui/core/Snackbar';
import Spinner from 'client/components/spinner/spinner';
import ContentEditor from 'client/components/content-editor/content-editor';

// Actions
import { verifyLogin } from 'client/actions/admin-actions';
import { getAllContent, updateContent } from 'client/actions/content-actions';

// Selectors
import { getAllContent as getAllContentObjects, getLoading } from 'client/selectors/content-selector';

// HOC
import { withValidation } from 'client/hoc/auth';

class AdminAboutUs extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showNotification: false,
            notificationMessage: '',
            showPreview: false,
        };
    }

    componentDidMount = () => {
        (async () => {
            try {
                await this.props.verifyLogin();
            } catch (error) {
                this.props.redirectToHome();
            }

            await this.props.getAllContent('ABOUT');

            const aboutUsContent = get(this.props, 'content.0');

            if (aboutUsContent) {
                this.setState({
                    text: aboutUsContent.getContent(),
                });
            }
        })();
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

    togglePreview = () => {
        this.setState({
            showPreview: !this.state.showPreview,
        });
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
        const aboutUsContent = get(this.props, 'content.0');

        return (
            <div className="container-fluid text-center">
                <h2>Edit About Us</h2>
                <Spinner spinning={this.props.loading}>
                    {aboutUsContent && (
                        <ContentEditor
                            handleSave={this.handleSave}
                            content={aboutUsContent}
                        />
                    )}
                </Spinner>

                <div className="mt-3">
                    {this.state.showPreview && (
                        <div className="mt-3">
                            <div dangerouslySetInnerHTML={{ __html: this.state.text }} />
                        </div>
                    )}
                </div>

                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    open={this.state.showNotification}
                    autoHideDuration={3000}
                    onClose={this.handleHideNotification}
                    message={<span>{this.state.notificationMessage}</span>}
                />
            </div>
        );
    };
}

AdminAboutUs.propTypes = {
    verifyLogin: PropTypes.func,
    redirectToHome: PropTypes.func,
    getAllContent: PropTypes.func,
    content: PropTypes.array,
    loading: PropTypes.bool,
    updateContent: PropTypes.func,
};

const mapStateToProps = (state) => {
    return {
        content: getAllContentObjects(state),
        loading: getLoading(state),
    };
};

const mapActionsToProps = {
    verifyLogin,
    getAllContent,
    updateContent,
};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withValidation(AdminAboutUs));
