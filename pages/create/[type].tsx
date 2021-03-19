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
import { createMoment, createSRWMoment, createTag } from 'gql/mutations';
import { useUser } from 'hooks/user/useUser';
import { GetServerSideProps } from 'next';
import { Emotions } from 'interfaces';
import { useMoments, useTags } from 'hooks/api';

const Create = () => {
	const router = useRouter();
	const user = useUser();
	const { mutate: mutateMoments } = useMoments();
	const { tags, mutate: mutateTags } = useTags();
	const { type } = router.query;
	const {
		Modal: CancelModal,
		isShow: isCancelModalVisible,
		hide: hideCancelModal,
		show: showCancelModal,
	} = useModal();
	const {
		show: showMediaModal,
		hide: hideMediaModal,
		isShow: isMediaModalVisible,
		Modal: MediaModal,
	} = useModal();
	const {
		show: showTagModal,
		hide: hideTaghModal,
		isShow: isTagModalVisible,
		Modal: TagModal,
	} = useModal();

	const contentRef = React.useRef<HTMLTextAreaElement>(null);
	const [isFavorite, setIsFavorite] = React.useState(false);
	const [content, setContent] = React.useState<string>('');
	const [images, setImages] = React.useState<string[]>([]);
	// const [videos, setVideos] = React.useState<string[]>([]);
	const [emojiSelected, setEmojiSelected] = React.useState<{
		key: string;
		value: string;
	} | null>(null);
	const [audio, setAudio] = React.useState<string | null>(null);

	const tagWord = content.split('#').pop();
	const isLastWordTag = content.split(' ').pop()?.includes('#');

	const handleContentChange = (value: string) => {
		const lastLetter = value.charAt(value.length - 1);
		const oldValueLastLetter = content.charAt(content.length - 1);
		if (lastLetter === '#' || isLastWordTag) {
			showTagModal();
		}
		if (
			isLastWordTag &&
			lastLetter === ' ' &&
			oldValueLastLetter !== '#' &&
			isTagModalVisible
		) {
			return;
		} else {
			setContent(value);
		}
	};

	React.useEffect(() => {
		console.log(audio);
	}, []);

	const onEnterKey = (key: string) => {
		if (key === 'Enter' && tagWord && isTagModalVisible) {
			saveTag();
			hideTaghModal();
			setContent(`${content} `);
		}
	};

	React.useEffect(() => {
		if (!isLastWordTag && isTagModalVisible) {
			hideTaghModal();
		}
	}, [isLastWordTag, isTagModalVisible]);

	const focusContentInput = () => contentRef.current?.focus();

	const onClickTag = (text: string) => {
		const contentArray = content.split('#');
		contentArray[contentArray.length - 1] = text;
		setContent(contentArray.join('#'));
		hideTaghModal();
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
		if (isTagModalVisible) {
			focusContentInput();
		}
	}, [isTagModalVisible]);

	const removeImage = (index: number) => {
		const newImages = [...images.slice(0, index), ...images.slice(index + 1)];
		setImages(newImages);
	};

	const addImage = (newImage: string) => {
		setImages([...images, newImage]);
	};

	const handleCreateMoment = async () => {
		const token = user?.token || '';
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
			};

			mutateMoments((data) => {
				const newMoments = createSRWMoment(data?.moments || [], {
					...variables,
					id: uuidv4().toString(),
					created_at: moment().toString(),
				});
				return {
					moments: newMoments,
				};
			}, false);

			createMoment({
				token,
				variables,
			});

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
							showCancelModal();
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
						onClick={handleCreateMoment}
					>
						Create
					</button>
				</div>
				{type === 'image' && (
					<ul className="flex gap-3 mb-6">
						{images.map((image, index) => (
							<MediaBox
								key={image}
								src={image}
								onDeleteElement={() => removeImage(index)}
								onClickImage={showMediaModal}
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
										? addImage(URL.createObjectURL(event.target.files[0]))
										: null
								}
							/>
							<label htmlFor="upload-image">
								<MediaBox />
							</label>
						</>
					</ul>
				)}
				{type === 'voice' && (
					<div className="flex flex-col gap-4 justify-center w-full">
						<VoiceRecorder
							saveAudio={(value: string | null) => setAudio(value)}
						/>
					</div>
				)}
				<div className="relative mb-6">
					<textarea
						onKeyPress={(e) => onEnterKey(e.key)}
						ref={contentRef}
						value={content}
						onChange={(e) => handleContentChange(e.target.value)}
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
			<CancelModal isShow={isCancelModalVisible}>
				<Alert
					title="Cancel moment"
					description="You will miss all the progress for this moment"
					successText="Keep"
					cancelText="Delete"
					onClickSuccess={hideCancelModal}
					closeAlert={() => {
						hideCancelModal();
						router.push('/');
					}}
				/>
			</CancelModal>
			<MediaModal isShow={isMediaModalVisible}>
				<FullMedia hideModal={hideMediaModal} images={images} />
			</MediaModal>
			<TagModal isShow={isTagModalVisible}>
				<HashTagsView
					onClickTag={(text) => onClickTag(text)}
					hideView={hideTaghModal}
					focusInput={focusContentInput}
					tags={tags || []}
					currentTag={tagWord || ''}
					saveTag={saveTag}
				/>
			</TagModal>
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
