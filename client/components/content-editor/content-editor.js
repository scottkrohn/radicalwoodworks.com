import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

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

    onEditorChange = (value) => {
        this.setState({
            text: value,
        });
    };

    render = () => {
        return (
            <div className={styles.ContentEditorContainer}>
                <h5 className={styles.Header}>{this.props.content.getType()} POLICY</h5>
                <ReactQuill
                    value={this.state.text}
                    onChange={this.onEditorChange}
                />
                <Button
                    onClick={() => this.props.handleSave(this.props.content, this.state.text)}
                    color="save"
                    variant="contained"
                    className={styles.Button}
                >
                    Save!
                </Button>
            </div>
        );
    };
}

ContentEditor.propTypes = {
    content: PropTypes.object,
    handleSave:PropTypes.func,
};

export default ContentEditor;
