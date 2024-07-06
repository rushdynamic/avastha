import decrement from './decrement';
import increment from './increment';

const rootReducer = (state: {}, action: any) => {
	switch (action.type) {
		case 'increment':
			return increment(state, action.payload);
		case 'decrement':
			return decrement(state, action.payload);
	}
};

export default rootReducer;
