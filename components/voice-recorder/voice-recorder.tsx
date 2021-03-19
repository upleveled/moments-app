import clsx from 'clsx';
import SVG from 'react-inlinesvg';
import { Icon } from 'components/icon';
import * as React from 'react';

interface VoiceRecorderProps {
	saveAudio: (value: string | null) => void;
}

interface VoiceRecorderState {
	audio: string | null;
	shouldStopRecording: boolean;
	isRecording: boolean;
	stoppedRecorder: boolean;
	isReproducing: boolean;
}

export class VoiceRecorder extends React.Component<
	VoiceRecorderProps,
	VoiceRecorderState
> {
	state = {
		audio: null,
		shouldStopRecording: false,
		isRecording: false,
		stoppedRecorder: false,
		isReproducing: false,
	};

	onClickPlayButton = (): void => {
		const $audioElem = document.getElementById(
			'audio-player'
		) as HTMLAudioElement;
		if (this.state.isReproducing && $audioElem) {
			$audioElem.pause();
			this.setState({ isReproducing: false });
		} else {
			if ($audioElem) {
				$audioElem.play();
				this.setState({ isReproducing: true });
			}
		}
	};

	removeAudio = (): void => {
		this.setState({
			audio: null,
			shouldStopRecording: false,
			isRecording: false,
			stoppedRecorder: false,
			isReproducing: false,
		});
		this.props.saveAudio(null);
	};

	handleAudio = (stream: MediaStream): void => {
		const options = { mimeType: 'audio/webm' };
		const recordedChunks: Blob[] = [];
		const mediaRecorder = new MediaRecorder(stream, options);

		mediaRecorder.addEventListener('dataavailable', (e) => {
			if (e.data.size > 0) {
				recordedChunks.push(e.data);
			}
			if (this.state.shouldStopRecording && !this.state.stoppedRecorder) {
				mediaRecorder.stop();
				this.setState({
					stoppedRecorder: true,
					isRecording: false,
				});
			}
		});

		mediaRecorder.addEventListener('stop', () => {
			const newAudio = URL.createObjectURL(new Blob(recordedChunks));
			this.setState({
				audio: newAudio,
			});
			this.props.saveAudio(newAudio);
		});

		this.setState({
			isRecording: true,
		});
		mediaRecorder.start(1000);
	};

	getAudio = (): void => {
		navigator.mediaDevices
			.getUserMedia({ audio: true, video: false })
			.then(this.handleAudio);
	};

	render(): JSX.Element {
		return (
			<div className="flex flex-col items-center justify-center mb-10 w-full">
				{!this.state.audio && (
					<>
						<div
							className={clsx(
								'flex items-center justify-center mb-3 w-32 h-32 cursor-pointer transition-all duration-300',
								{ 'rounded-full bg-secondary-dark': this.state.isRecording },
								{ 'rounded-3xl bg-secondary': !this.state.isRecording }
							)}
							onClick={() =>
								this.state.isRecording
									? this.setState({ shouldStopRecording: true })
									: this.getAudio()
							}
						>
							{this.state.isRecording ? (
								<Icon
									fill
									src="/images/icons/pause.svg"
									width="46"
									height="42"
									className="text-background-nav"
								/>
							) : (
								<Icon
									src="/images/svgs/big-microphone.svg"
									width="38"
									height="57"
									className="text-background-nav"
								/>
							)}
						</div>
						<button className="text-primary font-sans text-base font-semibold">
							{this.state.isRecording ? 'Stop Recording' : 'Start Recording'}
						</button>
					</>
				)}
				{this.state.audio && (
					<>
						<audio
							id="audio-player"
							src={this.state.audio || ''}
							className="hidden"
						></audio>
						<div className="flex flex-col items-center w-full">
							<div className="flex items-center justify-between p-4 w-full h-24 bg-primary-10 rounded-3xl">
								<div
									className="flex items-center justify-center w-16 h-16 bg-background-nav rounded-full cursor-pointer"
									onClick={() => this.onClickPlayButton()}
								>
									<Icon
										src={
											this.state.isReproducing
												? '/images/icons/pause.svg'
												: '/images/icons/play.svg'
										}
										width="33"
									/>
								</div>
								<SVG
									src="/images/svgs/wave-audio-card.svg"
									height="40"
									width="214"
								/>
							</div>
							<button
								className="mt-5 text-center text-delete font-sans text-sm font-semibold cursor-pointer"
								onClick={() => this.removeAudio()}
							>
								Record Again
							</button>
						</div>
					</>
				)}
			</div>
		);
	}
}
