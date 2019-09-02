import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PageHeader from 'client/components/page-header/page-header';
import { isEmpty } from 'lodash';

// Actions
import { getAllContent } from 'client/actions/content-actions';

// Selectors
import { getAllContent as getAllContentObjects, getContentType, getLoading } from 'client/selectors/content-selector';

// Components
import AboutUsInfo from 'client/components/about-us/about-us-info';
import Spinner from '../components/spinner-v2/spinner-v2';

const AboutContainer = ({ content, contentType, getAllContent, loading }) => {
  useEffect(() => {
    if (isEmpty(content) || contentType !== 'ABOUT') {
      getAllContent('ABOUT');
    }
  }, []);

  return (
    <div className="container-fluid">
      <div className="col-xs-12">
        <div className="text-center">
          <Spinner spinning={loading} />
          <PageHeader
            headerText="About Radical Woodworks"
            showButton={false}
          />
          {contentType === 'ABOUT' && <AboutUsInfo content={content} />}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    content: getAllContentObjects(state),
    contentType: getContentType(state),
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
