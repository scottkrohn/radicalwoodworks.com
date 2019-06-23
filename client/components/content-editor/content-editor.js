import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Components
import ReactQuill from 'react-quill';
import Button from 'client/components/base/button/button';

// Styles
import styles from 'client/components/content-editor/content-editor.less';

// class ContentEditor extends PureComponent {
const ContentEditor = (props) => {
  const [text, setText] = useState('');
  const [showPreview, setShowPreview] = useState('');

  useEffect(() => {
    console.log('called');
    setText(props.content.getContent());
  }, [props.content]);

  const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  const onEditorChange = (value) => {
    setText(value);
  };

  const previewClasses = classNames({
    [styles.Preview]: true,
    [props.previewClassName]: !!props.previewClassName,
  });

  const previewVerb = showPreview ? 'Hide' : 'Show';

  return (
    <div className={styles.ContentEditorContainer}>
      <h5 className={styles.Header}>{props.content.getType()}</h5>
      <ReactQuill value={text} onChange={onEditorChange} />

      <div className={styles.Buttons}>
        <div className="offset-lg-4 offset-md-0 col-lg-4 col-md-6">
          <Button
            onClick={() => props.handleSave(props.content, text)}
            color="save"
            variant="contained"
            className={styles.Button}
          >
            Save!
          </Button>
        </div>
        <div className="col-lg-4 col-md-6 text-right pr-0">
          <Button
            onClick={togglePreview}
            color="primary"
            slim
            variant="contained"
            className={styles.PreviewButton}
          >
            {previewVerb} Preview
          </Button>
        </div>
      </div>

      {showPreview && (
        <div className={previewClasses}>
          <div dangerouslySetInnerHTML={{ __html: text }} />
        </div>
      )}
    </div>
  );
};

ContentEditor.propTypes = {
  content: PropTypes.object,
  handleSave: PropTypes.func,
  showPreview: PropTypes.bool,
  previewClassName: PropTypes.string,
};

export default ContentEditor;
