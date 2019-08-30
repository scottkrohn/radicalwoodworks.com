import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { uniqueId } from 'lodash';

// Actions
import { getAllContent } from 'client/actions/content-actions';

// Selectors
import { getAllContent as getAllContentObjects } from 'client/selectors/content-selector';

// Components
import Content from 'client/components/content/content';
import PageHeader from 'client/components/page-header/page-header';

const FaqContainer = ({ content, getAllContent }) => {
  useEffect(() => {
    getAllContent('POLICY');
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <PageHeader
            headerText="Frequently Asked Questions"
            showButton={false}
          />
          {content.map((contentElement) => {
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
