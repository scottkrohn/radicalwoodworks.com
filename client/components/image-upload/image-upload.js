import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Components
import Button from 'client/components/base/button/button';

// Actions
import { uploadImage } from 'client/actions/upload-actions';

class ImageUpload extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            imageUrl: null,
        };
    }

    onImageUpload = (e) => {
        const files = Array.from(e.target.files);
        const file = files[0];

        this.props.uploadImage(file).then((result) => {
            this.setState({
                imageUrl: result.imageUrl,
            });
        });
    };

    render = () => {
        return (
            <div>
                <Button
                    variant="contained"
                    color="primary"
                >
                    <input
                        onChange={this.onImageUpload}
                        type="file"
                    />
                </Button>

                {this.state.imageUrl && (
                    <div>
                        <img src={this.state.imageUrl} />
                    </div>
                )}
            </div>
        );
    };
}

ImageUpload.propTypes = {
    handleImageUpload: PropTypes.func,
};

const mapStateToProps = (state) => {
    return state;
};

const mapActionsToProps = {
    uploadImage,
};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(ImageUpload);
