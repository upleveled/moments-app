export interface AuthSession {
	authToken?: string;
	user?: {
		email: string;
	};
}

export type User = {
	email: string;
	uid?: string;
	token: string | null;
};

export type Moment = {
	id: string;
	content: string;
	is_thanks?: boolean;
	note_voices?: string[];
	is_favorite?: boolean;
	emotion?: string | null;
	images?: string[];
	videos?: string[];
	created_at: string;
};

export type Tag = {
	id: string;
	text: string;
	created_at?: string;
	tag_moments_aggregate?: Aggregate;
};

export type Aggregate = {
	aggregate: {
		count: number;
	};
};

export enum Emotions {
	'JOY' = '😄',
	'SADNESS' = '😔',
	'FEAR' = '😨',
	'DISGUST' = '🤢',
	'ANGER' = '😡',
}
