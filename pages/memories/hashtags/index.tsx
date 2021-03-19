import { EmptyState } from 'components/empty-state';
import { Icon } from 'components/icon';
import { Layout } from 'components/layout/layout';
import { Loader } from 'components/loader';
import { BodyText, Subtitle, Title } from 'components/typography';
import { useTags } from 'hooks/api';
import Link from 'next/link';
import * as React from 'react';

const HashtagElem: React.FC<{ content: string; moments: number }> = ({
	content,
	moments,
}) => {
	return (
		<Link href={`/memories/hashtags/${content}`}>
			<li className="flex items-center justify-between w-full cursor-pointer">
				<BodyText type="1" className="text-primary">
					#<span className="capitalize">{content}</span>
				</BodyText>
				<Subtitle type="2" className="text-secondary">
					{moments} Moments
				</Subtitle>
			</li>
		</Link>
	);
};

const Hashtags: React.FC = () => {
	const { tags, isError, isLoading } = useTags();

	return (
		<Layout className="bg-background-nav">
			<div className="flex items-center mt-8 px-5">
				<Link href="/memories">
					<div className="cursor-pointer">
						<Icon src="/images/icons/close.svg" className="text-primary" />
					</div>
				</Link>
				<Title type="2" className="ml-4 text-primary">
					Hashtags
				</Title>
			</div>
			{isLoading && <Loader />}
			{!!tags && !isError && !tags.length && (
				<EmptyState
					ilustration="/images/svgs/empty-state-hashtags.svg"
					darkIlustration="/images/svgs/empty-state-hashtags.svg"
					ilustrationSize="226"
					description="Use hashtags in your descriptions to organize your moments."
				/>
			)}
			{!!tags && !!tags.length && (
				<ul className="grid gap-3 content-start mt-10 px-5 w-full">
					{tags.map((elem) => (
						<HashtagElem
							key={elem.id}
							content={elem.text}
							moments={elem.tag_moments_aggregate?.aggregate.count || 0}
						/>
					))}
				</ul>
			)}
		</Layout>
	);
};

export default Hashtags;
