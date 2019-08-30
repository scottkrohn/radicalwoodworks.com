import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PageHeader from 'client/components/page-header/page-header';

// Actions
import { getAllContent } from 'client/actions/content-actions';

// Selectors
import { getAllContent as getAllContentObjects, getLoading } from 'client/selectors/content-selector';

// Components
import AboutUsInfo from 'client/components/about-us/about-us-info';

const AboutContainer = ({ content, getAllContent }) => {
  useEffect(() => {
    getAllContent('ABOUT');
  }, []);

  return (
    <div className="container-fluid">
      <div className="col-xs-12">
        <div className="text-center">
          <PageHeader
            headerText="About Radical Woodworks"
            showButton={false}
          />
          {content && <AboutUsInfo content={content} />}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    content: getAllContentObjects(state),
    loading: getLoading(state),
  };
};

const mapActionsToProps = {
  getAllContent: getAllContent,
};

export default {
  component: connect(
    mapStateToProps,
    mapActionsToProps
  )(AboutContainer),
  loadData: (store) => {
    return store.dispatch(getAllContent('ABOUT'));
  },
};
