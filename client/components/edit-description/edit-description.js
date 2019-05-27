import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';

// Components
import ReactQuill from 'react-quill';

// Styles
import styles from 'client/components/edit-description/edit-description.less';

class EditDescription extends PureComponent {
  constructor(props) {
    super(props);
  }

  render = () => {
    return (
      <div className={styles.EditDescriptionContainer}>
        <div className={styles.SectionHeader}>Description</div>
        <ReactQuill value={this.props.description} onChange={this.props.onChange} />
      </div>
    );
  };
}

EditDescription.propTypes = {
  description: PropTypes.string,
  onChange: PropTypes.func,
};

export default EditDescription;
