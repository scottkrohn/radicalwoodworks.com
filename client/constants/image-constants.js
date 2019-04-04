const IMAGE = {
    s3Base: 'https://s3-us-west-1.amazonaws.com/radicalwoodworks-images/',
};

IMAGE.getFullUrl = (path) => {
    return `${IMAGE.s3Base}${path}`;
};

export default IMAGE;