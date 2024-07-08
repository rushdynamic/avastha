import React from 'react';
import useSqrrl from './useSqrrl';
import { SqrrlWrapperProps } from './types';

export default function SqrrlWrapper({
	initialState = {},
	rootReducer,
	children,
}: SqrrlWrapperProps) {
	const { useSqrrlState, dispatch } = useSqrrl(initialState, rootReducer);
	const wrappedChildren = React.Children.map(children, (child) =>
		React.cloneElement(child, { useSqrrlState, dispatch })
	);
	return <>{wrappedChildren}</>;
}
