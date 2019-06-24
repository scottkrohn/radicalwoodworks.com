import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { get, isEmpty } from 'lodash';

// Actions
import { getAllContent } from 'client/actions/content-actions';

// Selectors
import { getAllContent as getAllContentObjects, getLoading } from 'client/selectors/content-selector';

// Components
import AboutUsInfo from 'client/components/about-us/about-us-info';
import { Spin } from 'antd';

const AboutContainer = (props) => {
  useEffect(() => {
    props.getAllContent('ABOUT');
  }, []);

  const content = get(props, 'content', null);

  return (
    <div className="container">
      <div className="col-xs-12">
        <Spin spinning={props.loading}>
          <div className="text-center">
            <h1>Radical Woodworks</h1>
            {props.content && <AboutUsInfo content={content} />}
          </div>
        </Spin>
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

export default connect(
  mapStateToProps,
  mapActionsToProps
)(AboutContainer);
