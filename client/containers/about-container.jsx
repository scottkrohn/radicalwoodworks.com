import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';

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
          <h1>Radical Woodworks</h1>
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
