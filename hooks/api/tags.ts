import useSWR from 'swr';
import { Tag } from 'interfaces';
import { fetcherGraph } from 'lib';
import { GET_ALL_TAGS } from 'gql/queries';
import { useUser } from 'hooks/user/useUser';

export const useTags = () => {
	const user = useUser();
	const token = user?.token;

	const { data, error, mutate } = useSWR<{ tags: Tag[] }, string>(
		[GET_ALL_TAGS, token],
		fetcherGraph
	);

	return {
		tags: data?.tags,
		isLoading: !error && !data,
		isError: !!error,
		error: error,
		mutate,
	};
};
