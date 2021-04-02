export function uploadFile(
	file: File,
	setProgress: (value: number) => void,
	setImage: (value: string) => void
) {
	const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME}/upload`;
	const xhr = new XMLHttpRequest();
	const fd = new FormData();
	xhr.open('POST', url, true);
	xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

	// Update progress (can be used to show progress indicator)
	xhr.upload.addEventListener('progress', (e) => {
		setProgress(Math.round((e.loaded * 100.0) / e.total));
		console.log(Math.round((e.loaded * 100.0) / e.total));
	});

	xhr.onreadystatechange = () => {
		if (xhr.readyState == 4 && xhr.status == 200) {
			const response = JSON.parse(xhr.responseText);

			setImage(response.secure_url);
			console.log(response.secure_url);
		}
	};

	fd.append(
		'upload_preset',
		process.env.NEXT_PUBLIC_CLOUDINARY_UNSIGNED_UPLOAD_PRESET as string
	);
	fd.append('tags', 'browser_upload');
	fd.append('file', file);
	xhr.send(fd);
}

export const uploadFiles = async (images: File[]) => {
	const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME}/upload`;
	const uploadedImages: { url: string; index: number }[] = [];
	await Promise.all(
		images.map((image, index) => {
			const formData = new FormData();
			formData.append('file', image);
			formData.append(
				'upload_preset',
				process.env.NEXT_PUBLIC_CLOUDINARY_UNSIGNED_UPLOAD_PRESET as string
			);
			return fetch(url, { method: 'POST', body: formData })
				.then((response) => response.json())
				.then((data) => {
					if (data.secure_url !== '') {
						uploadedImages.push({ url: data.secure_url, index });
					}
				})
				.catch((err) => console.error(err));
		})
	);
	const sortImages = uploadedImages
		.sort((a, b) => a.index - b.index)
		.map((image) => image.url);
	const allImages = `{${sortImages}}`;
	return allImages;
};
