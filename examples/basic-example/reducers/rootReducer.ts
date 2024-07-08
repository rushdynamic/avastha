import { Action, State } from '../../../src/lib/types';
import decrement from './decrement';
import increment from './increment';

const rootReducer = (state: State, action: Action) => {
	switch (action.type) {
		case 'increment':
			return increment(state, action.payload);
		case 'decrement':
			return decrement(state, action.payload);
		default:
			return state;
	}
};

export default rootReducer;
