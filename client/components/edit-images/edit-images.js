import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';

// Components
import ImageUpload from 'client/components/image-upload/image-upload';
import ImageCarousel from 'client/components/image-carousel/image-carousel';

// Styles
import styles from 'client/components/edit-images/edit-images.less';

class EditImages extends PureComponent {
	constructor(props) {
		super(props);
	}

	onImageUpload = (imageUrl) => {
		console.log(imageUrl);
		this.props.onImageUpload(imageUrl);
	}

	render = () => {
		const images = !isEmpty(this.props.product) ? this.props.product.getImages() : [];

		return (
			<div className="col-xs-12 col-md-6">
				<ImageCarousel images={images} />
				<ImageUpload
						className={styles.AddImage}
						type="box"
						onImageUploadSuccess={this.onImageUpload}
				/>
			</div>
		);
	}
}

EditImages.propTypes = {
	product: PropTypes.object,
	onImageUpload: PropTypes.func,
};

export default EditImages; 