import React, { Component } from 'react';
import quillStyles from '../../../node_modules/react-quill/dist/quill.snow.css';
import withStyles from 'isomorphic-style-loader/withStyles';

/**
 * This is a horrible hack I had to do because the react-quill library
 * references the DOM directly in the node_module core file. This helps
 * it not explode on the server render by not importing that module
 * unless we're on the client. Gross.
 */

class QuillWrapper extends Component {
  constructor(props) {
    super(props);
    if (IS_CLIENT) {
      this.quill = require('react-quill');
    }
  }

  render() {
    const { value, onChange } = this.props;
    const Quill = this.quill;
    return Quill ? <Quill
      value={value}
      onChange={onChange}
                   /> : null;
  }
}

export default withStyles(quillStyles)(QuillWrapper);
