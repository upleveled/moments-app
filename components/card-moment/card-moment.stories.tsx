import { Meta, Story } from '@storybook/react';
import { Moment } from 'interfaces';
import { CardMoment } from './card-moment';

export default {
	title: 'CARDS/CardMoment',
	component: CardMoment,
} as Meta;

export const Default: Story<Moment> = (args) => <CardMoment {...args} />;
Default.args = {
	content: `A new day to live, with my family and friends that I'm lucky to...`,
	is_thanks: false,
};

export const Thank: Story<Moment> = (args) => <CardMoment {...args} />;
Thank.args = {
	content: `A new day to live, with my family and friends that I'm lucky to...`,
	is_thanks: true,
};

export const NoteVoice: Story<Moment> = (args) => <CardMoment {...args} />;
NoteVoice.args = {
	content: `Idea of article for the blog. #Marketing`,
	is_thanks: false,
	note_voice: 'dasdasdasd',
};

export const NoteImage: Story<Moment> = (args) => <CardMoment {...args} />;
NoteImage.args = {
	content: `This dog remember me my childhood pet`,
	is_thanks: false,
	images: ['dasdasd.png'],
};

export const NoteVideo: Story<Moment> = (args) => <CardMoment {...args} />;
NoteVideo.args = {
	content: `This dog remember me my childhood pet`,
	is_thanks: false,
	video: 'asdasdasdasd.mp4',
};
