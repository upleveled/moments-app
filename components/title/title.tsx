import * as React from 'react';

export const Title: React.FC = ({ children }) => {
	return (
		<>
			<h1 className="text-primary text-4xl">{children}</h1>
		</>
	);
};
