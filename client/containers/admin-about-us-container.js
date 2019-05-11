import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { get } from 'lodash';

// Components
import ReactQuill from 'react-quill';
import Button from 'client/components/base/button/button';
import Snackbar from '@material-ui/core/Snackbar';
import Spinner from 'client/components/spinner/spinner';

// Actions
import { verifyLogin } from 'client/actions/admin-actions';
import { getAllContent, updateContent} from 'client/actions/content-actions';

// Selectors
import { getAllContent as getAllContentObjects, getLoading } from 'client/selectors/content-selector';

// HOC
import { withValidation } from 'client/hoc/auth';

class AdminAboutUs extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: '',
            showNotification: false,
            notificationMessage: '',
        };
    }

    onEditorChange = (value) => {
        this.setState({
            text: value,
        });
    };

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

    handleSave = () => {
        const aboutUsContent = get(this.props, 'content.0');
        aboutUsContent.setContent(this.state.text);

        (async () => {
            try {
                await this.props.updateContent(aboutUsContent);
                this.handleShowNotification('Successfully saved!');
            } catch (error) {
                this.handleShowNotification('There was an error while saving!');
            }
        })();
    }

    handleShowNotification = (message) => {
        this.setState({
            showNotification: true,
            notificationMessage: message,
        });
    }

    handleHideNotification = () => {
        this.setState({
            showNotification: false,
        });
    }

    render = () => {
        return (
            <div className="container-fluid text-center">
                <h2>Edit About Us</h2>
                <Spinner spinning={this.props.loading}>
                    <ReactQuill value={this.state.text} onChange={this.onEditorChange} />
                    <br />
                    <Button onClick={this.handleSave} color="save" variant="contained">
                        Save!
                    </Button>
                </Spinner>

                <Snackbar
                    anchorOrigin={{vertical: 'top', horizontal: 'right'}}
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
