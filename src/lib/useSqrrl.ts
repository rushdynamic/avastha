import { useEffect, useState } from 'react';
import { createStore, subscribe, dispatch } from './store';
import { Reducer, State } from './types';

const useSqrrl = (initialState: State, rootReducer: Reducer) => {
	useEffect(() => {
		createStore(initialState, rootReducer);
	}, []);

	const useSqrrlState = (stateKey: string) => {
		const [currState, setCurrState] = useState(initialState);
		subscribe(setCurrState);
		return currState?.[stateKey];
	};

	return { useSqrrlState, dispatch };
};

export default useSqrrl;
