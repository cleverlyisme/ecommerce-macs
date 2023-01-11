import environments from './environments';

const { BACKEND_URL } = environments;

const formatFileUrl = (url) => `${BACKEND_URL}/photos/${url}`;

export default formatFileUrl;
