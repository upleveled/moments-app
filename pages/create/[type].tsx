import * as React from 'react';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';
import clsx from 'clsx';
import moment from 'moment';
import { Toggle } from 'components/forms';
import { Icon } from 'components/icon';
import { Caption, Subtitle, Title } from 'components/typography';
import { useModal } from 'hooks/use-modal';
import { Alert } from 'components/alert';
import { FullMedia } from 'components/full-media';
import { VoiceRecorder } from 'components/voice-recorder';
import { EmojiBox } from 'components/create-moment/emoji-box';
import { MediaBox } from 'components/create-moment/media-box';
import { HashTagsView } from 'components/create-moment/hashtag-view';
import { createSRWMoment, createTag } from 'gql/mutations';
import { useUser } from 'hooks/user/useUser';
import { GetServerSideProps } from 'next';
import { Emotions } from 'interfaces';
import { useMoments, useTags } from 'hooks/api';
import { useIsCreatingMoment } from 'hooks';

type ImageUploadType = {
	file: File;
	url: string;
};

const Create = () => {
	const router = useRouter();
	const user = useUser();
	const { handleCreateMoment } = useIsCreatingMoment();
	const { mutate: mutateMoments } = useMoments();
	const { tags, mutate: mutateTags } = useTags();
	const { type } = router.query;
	const [modalType, setModalType] = React.useState<
		'cancel' | 'video' | 'image' | 'tag'
	>('cancel');

	const { Modal, isShow, hide, show } = useModal();

	const contentRef = React.useRef<HTMLTextAreaElement>(null);
	const [isFavorite, setIsFavorite] = React.useState(false);
	const [content, setContent] = React.useState<string>('');
	const [images, setImages] = React.useState<ImageUploadType[]>([]);
	const [videos, setVideos] = React.useState<ImageUploadType[]>([]);
	const [audio, setAudio] = React.useState<ImageUploadType | null>(null);
	const [emojiSelected, setEmojiSelected] = React.useState<{
		key: string;
		value: string;
	} | null>(null);

	const tagWord = content.split('#').pop();
	const isLastWordTag = content.split(' ').pop()?.includes('#');

	const handleContentChange = (value: string) => {
		const lastLetter = value.charAt(value.length - 1);
		const oldValueLastLetter = content.charAt(content.length - 1);
		if (lastLetter === '#' || isLastWordTag) {
			setModalType('tag');
			show();
		}
		if (
			isLastWordTag &&
			lastLetter === ' ' &&
			oldValueLastLetter !== '#' &&
			isShow &&
			modalType === 'tag'
		) {
			return;
		} else {
			setContent(value);
		}
	};

	React.useEffect(() => {
		console.log(audio);
	}, []);

	const onEnterKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === 'Enter' && tagWord && isShow && modalType === 'tag') {
			e.preventDefault();
			saveTag();
			hide();
			setContent(`${content} `);
		}
	};

	React.useEffect(() => {
		if (!isLastWordTag && modalType === 'tag' && isShow) {
			hide();
		}
	}, [isLastWordTag, modalType, isShow]);

	const focusContentInput = () => contentRef.current?.focus();

	const onCloseTagModal = () => {
		const index = content.lastIndexOf('#');
		if (index >= 0) {
			setContent(content.slice(0, index));
		}
		hide();
	};

	const onClickTag = (text: string) => {
		const contentArray = content.split('#');
		contentArray[contentArray.length - 1] = text;
		setContent(`${contentArray.join('#')} `);
		hide();
	};

	const saveTag = async () => {
		if (tagWord && user?.token && tags) {
			const lowerCaseTagWord = tagWord.toLowerCase();
			const inTags = tags.find((elem) => elem.text === lowerCaseTagWord);
			if (!inTags) {
				mutateTags(
					{
						tags: [...tags, { id: uuidv4.toString(), text: lowerCaseTagWord }],
					},
					false
				);
				await createTag({ token: user.token, text: lowerCaseTagWord });
				mutateTags();
			}
		}
	};

	React.useEffect(() => {
		if (modalType === 'tag' && isShow) {
			focusContentInput();
		}
	}, [modalType, isShow]);

	const removeImage = (index: number) => {
		const newImages = [...images.slice(0, index), ...images.slice(index + 1)];
		setImages(newImages);
	};

	const removeVideo = (index: number) => {
		const newVideos = [...videos.slice(0, index), ...videos.slice(index + 1)];
		setVideos(newVideos);
	};

	const addVideo = (newVideo: ImageUploadType) => {
		setVideos([...videos, newVideo]);
	};

	const addImage = (newImage: ImageUploadType) => {
		setImages([...images, newImage]);
	};

	const handleMediaUpload = (file: File, isVideo = false) => {
		const reader = new FileReader();

		reader.onload = function (e) {
			const uploadedObj = { file, url: e.target?.result as string };
			isVideo ? addVideo(uploadedObj) : addImage(uploadedObj);
		};

		reader.readAsDataURL(file); // convert to base64 string
	};

	const onCreateMoment = async () => {
		if (content.trim().length) {
			const selectedTags = content
				.split(' ')
				.filter((word) => word.includes('#'))
				.map((tagWord) => tagWord.split('#').pop());
			const selectedTagsIds = tags
				?.filter((tag) => selectedTags.includes(tag.text))
				.map((tag) => tag.id);
			const tagsToAdd = selectedTagsIds?.map((tagId) => ({ tag_id: tagId }));
			const variables = {
				content,
				isThanks: type === 'thank',
				isFavorite,
				emotion: emojiSelected?.key || null,
				tags: tagsToAdd || [],
				images: '',
				videos: '',
				note_voice: audio?.url || '',
			};

			mutateMoments((data) => {
				const newMoments = createSRWMoment(data?.moments || [], {
					...variables,
					id: uuidv4().toString(),
					created_at: moment().format().toString(),
					images: images.map((image) => image.url) || [],
					videos: videos.map((video) => video.url) || [],
				});
				return {
					moments: newMoments,
				};
			}, false);

			handleCreateMoment(
				variables,
				images.map((image) => image.file) || [],
				videos.map((video) => video.file) || [],
				audio?.file
			);

			router.push('/');
		}
	};

	return (
		<>
			<div className="pb-6 pt-5 px-5 min-h-screen bg-background-nav">
				<div className="flex items-center justify-between mb-12">
					<div
						className="flex items-center cursor-pointer"
						onClick={() => {
							console.log('this is openning a modal');
							setModalType('cancel');
							show();
						}}
					>
						<Icon
							src="/images/icons/back-arrow.svg"
							className="mr-4 text-primary"
						/>
						<Title type="2" className="text-primary capitalize">
							{type}
						</Title>
					</div>
					<button
						className="flex items-center justify-center w-28 text-primary"
						onClick={onCreateMoment}
					>
						Create
					</button>
				</div>
				{type === 'image' && (
					<ul className="flex gap-3 mb-6">
						{images.map((image, index) => (
							<MediaBox
								key={image.url}
								src={image.url}
								onDeleteElement={() => removeImage(index)}
								onClickImage={() => {
									setModalType('image');
									show();
								}}
							/>
						))}
						<>
							<input
								type="file"
								id="upload-image"
								name="upload-image"
								accept="image/*;capture=camera"
								className="hidden"
								onChange={(event) =>
									event.target.files
										? handleMediaUpload(event.target.files[0])
										: null
								}
							/>
							<label htmlFor="upload-image">
								<MediaBox />
							</label>
						</>
					</ul>
				)}
				{type === 'video' && (
					<ul className="flex gap-3 mb-6">
						{videos.map((video, index) => (
							<MediaBox
								key={video.url}
								src={video.url}
								onDeleteElement={() => removeVideo(index)}
								isVideo
								onClickImage={() => {
									setModalType('video');
									show();
								}}
							/>
						))}
						<>
							<input
								type="file"
								id="upload-video"
								name="upload-video"
								accept="video/mp4;capture=camera"
								className="hidden"
								onChange={(event) =>
									event.target.files
										? handleMediaUpload(event.target.files[0], true)
										: null
								}
							/>
							<label htmlFor="upload-video">
								<MediaBox />
							</label>
						</>
					</ul>
				)}
				{type === 'voice' && (
					<div className="flex flex-col gap-4 justify-center w-full">
						<VoiceRecorder
							saveAudio={(value: ImageUploadType | null) => setAudio(value)}
						/>
					</div>
				)}
				<div className="relative mb-6">
					<textarea
						onKeyPress={onEnterKey}
						ref={contentRef}
						value={content}
						onChange={(e) => {
							handleContentChange(e.target.value);
						}}
						className={clsx(
							'p-6 pt-12 w-full h-32 text-primary text-base tracking-widest bg-background-input rounded-2xl transition-colors duration-200',
							'focus:bg-offwhite focus:outline-none focus:ring-primary focus:ring-2'
						)}
					></textarea>
					<p className="absolute left-6 top-5 text-primary-60">
						What am I thinking?
					</p>
					{type === 'thank' && (
						<div className="absolute -right-1 -top-2 text-base">❤️</div>
					)}
				</div>
				<div className="flex justify-between mb-6">
					<div className="flex flex-col">
						<Subtitle className="text-primary">Save as favorite</Subtitle>
						<Caption className="text-primary-60">
							Add this moment to your favorites.
						</Caption>
					</div>
					<div>
						<Toggle
							isActive={isFavorite}
							onClick={() => setIsFavorite(!isFavorite)}
							isDisabled={false}
						/>
					</div>
				</div>
				<div>
					<div className="flex flex-col">
						<Subtitle className="text-primary">How do you feel?</Subtitle>
						<Caption className="text-primary-60">
							Which one describe better this moment.
						</Caption>
					</div>
					<ul className="flex items-center justify-between mt-3">
						{Object.entries(Emotions)
							.map(([key, value]) => ({ key, value }))
							.map((emoji) => (
								<EmojiBox
									key={emoji.key}
									emoji={emoji.value}
									onClick={() =>
										setEmojiSelected(
											emoji.value === emojiSelected?.value ? null : emoji
										)
									}
									isSelected={emojiSelected?.key === emoji.key}
								/>
							))}
					</ul>
				</div>
			</div>
			<Modal isShow={isShow}>
				{modalType === 'cancel' && (
					<Alert
						title="Cancel moment"
						description="You will miss all the progress for this moment"
						successText="Keep"
						cancelText="Delete"
						onClickSuccess={hide}
						closeAlert={() => {
							hide();
							router.push('/');
						}}
					/>
				)}
				{modalType === 'image' ||
					(modalType === 'video' && (
						<FullMedia
							hideModal={hide}
							isVideo={modalType === 'video'}
							media={
								modalType === 'video'
									? videos.map((video) => video.url)
									: images.map((image) => image.url)
							}
						/>
					))}
				{modalType === 'tag' && (
					<HashTagsView
						onClickTag={(text) => onClickTag(text)}
						hideView={onCloseTagModal}
						focusInput={focusContentInput}
						tags={tags || []}
						currentTag={tagWord || ''}
						saveTag={saveTag}
					/>
				)}
			</Modal>
		</>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const isAuth = context.req.cookies?.auth;

	if (!isAuth) {
		return {
			redirect: {
				destination: '/auth',
				permanent: false,
			},
		};
	}

	return {
		props: {},
	};
};

export default Create;
