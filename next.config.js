const path = require('path');

module.exports = {
	images: {
		domains: ['res.cloudinary.com'],
		// loader: 'cloudinary',
		// path: 'https://res.cloudinary.com/human-core/image/upload/'
	},
	sassOptions: {
		includePaths: [path.join(__dirname, 'styles')],
	},
};
