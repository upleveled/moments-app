import * as React from 'react';
import SVG from 'react-inlinesvg';
import moment from 'moment';
import clsx from 'clsx';
import { useCurrentMoment } from 'hooks';
import { Moment } from 'interfaces';
import { Icon } from 'components/icon';
import { useRouter } from 'next/router';

export const NoteVoice: React.FC = () => (
	<div className="flex items-center mb-2">
		<div className="flex items-center justify-center mr-3 w-8 h-8 bg-background-nav rounded-full">
			<SVG
				src="/images/icons/play.svg"
				width="16"
				className="text-secondary-dark stroke-current"
			/>
		</div>
		<SVG src="/images/svgs/wave-audio-card.svg" />
	</div>
);

export const NoteImage: React.FC = () => (
	<div className="flex mb-2 w-full h-36 rounded-lg overflow-hidden">
		<img
			src="/images/examples/moment-card.png"
			alt="example"
			className="w-full h-full object-cover object-center"
		/>
	</div>
);

export const NoteVideo: React.FC = () => (
	<div
		className={clsx(
			'relative flex mb-2 w-full h-36 bg-center bg-no-repeat rounded-lg overflow-hidden'
		)}
	>
		<img
			src="/images/examples/moment-card.png"
			alt="example"
			className="w-full h-full object-cover object-center"
		/>
		<div
			style={{
				position: 'absolute',
				width: 15,
				height: 18,
				top: 'calc(50% - 9px)',
				left: 'calc(50% - 7.5px)',
			}}
		>
			<img
				src="/images/examples/play.png"
				alt="play icon"
				className="w-full h-full"
			/>
		</div>
	</div>
);

export const CardMoment: React.FC<Moment> = (cardMoment) => {
	const { setCurrentMoment } = useCurrentMoment();
	const router = useRouter();
	const {
		content,
		is_thanks = false,
		note_voice,
		images,
		video,
		created_at,
	} = cardMoment;
	const selectMediaComponent = (): JSX.Element | null => {
		if (note_voice) {
			return <NoteVoice />;
		} else if (images?.length) {
			return <NoteImage />;
		} else if (video) {
			return <NoteVideo />;
		}
		return null;
	};

	const smallContent = `${content.slice(0, 60)}${
		content.length > 60 ? '...' : ''
	}`;
	return (
		<div className="flex flex-col gap-1">
			<p className="m-0 pl-2 text-primary-60 font-sans text-xs">
				{router.pathname === '/' ||
				(router.pathname.includes('memories') &&
					!router.pathname.includes('favorites') &&
					!router.pathname.includes('hashtags'))
					? moment(created_at).format('LT')
					: moment(created_at).format('ddd MMM DD, YYYY')}
			</p>
			<div
				onClick={() => setCurrentMoment(cardMoment)}
				className={clsx(
					'relative p-2 w-40 rounded-lg cursor-pointer',
					{ 'bg-background-thanks': is_thanks },
					{ 'bg-background-card': !is_thanks }
				)}
			>
				{selectMediaComponent()}
				<p className="m-0 text-primary text-xs">{smallContent}</p>
				<div className="absolute z-10 bottom-2 right-2 w-3 h-3">
					<Icon
						src="/images/svgs/expand-moment.svg"
						width="12"
						height="12"
						className="text-secondary"
					/>
				</div>
				{is_thanks && (
					<div className="absolute -right-1 -top-2 text-base">❤️</div>
				)}
			</div>
		</div>
	);
};
