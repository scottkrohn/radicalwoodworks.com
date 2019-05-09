import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Actions
import { verifyLogin } from 'client/actions/admin-actions';

// Components
import Grid from 'client/components/grid/grid';
import AdminSection from 'client/components/admin-section/admin-section';

// HOC
import { withValidation } from 'client/hoc/auth';

const sectionIds = {
    editProducts: 'editProducts',
    editPolicies: 'editPolicies',
    editAboutUs: 'editAboutUs',
    editFaq: 'editFaq',
};
class AdminContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    componentDidMount = () => {
        this.props.verifyLogin().catch((error) => {
            this.props.redirectToHome();
        });
    };

    handleClick = (sectionId) => {
        switch (sectionId) {
        case sectionIds.editProducts:
            break;
        case sectionIds.editPolicies:
            break;
        case sectionIds.editAboutUs:
            break;
        case sectionIds.editFaq:
            break;
        }
    };

    render = () => {
        return (
            <div className="container-fluid">
                <div className="text-center">
                    <h1>Radical Woodworks Admin Panel</h1>
                </div>
                <div>
                    <Grid>
                        <AdminSection
                            title="Edit Products"
                            text="Click here to edit or delete products"
                            buttonText="Edit Products"
                            buttonHref="/admin-products"
                        />
                        <AdminSection
                            title="Edit Policies"
                            text="Click here to edit or delete policies"
                            buttonText="Edit Policies"
                            buttonHref="/admin-policies"
                        />
                        <AdminSection
                            title="Edit About Us"
                            text="Click here to edit the About Us page"
                            buttonText="Edit About Us"
                            buttonHref="/admin-about"
                        />
                        <AdminSection
                            title="Edit FAQ"
                            text="Click here to edit the FAQ page"
                            buttonText="Edit FAQ"
                            buttonHref="/admin-faq"
                        />
                    </Grid>
                </div>
            </div>
        );
    };
}

AdminContainer.propTypes = {
    verifyLogin: PropTypes.func,
    redirectToHome: PropTypes.func,
};

const mapStateToProps = (state) => {
    return state;
};

const mapActionsToProps = {
    verifyLogin,
};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withValidation(AdminContainer));
