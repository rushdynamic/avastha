import React from 'react';
import useSqrrl from './useSqrrl';
import { SqrrlWrapper } from './types';

export default function SqrrlWrapper({
	initialState = {},
	rootReducer,
	children,
}: SqrrlWrapper) {
	const { useSqrrlState, dispatch } = useSqrrl(initialState, rootReducer);
	const wrappedChildren = React.Children.map(children, (child) =>
		React.cloneElement(child, { useSqrrlState, dispatch })
	);
	return <>{wrappedChildren}</>;
}
