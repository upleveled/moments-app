import imageCompression from 'browser-image-compression';

const imageCompressionOptions = {
	maxSizeMB: 3,
	maxWidthOrHeight: 500,
	useWebWorker: true,
};

export const uploadFiles = async (images: File[]) => {
	const uploadedImages: { url: string; index: number }[] = [];

	await Promise.all(
		images.map((image, index) => {
			return imageCompression(image, imageCompressionOptions)
				.then((compressedFile) => {
					const formData = new FormData();
					formData.append('file', compressedFile);
					return fetch('/api/upload-image', { method: 'POST', body: formData });
				})
				.then((response) => response.json())
				.then((data) => {
					if (data.secure_url !== '') {
						uploadedImages.push({ url: data.secure_url, index });
					}
					return;
				})
				.catch((err) => console.error(err));
		})
	);

	const sortImages = uploadedImages
		.sort((a, b) => a.index - b.index)
		.map((image) => image.url);
	const allImages = `{${sortImages}}`;
	console.log({ allImages });
	return allImages;
};
