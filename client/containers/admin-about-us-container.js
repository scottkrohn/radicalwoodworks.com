import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { get } from 'lodash';

// Components
import ReactQuill from 'react-quill';
import Button from '@material-ui/core/Button';

// Actions
import { verifyLogin } from 'client/actions/admin-actions';
import { getAllContent } from 'client/actions/content-actions';

// Selectors
import { getAllContent as getAllContentObjects, getLoading } from 'client/selectors/content-selector';

// HOC
import { withValidation } from 'client/hoc/auth';

class AdminAboutUs extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: '',
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
    }

    render = () => {
        return (
            <div className="container-fluid text-center">
                <h2>Edit About Us</h2>
                <ReactQuill value={this.state.text} onChange={this.onEditorChange} />
                <br />
                <Button onClick={this.handleSave} color="primary" variant="contained">
                    Save!
                </Button>
            </div>
        );
    };
}

AdminAboutUs.propTypes = {
    verifyLogin: PropTypes.func,
    redirectToHome: PropTypes.func,
    getAllContent: PropTypes.func,
    content: PropTypes.array,
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
};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withValidation(AdminAboutUs));
