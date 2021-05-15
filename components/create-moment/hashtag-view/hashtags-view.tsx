import * as React from 'react';
import { Icon } from 'components/icon';
import { BodyText, Subtitle, Title } from 'components/typography';
import { Tag } from 'interfaces';
import clsx from 'clsx';
import { useTheme } from 'next-themes';

interface HashtagProps {
	focusInput: () => void;
	hideView: () => void;
	saveTag: () => void;
	tags: Tag[];
	currentTag: string;
	onClickTag: (value: string) => void;
}

export const HashTagsView: React.FC<HashtagProps> = ({
	focusInput,
	hideView,
	tags,
	currentTag,
	onClickTag,
	saveTag,
}) => {
	const { theme } = useTheme();
	return (
		<div
			onClick={focusInput}
			className={clsx(
				'absolute left-0 right-0 top-0 grid content-start p-5 pt-8 w-full h-full bg-background-nav',
				theme
			)}
		>
			<div className="flex items-center">
				<div className="cursor-pointer" onClick={hideView}>
					<Icon src="/images/icons/close.svg" />
				</div>
				<Title type="2" className="ml-4">
					Hashtags
				</Title>
			</div>
			{
				<div
					className="flex items-center justify-center mt-4 h-full"
					style={{ maxWidth: '300px' }}
				>
					<Subtitle className="text-primary-40">
						{`Use hashtags to organize your moments. Example type "Family"`}
					</Subtitle>
				</div>
			}
			{!!tags.length && (
				<ul className="grid gap-3 content-start justify-start mt-10">
					{tags
						.filter((elem) => elem.text.includes(currentTag))
						.map((tag) => (
							<div key={tag.id} onClick={() => onClickTag(tag.text)}>
								<BodyText className="text-left text-primary cursor-pointer">
									#{tag.text}
								</BodyText>
							</div>
						))}
				</ul>
			)}
			{!!currentTag && (
				<div className="flex-start flex mt-4 cursor-pointer" onClick={saveTag}>
					<Subtitle className="text-secondary">
						{`Create "${currentTag}" hashtag`}
					</Subtitle>
				</div>
			)}
		</div>
	);
};
