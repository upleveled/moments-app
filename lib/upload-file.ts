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

export const uploadVideos = async (videos: File[]) => {
	const uploadedVideos: { url: string; index: number }[] = [];
	await Promise.all(
		videos.map((video, index) => {
			const formData = new FormData();
			formData.append('file', video);
			formData.append(
				'upload_preset',
				`${process.env.NEXT_PUBLIC_CLOUDINARY_UNSIGNED_UPLOAD_PRESET}`
			);
			return fetch(
				`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME}/upload`,
				{
					method: 'POST',
					body: formData,
				}
			)
				.then((response) => response.json())
				.then((data) => {
					if (data.secure_url !== '') {
						uploadedVideos.push({ url: data.secure_url, index });
					}
					return;
				})
				.catch((err) => console.error(err));
		})
	);
	const sortVideos = uploadedVideos
		.sort((a, b) => a.index - b.index)
		.map((image) => image.url);
	const allVideos = `{${sortVideos}}`;
	console.log({ allVideos });
	return allVideos;
};

export const uploadNoteVoice = async (audio: File) => {
	const formData = new FormData();
	formData.append('file', audio);
	formData.append(
		'upload_preset',
		`${process.env.NEXT_PUBLIC_CLOUDINARY_UNSIGNED_UPLOAD_PRESET}`
	);
	const data = await fetch(
		`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME}/upload`,
		{
			method: 'POST',
			body: formData,
		}
	);
	const jsonData = await data.json();
	return jsonData.secure_url || '';
};
