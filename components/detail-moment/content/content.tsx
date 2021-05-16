import * as React from 'react';
import clsx from 'clsx';
import moment from 'moment';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import styles from '../detail-moment.module.scss';
import { useCurrentMoment } from 'hooks';
import { useModal } from 'hooks/use-modal';
import { Icon } from 'components/icon';
import { FullMedia } from 'components/full-media';
import { Alert } from 'components/alert';
import { useMoments } from 'hooks/api';
import { updateFavoriteMoment, updateSWRFavoriteMoment } from 'gql/mutations';
import { useUser } from 'hooks/user/useUser';
import { t } from '@lingui/macro';
import { Badge } from 'components/badge';

const Content: React.FC = () => {
	const { currentMoment } = useCurrentMoment();
	const { mutate } = useMoments();
	const user = useUser();
	const [isFavorite, setIsFavorite] = React.useState(
		!!currentMoment?.is_favorite
	);
	React.useEffect(() => {
		setIsFavorite(!!currentMoment?.is_favorite);
	}, [currentMoment]);
	const {
		show: showMediaModal,
		hide: hideMediaModal,
		isShow: isMediaModalVisible,
		Modal: MediaModal,
	} = useModal();
	const {
		show: showDeleteModal,
		hide: hideDeleteModal,
		isShow: isDeleteModalVisible,
		Modal: DeleteModal,
	} = useModal();

	const handleUpdateFavoriteMoment = async (): Promise<void> => {
		console.log('cambiando si el momento es favorito xD');
		const token = user?.token || '';
		setIsFavorite(!isFavorite);
		if (currentMoment) {
			mutate((data) => {
				const updatedMoments = updateSWRFavoriteMoment(
					data?.moments || [],
					currentMoment
				);
				return {
					moments: updatedMoments,
				};
			}, false);
			await updateFavoriteMoment({
				token,
				variables: {
					id: currentMoment?.id || '',
					isFavorite: !currentMoment?.is_favorite,
				},
			});
			mutate();
		}
	};

	return (
		<>
			<div className={clsx('flex flex-col items-center p-5 pt-3 w-full')}>
				<div
					className={clsx('rounded-lg, mb-8 px-6 h-2 bg-primary-20 rounded-lg')}
				/>
				{!!currentMoment?.images?.length && (
					<div className="relative mb-5 w-full rounded-1.2lg overflow-hidden">
						<Image
							width={355}
							height={222}
							src={currentMoment.images[0]}
							alt="moment-image"
							objectFit="cover"
							layout="responsive"
						/>
						<Badge onClick={showMediaModal}>Expand</Badge>
					</div>
				)}
				{!!currentMoment?.videos?.length && !currentMoment?.images?.length && (
					<div className={styles.mediaContainer}>
						<video
							className={styles.image}
							src={currentMoment.videos[0]}
							autoPlay={false}
						/>
						<div className={styles.playIconContainer}>
							<img src="/images/examples/play.png" alt="play icon" />
						</div>
						<Badge onClick={showMediaModal}>Expand</Badge>
					</div>
				)}
				<div className="flex items-center justify-between mb-6 w-full">
					<div className="flex gap-3 items-center">
						<p className="text-primary-light font-sans text-lg font-semibold">
							{moment(currentMoment?.created_at).format('Do, MMM')}
						</p>
						<p className="text-secondary font-sans text-sm font-semibold">
							{moment(currentMoment?.created_at).format('LT')}
						</p>
					</div>
					<div className="z-30 flex gap-5 items-center">
						<div
							onTouchStart={(e) => {
								e.stopPropagation();
								handleUpdateFavoriteMoment();
							}}
							onClick={(e) => {
								e.stopPropagation();
								handleUpdateFavoriteMoment();
							}}
						>
							<Icon
								pointer
								src="/images/icons/star.svg"
								fill={isFavorite}
								className="text-primary"
							/>
						</div>
						<Icon
							src="/images/icons/edit.svg"
							pointer
							className="text-primary"
						/>
						<div
							onTouchStart={(e) => {
								e.stopPropagation();
								showDeleteModal();
							}}
							onClick={() => {
								showDeleteModal();
							}}
						>
							<Icon
								src="/images/icons/delete.svg"
								pointer
								className="text-primary"
							/>
						</div>
					</div>
				</div>
				{currentMoment?.note_voice && (
					<div className="flex flex-col mb-4 w-full">
						<audio
							id="audio-player"
							src={currentMoment.note_voice}
							controls
							className="w-full"
						/>
					</div>
				)}
				<div className="w-full text-left text-primary-60 font-serif text-lg moments-md">
					<ReactMarkdown>{currentMoment?.content || ''}</ReactMarkdown>
				</div>
			</div>
			<MediaModal isShow={isMediaModalVisible}>
				<FullMedia
					hideModal={hideMediaModal}
					isVideo={!!currentMoment?.videos?.length}
					media={
						(currentMoment?.videos?.length
							? currentMoment.videos
							: currentMoment?.images) || []
					}
				/>
			</MediaModal>
			<DeleteModal isShow={isDeleteModalVisible}>
				<Alert
					title={t`Are you sure?`}
					description={t`You won’t be able to recover this moment later`}
					cancelText={t`Cancel`}
					successText={t`Delete`}
					closeAlert={hideDeleteModal}
				/>
			</DeleteModal>
		</>
	);
};

export default Content;
