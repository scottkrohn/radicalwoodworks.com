import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { uniqueId } from 'lodash';
import { isEmpty } from 'lodash';

// Actions
import { getAllContent } from 'client/actions/content-actions';

// Selectors
import { getAllContent as getAllContentObjects, getContentType, getLoading } from 'client/selectors/content-selector';

// Components
import Content from 'client/components/content/content';
import Spinner from '../components/spinner-v2/spinner-v2';
import PageHeader from 'client/components/page-header/page-header';

const FaqContainer = ({ content, contentType, getAllContent, loading }) => {
  useEffect(() => {
    if (isEmpty(content) || contentType !== 'POLICY') {
      getAllContent('POLICY');
    }
  }, []);

  return (
    <div className="container-fluid">
      <div className="col-xs-12">
        <div className="text-center">
          <Spinner spinning={loading} />
          <PageHeader
            headerText="Frequently Asked Questions"
            showButton={false}
          />
          {contentType === 'POLICY' &&
            content.map((contentElement) => {
              return (
                <div key={uniqueId()}>
                  <Content content={contentElement.getContent()} />
                </div>
              );
            })}
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
  )(FaqContainer),
  loadData: (store) => store.dispatch(getAllContent('POLICY')),
};
