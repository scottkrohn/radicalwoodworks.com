import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Components
import ReactQuill from 'react-quill';
import Button from 'client/components/base/button/button';

// Styles
import styles from 'client/components/content-editor/content-editor.less';

class ContentEditor extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            text: '',
            showPreview: false,
        };
    }

    componentDidMount = () => {
        this.setState({
            text: this.props.content.getContent(),
        });
    };

    componentDidUpdate = (prevProps, prevState) => {
        if (this.props.content !== prevProps.content) {
            this.setState({
                text: this.props.content.getContent(),
            });
        }
    };

    togglePreview = () => {
        this.setState({
            showPreview: !this.state.showPreview,
        });
    };

    onEditorChange = (value) => {
        this.setState({
            text: value,
        });
    };

    render = () => {
        const previewClasses = classNames({
            [styles.Preview]: true,
            [this.props.previewClassName]: !!this.props.previewClassName,
        });

        const previewVerb = this.state.showPreview ? 'Hide' : 'Show';

        return (
            <div className={styles.ContentEditorContainer}>
                <h5 className={styles.Header}>{this.props.content.getType()}</h5>
                <ReactQuill
                    value={this.state.text}
                    onChange={this.onEditorChange}
                />

                <div className={styles.Buttons}>
                    <div className="offset-lg-4 offset-md-0 col-lg-4 col-md-6">
                        <Button
                            onClick={() => this.props.handleSave(this.props.content, this.state.text)}
                            color="save"
                            variant="contained"
                            className={styles.Button}
                        >
                            Save!
                        </Button>
                    </div>
                    <div className="col-lg-4 col-md-6 text-right pr-0">
                        <Button
                            onClick={this.togglePreview}
                            color="primary"
                            slim
                            variant="contained"
                            className={styles.PreviewButton}
                        >
                            {previewVerb} Preview
                        </Button>
                    </div>
                </div>

                {this.state.showPreview && (
                    <div className={previewClasses}>
                        <div dangerouslySetInnerHTML={{ __html: this.state.text }} />
                    </div>
                )}
            </div>
        );
    };
}

ContentEditor.propTypes = {
    content: PropTypes.object,
    handleSave: PropTypes.func,
    showPreview: PropTypes.bool,
    previewClassName: PropTypes.string,
};

export default ContentEditor;
