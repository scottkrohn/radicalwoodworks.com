import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Actions
import { verifyLogin } from 'client/actions/admin-actions';

// Components
// import Grid from 'client/components/grid/grid';
// import AdminSection from 'client/components/admin-section/admin-section';
import PageHeader from 'client/components/page-header/page-header';

// HOC
import { withAuthValidation } from 'client/hoc/auth';

const sectionIds = {
  editProducts: 'editProducts',
  editPolicies: 'editPolicies',
  editAboutUs: 'editAboutUs',
  editFaq: 'editFaq',
};

const AdminContainer = (props) => {
  // useEffect(() => {
  //   props.verifyLogin().catch((error) => {
  //     props.redirectToHome();
  //   });
  // }, []);

  return (
    <div className="container-fluid">
      <PageHeader
        headerText="Radical Woodworks Admin Panel"
        showButton={false}
      />
      <div>
        {/* <Grid>
          <AdminSection
            title="Edit Products"
            text="Click here to edit or delete products"
            buttonText="Edit Products"
            buttonHref="/admin-products"
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
        </Grid> */}
      </div>
    </div>
  );
};

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

export default {
  component: connect(
    mapStateToProps,
    mapActionsToProps
  )(withAuthValidation(AdminContainer)),
};
