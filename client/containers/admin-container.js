import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Components
import Grid from 'client/components/grid/grid';
import AdminSection from 'client/components/admin-section/admin-section';
import PageHeader from 'client/components/page-header/page-header';

// HOC
import { withAuthValidation } from 'client/hoc/auth';

const AdminContainer = () => {
  return (
    <div className="container-fluid">
      <PageHeader
        headerText="Radical Woodworks Admin Panel"
        showButton={false}
      />
      <div>
        <Grid>
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
        </Grid>
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

export default {
  component: connect(mapStateToProps)(withAuthValidation(AdminContainer)),
};
