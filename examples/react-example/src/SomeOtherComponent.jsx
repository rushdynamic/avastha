import React from 'react';

export default function SomeOtherComponent({ useSqrrlState }) {
	const myCount = useSqrrlState('myCount');
	return <div>{'SomeOtherComponent: ' + myCount}</div>;
}
